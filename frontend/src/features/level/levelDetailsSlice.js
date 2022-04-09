import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import levelService from "./levelService";
const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  level: null,
};
export const fetchLevel = createAsyncThunk(
  "level/problems",
  async (levelId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await levelService.getLevel(levelId, token);
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
export const addProblem = createAsyncThunk(
  "level/addProblems",
  async (problemData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const levelId = thunkAPI.getState().levelDetails.level._id;
      return await levelService.addProblem(problemData, token, levelId);
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
export const levelDetailsSlice = createSlice({
  name: "levelDetails",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLevel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLevel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.level = action.payload;
      })
      .addCase(fetchLevel.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addProblem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProblem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.level.problems.push(action.payload);
        state.level.problems.sort((a, b) => a.rating - b.rating);
      })
      .addCase(addProblem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const { reset } = levelDetailsSlice.actions;
export default levelDetailsSlice.reducer;
