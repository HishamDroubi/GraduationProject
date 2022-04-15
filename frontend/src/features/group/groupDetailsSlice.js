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
export const requestDecision = createAsyncThunk(
  "group/:id/request/:id/acceptance",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await groupService.requestAcceptance(data, token);
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
      })
      .addCase(requestGroup.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.group.requests.push(action.payload);
      })
      .addCase(requestGroup.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(requestDecision.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(requestDecision.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload.acceptance)
          state.group.participants.push(action.payload);
        state.group.requests = state.group.requests.filter(
          (request) => request._id !== action.payload._id
        );
      })
      .addCase(requestDecision.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const { reset, resetAll } = groupDetailsSlice.actions;
export default groupDetailsSlice.reducer;
