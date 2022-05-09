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
    resetChats: (state) => initialState,
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
      .addCase(fetchChats.pending, (state) => {
        state.isLoading = true;
      })
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
        state.chatDetails.push(action.payload);
        socketInstance.io.emit("new message", action.payload);
      });
  },
});
export const { reset, resetChats, getMessage, joinRoom } = chatsSlice.actions;
export { selectedChatCompare };
export default chatsSlice.reducer;
