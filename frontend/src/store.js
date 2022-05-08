import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import levelReducer from "./features/level/levelSlice";
import levelFormReducer from "./features/level/levelFormSlice";
import levelDetailsReducer from "./features/level/levelDetailsSlice";
import profileReducer from "./features/profile/profileSlice";
import groupReducer from "./features/group/groupSlice";
import createGroupReducer from "./features/group/createGroupSlice";
import groupDetailsReducer from "./features/group/groupDetailsSlice";
import chatsReducer from "./features/chat/chatsSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    level: levelReducer,
    levelForm: levelFormReducer,
    levelDetails: levelDetailsReducer,
    profile: profileReducer,
    group: groupReducer,
    createGroup: createGroupReducer,
    groupDetails: groupDetailsReducer,
    chats: chatsReducer,
  },
});
