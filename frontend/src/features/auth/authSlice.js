import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getByEmail = createAsyncThunk("auth/email", async(email, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await authService.getByEmail(email, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
}) 
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const invitationAcceptance = createAsyncThunk(
  "user/:id/invitation/:id",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.invitationAcceptance(data, token);
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
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
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
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    fetchNewInvetation: (state, action) => {
      if (
        !state.user.invitations.find(
          (invitation) => invitation._id === action.payload._id
        )
      ) {
        state.user.invitations.push(action.payload);
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
    deleteTheInvitation: (state, action) => {
      console.log(action.payload);
      state.user.invitations = state.user.invitations.filter(
        (invitation) => invitation._id !== action.payload._id
      );
      localStorage.setItem("user", JSON.stringify(state.user));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(invitationAcceptance.fulfilled, (state, action) => {
        state.user.invitations = state.user.invitations.filter(
          (invitation) => invitation._id !== action.payload._id
        );
        localStorage.setItem("user", JSON.stringify(state.user));
      });
  },
});
export const { reset, fetchNewInvetation, deleteTheInvitation } =
  authSlice.actions;
export default authSlice.reducer;
