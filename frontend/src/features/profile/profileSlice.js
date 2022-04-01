import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileService from './profileService'
const initialState = {
    userProfileCodeforcesInfo: {},
    isError: false,
    isLoading: true,
    message: null,
    isSuccess: false,
    userProfile: null,
    profileType: "handle",
    problemSolved: [],
}

export const getCodeforcesUserProfile = createAsyncThunk('profile/getCodeforcesUserProfile', async (userName) => {
    const userProfileCodeforcesInfo = await profileService.getCodeforcesUserProfile(userName);
    return userProfileCodeforcesInfo;
})

export const getUserProfile = createAsyncThunk('profile/getUserProfile', async (userName) => {
    const UserProfile = await profileService.getUserProfile(userName);
    return UserProfile;
})

export const setProfileType = createAsyncThunk('profile/setProfileType', async (type) => {
    return type;
})

export const getProblemSolved = createAsyncThunk('profile/getProblemSolved', async (userName) => {
    //console.log('dasd');
    const problemSolved = await profileService.getProblemSolved(userName);
    console.log('problemSolved')
    return problemSolved;
})

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
            builder
            .addCase(getCodeforcesUserProfile.pending, (state) => {
                state.userProfileCodeforcesInfo = null;
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.message = null;
            })
            .addCase(getCodeforcesUserProfile.fulfilled, (state, action) => {
                state.userProfileCodeforcesInfo = action.payload;
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = true;
                state.message = null;
            })
            .addCase(getCodeforcesUserProfile.rejected, (state, action) => {
                state.userProfileCodeforcesInfo = null;
                state.isLoading = true;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            .addCase(getUserProfile.pending, (state) => {
                state.userProfile = null;
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.message = null;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.userProfile = action.payload;
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.message = null;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.userProfile = null;
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            .addCase(setProfileType.pending, (state) => {
                state.profileType = null;
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.message = null
            })
            .addCase(setProfileType.fulfilled, (state, action) => {
                state.profileType = action.payload;
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = false;
                state.message = null;
            })
            .addCase(setProfileType.rejected, (state, action) => {
                state.profileType = null;
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            })
            .addCase(getProblemSolved.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.message = null;
                state.problemSolved = null;
            })
            .addCase(getProblemSolved.fulfilled, (state, action) => {
                state.problemSolved = action.payload;
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = false;
                state.message = null;
            })
            .addCase(getProblemSolved.rejected, (state, action) => {
                state.problemSolved = null;
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            });
    }
})

export const { reset } = profileSlice.actions;
export default profileSlice.reducer;