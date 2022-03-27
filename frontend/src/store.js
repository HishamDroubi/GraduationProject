import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import levelReducer from "./features/level/levelSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    level: levelReducer,
  },
});
