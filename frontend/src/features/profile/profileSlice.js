import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileService from "./profileService";
const initialState = {
  userProfileCodeforcesInfo: {},
  isError: false,
  isLoading: true,
  message: null,
  isSuccess: false,
  userProfile: null,
  problemSolved: [],
};

export const getCodeforcesUserProfile = createAsyncThunk(
  "profile/getCodeforcesUserProfile",
  async (userName, thunkAPI) => {
    try {
      return await profileService.getCodeforcesUserProfile(userName);
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

export const getUserProfile = createAsyncThunk(
  "profile/getUserProfile",
  async (userName, thunkAPI) => {
    try {
      return await profileService.getUserProfile(userName);
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

export const getProblemSolved = createAsyncThunk(
  "profile/getProblemSolved",
  async (userName, thunkAPI) => {
    try {
      return await profileService.getProblemSolved(userName);
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

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCodeforcesUserProfile.pending, (state) => {
        state.userProfileCodeforcesInfo = null;
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = null;
      })
      .addCase(getCodeforcesUserProfile.fulfilled, (state, action) => {
        state.userProfileCodeforcesInfo = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = null;
      })
      .addCase(getCodeforcesUserProfile.rejected, (state, action) => {
        state.userProfileCodeforcesInfo = null;
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.userProfile = null;
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = null;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.userProfile = null;
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getProblemSolved.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = null;
        state.problemSolved = null;
      })
      .addCase(getProblemSolved.fulfilled, (state, action) => {
        state.problemSolved = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = null;
      })
      .addCase(getProblemSolved.rejected, (state, action) => {
        state.problemSolved = null;
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = profileSlice.actions;
export default profileSlice.reducer;
