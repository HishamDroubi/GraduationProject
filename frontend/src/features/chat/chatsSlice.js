import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import chatService from "./chatService";
const initialState = {
  isError: false,
  isLoading: false,
  message: "",
  chats: [],
  isSuccess: false,
  chatDetails: [],
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.chats = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchChatDetails.pending, (state) => {
        //state.isLoading = true;
      })
      .addCase(fetchChatDetails.fulfilled, (state, action) => {
        //state.isLoading = false;
        state.isSuccess = true;
        state.chatDetails = action.payload;
      })
      .addCase(fetchChatDetails.rejected, (state, action) => {
        //state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.chatDetails.push(action.payload.chat);
        const userExist = state.chats.findIndex(
          (chat) => chat.user._id === action.payload.receiver._id
        );

        if (userExist > -1) {
          state.chats[userExist]["latestMessage"] = action.payload.chat;
        } else {
          state.chats.push({
            latestMessage: action.payload.chat,
            user: action.payload.receiver,
          });
        }
      });
  },
});
export const { reset, resetChats } = chatsSlice.actions;
export default chatsSlice.reducer;
