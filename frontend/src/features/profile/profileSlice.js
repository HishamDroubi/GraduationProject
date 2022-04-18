import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileService from "./profileService";
const initialState = {
  isError: false,
  isLoading: false,
  message: null,
  isSuccess: false,
  userProfile: null,
  problemSolved: [],
  page: 1,
  pages: 1,
};
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
  async (data, thunkAPI) => {
    try {
      return await profileService.getProblemSolved(data.userName, data.pageNumber);
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
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getProblemSolved.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProblemSolved.fulfilled, (state, action) => {
        state.problemSolved = action.payload.problemSolved;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getProblemSolved.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = profileSlice.actions;
export default profileSlice.reducer;
