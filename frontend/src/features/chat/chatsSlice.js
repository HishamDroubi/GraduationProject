import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import chatService from "./chatService";
import { socketInstance } from "../../socket";
let selectedChatCompare;
const initialState = {
  isError: false,
  isLoading: false,
  message: "",
  allChats: null,
  isSuccess: false,
  chat: null,
  chatDetails: null,
  notifications: [],
  searchedContacts: null,
};
export const fetchChats = createAsyncThunk("chats", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await chatService.fetchChats(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchChatDetails = createAsyncThunk(
  "chatDetails",
  async (secondUser, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await chatService.fetchChatDetails(secondUser, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "chatDetails/newMessage",
  async (dataForm, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await chatService.sendMessage(dataForm, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
//create chat or return the chat if exists
export const createChat = createAsyncThunk(
  "chatDetails/createChatOrReturnChat",
  async (userName, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await chatService.createChat(userName, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const searchContacts = createAsyncThunk(
  "chats/findContacts",
  async (keyword, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await chatService.searchContacts(keyword, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addNotification = createAsyncThunk(
  "chats/addNotification",
  async (messageId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await chatService.addNotification(messageId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchNotifications = createAsyncThunk(
  "chats/fetchNotification",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await chatService.fetchNotifications(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteNotification = createAsyncThunk(
  "chats/deleteNotification",
  async (notificationMessage, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await chatService.deleteNotification(notificationMessage, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    resetChats: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.message = "";
      state.allChats = null;
      state.isSuccess = false;
      state.chat = null;
      state.chatDetails = null;
      state.searchedContacts = null;
      selectedChatCompare = null;
    },
    getMessage: (state, action) => {
      state.chatDetails.push(action.payload);
    },
    joinRoom: (state) => {
      socketInstance.io.emit("join chat", state.chat._id);
      selectedChatCompare = current(state.chat);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allChats = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchChatDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchChatDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.chatDetails = action.payload;
      })
      .addCase(createChat.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.chat = action.payload;
        const index = state.allChats.findIndex(
          (chat) => chat._id === action.payload._id
        );
        if (index === -1) {
          state.allChats = [...state.allChats, action.payload];
        }
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(fetchChatDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isSuccess = true;
        if (state.chatDetails.includes(action.payload) === false) {
          state.chatDetails.push(action.payload);
        }
        const index = state.allChats.findIndex(
          (chat) => chat._id === state.chat._id
        );
        state.allChats[index].latestMessage = action.payload;
        const newChat = state.allChats[index];
        const filterChats = state.allChats.filter(
          (chat) => chat._id !== state.chat._id
        );
        state.allChats = [...filterChats, newChat];
        socketInstance.io.emit("new message", action.payload);
      })
      .addCase(searchContacts.fulfilled, (state, action) => {
        state.searchedContacts = action.payload;
      })
      .addCase(addNotification.fulfilled, (state, action) => {
        if (!state.notifications.includes(action.payload.message)) {
          state.notifications = [
            action.payload.message,
            ...state.notifications,
          ];
        }
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        const notificationsMessage = [];
        for (let i = 0; i < action.payload.length; i++) {
          notificationsMessage.push(action.payload[i].message);
        }
        state.notifications = notificationsMessage;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        const index = state.notifications.findIndex(
          (notification) => notification._id === action.payload._id
        );
        state.notifications.splice(index, 1);
      });
  },
});
export const { reset, resetChats, getMessage, joinRoom } = chatsSlice.actions;
export { selectedChatCompare };
export default chatsSlice.reducer;
