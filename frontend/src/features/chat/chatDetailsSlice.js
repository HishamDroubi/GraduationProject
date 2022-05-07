import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import chatService from "./chatService";
const initialState = {
  isError: false,
  isLoading: false,
  message: "",
  chat: [],
  isSuccess: false,
};
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

export const chatDetailsSlice = createSlice({
  name: "chatDetails",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchChatDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.chat = action.payload;
      })
      .addCase(fetchChatDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.chat.push(action.payload);
      });
  },
});
export const { reset } = chatDetailsSlice.actions;
export default chatDetailsSlice.reducer;
