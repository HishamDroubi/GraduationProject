import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import groupService from "./groupService";

const initialState = {
  isError: false,
  isLoading: false,
  message: "",
  group: {},
  isSuccess: false,
};
export const getGroupDetails = createAsyncThunk(
  "group/:id",
  async (groupId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await groupService.getGroupDetails(groupId, token);
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
export const groupDetailsSlice = createSlice({
  name: "groupDetails",
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
      .addCase(getGroupDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGroupDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.group = action.payload;
      })
      .addCase(getGroupDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const { reset } = groupDetailsSlice.actions;
export default groupDetailsSlice.reducer;
