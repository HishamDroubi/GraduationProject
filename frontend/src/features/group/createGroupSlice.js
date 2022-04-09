import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import groupService from "./groupService";
const initialState = {
  isError: false,
  isLoading: false,
  message: "",
  group: {},
  isSuccess: false,
};
export const createGroup = createAsyncThunk(
  "group/create",
  async (groupData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await groupService.createGroup(groupData, token);
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
export const createGroupSlice = createSlice({
  name: "creatGroup",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.group = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.group = action.payload;
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const { reset } = createGroupSlice.actions;
export default createGroupSlice.reducer;
