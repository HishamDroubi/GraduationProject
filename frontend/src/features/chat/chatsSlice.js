import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import chatService from "./chatService";
const initialState = {
  isError: false,
  isLoading: false,
  message: "",
  chats: [],
  isSuccess: false,
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
      });
  },
});
export const { reset, resetGroup } = chatsSlice.actions;
export default chatsSlice.reducer;
