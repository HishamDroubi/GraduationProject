import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import groupService from "./groupService";
const initialState = {
  isError: false,
  isLoading: false,
  message: "",
  groups: [],
  isSuccess: false,
  page: 1,
  pages: null,
};
export const fetchGroups = createAsyncThunk(
  "groups",
  async (pageNumber, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await groupService.fetchGroups(pageNumber, token);
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
export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.groups = [];
      state.page = 1;
      state.pages = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.groups = action.payload.groups;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const { reset } = groupSlice.actions;
export default groupSlice.reducer;
