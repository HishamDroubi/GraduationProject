import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import levelService from "./levelService";
const initialState = {
  isError: false,
  isLoading: false,
  message: "",
  levels: [],
};
export const getLevel = createAsyncThunk(
  "level/get",
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
export const levelSlice = createSlice({
  name: "level",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLevel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLevel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.levels = action.payload;
      })
      .addCase(getLevel.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export const { reset } = levelSlice.actions;
export default levelSlice.reducer;
