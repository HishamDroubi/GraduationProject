import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import levelService from "./levelService";
const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  level: null,
};
export const create = createAsyncThunk(
  "level/create",
  async (level, thunkAPI) => {
    try {
      return await levelService.create(level);
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
export const levelFormSlice = createSlice({
  name: "levelForm",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.level = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(create.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.level = action.payload;
      })
      .addCase(create.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.level = null;
      });
  },
});
export const { reset } = levelFormSlice.actions;
export default levelFormSlice.reducer;
