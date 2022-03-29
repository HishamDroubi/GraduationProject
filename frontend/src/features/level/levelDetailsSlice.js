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
      return await levelService.getLevel(levelId);
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
        state.level = null;
      });
  },
});
export const { reset } = levelDetailsSlice.actions;
export default levelDetailsSlice.reducer;
