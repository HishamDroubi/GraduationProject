import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import groupService from "./groupService";
import { socketInstance } from "../../socket";
const initialState = {
  isError: false,
  isLoading: false,
  message: "",
  group: {},
  isSuccess: false,
  searchedUsers: null,
  invitations: null,
  blogs: null
, 
};
export const getGroupDetails = createAsyncThunk(
  "group/:id",
  async (groupId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await groupService.getGroupDetails(groupId, token);
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

export const deleteParticipants = createAsyncThunk(
  "group/:id/removeParticipant/:id",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await groupService.deleteParticipant(data, token);
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
export const requestDecision = createAsyncThunk(
  "group/:id/request/:id/acceptance",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await groupService.requestAcceptance(data, token);
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
export const uploadFile = createAsyncThunk(
  "group/:id/sheet/uploadFile",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const rr =  await groupService.uploadFile(data, token);
      console.log(rr);
      return rr;
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
export const deleteFile = createAsyncThunk(
  "group/:id/sheet/deleteFile/:id",
  async (attachmentId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await groupService.deleteFile(attachmentId, token);
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
export const InviteUsersSearch = createAsyncThunk(
  "group/:id/invite",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await groupService.InviteUsersSearch(data, token);
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
export const inviteUser = createAsyncThunk(
  "group/:id/invite/user/:id",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await groupService.inviteUser(data, token);
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
export const fetchGroupInvitations = createAsyncThunk(
  "group/:id/invitations",
  async (groupId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await groupService.fetchGroupInvitations(groupId, token);
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
export const cancelInvitation = createAsyncThunk(
  "group/:id/invitation/:id",
  async (invitationId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await groupService.cancelInvitation(invitationId, token);
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

export const createBlog = createAsyncThunk(
  "group/:id/createBlog",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await groupService.createBlog(data, token);
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

export const getAllBlog = createAsyncThunk(
  "group/:id/getAllBlog",
  async (data,thunkAPI) => {
    try { console.log("hahaha");
      const token = thunkAPI.getState().auth.user.token;
     
      return await groupService.getAllBlog(data, token);
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

export const groupDetailsSlice = createSlice({
  name: "groupDetails",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGroupDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGroupDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.group = action.payload;
      })
      .addCase(getGroupDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(requestDecision.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(requestDecision.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload.acceptance)
          state.group.participants.push(action.payload);
        state.group.requests = state.group.requests.filter(
          (request) => request._id !== action.payload._id
        );
      })
      .addCase(requestDecision.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(uploadFile.pending, (state, action) => {
       // state.isLoading = true;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.group.attachments.push(action.payload);
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteFile.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.group.attachments = state.group.attachments.filter(
          (attachment) => attachment._id !== action.payload._id
        );
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(InviteUsersSearch.fulfilled, (state, action) => {
        state.searchedUsers = action.payload;
      })
      .addCase(fetchGroupInvitations.fulfilled, (state, action) => {
        state.invitations = action.payload;
      })
      .addCase(inviteUser.fulfilled, (state, action) => {
        state.invitations.push(action.payload);
        socketInstance.io.emit("new invitation", action.payload);
      })
      .addCase(cancelInvitation.fulfilled, (state, action) => {
        state.invitations = state.invitations.filter(
          (invitation) => invitation._id !== action.payload._id
        );
        socketInstance.io.emit("cancel invitation", action.payload);
      })
      .addCase(deleteParticipants.fulfilled, (state, action) => {
        state.group.participants = action.payload.participants;
      })
      .addCase(getAllBlog.rejected, (state, action) => {
        state.message = action.payload; console.log(action.payload)
      })
      .addCase(getAllBlog.fulfilled, (state, action) => {
        console.log(action.payload)
        state.blogs = action.payload;
      });
  },
});
export const { reset } = groupDetailsSlice.actions;
export default groupDetailsSlice.reducer;
