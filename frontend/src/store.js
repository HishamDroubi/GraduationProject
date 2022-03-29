import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import levelReducer from "./features/level/levelSlice";
import levelFormReducer from "./features/level/levelFormSlice";
import levelDetailsReducer from "./features/level/levelDetailsSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    level: levelReducer,
    levelForm: levelFormReducer,
    levelDetails: levelDetailsReducer,
  },
});
