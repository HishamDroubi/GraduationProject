import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
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
export const requestGroup = createAsyncThunk(
  "group/:id/request",
  async (groupId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await groupService.requestJoinGroup(groupId, token);
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
export const cancelRequest = createAsyncThunk(
  "group/:id/cancelRequest",
  async (requestId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await groupService.cancelRequest(requestId, token);
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
export const deleteGroup = createAsyncThunk(
  "group/:id/delete",
  async (groupId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await groupService.deleteGroup(groupId, token);
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
    },
    resetGroup: (state) => initialState,
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
      })
      .addCase(requestGroup.fulfilled, (state, action) => {
        state.isSuccess = true;
        const groupIdx = state.groups.findIndex(
          (group) => group._id === action.payload.group
        );
        state.groups[groupIdx].requests.push(action.payload);
      })
      .addCase(requestGroup.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(cancelRequest.fulfilled, (state, action) => {
        state.isSuccess = true;
        const groupIdx = state.groups.findIndex(
          (group) => group._id === action.payload.group
        );
        const requestIdx = state.groups[groupIdx].requests.findIndex(
          (request) => request.requester === action.payload.requester
        );
        state.groups[groupIdx].requests.splice(requestIdx, 1);
      })
      .addCase(cancelRequest.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteGroup.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.groups = state.groups.filter(
          (group) => group._id !== action.payload._id
        );
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});
export const { reset, resetGroup } = groupSlice.actions;
export default groupSlice.reducer;
