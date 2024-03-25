import { createSlice } from '@reduxjs/toolkit';

import { fetchProfile, updateProfile } from './profile.actions';
import { TProfileResponse } from '@shared/types/profile-response.type';

type TProfileError = {
    status?: number;
    error?: string;
    message?: string;
};

type TInitialState = {
    profile: TProfileResponse | null;
    errors: TProfileError | null;
    pending: boolean;
};

const initialState = {
    profile: null,
    errors: null,
    pending: false,
} as TInitialState;

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.errors = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.pending = true;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.pending = false;
                state.profile = action.payload;
                state.errors = null;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.pending = false;
                state.errors = action.payload as { message: string };
            })
            .addCase(updateProfile.pending, (state) => {
                state.pending = true;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.pending = false;
                state.profile = action.payload as TProfileResponse;
                state.errors = null;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.pending = false;
                state.errors = action.payload as { message: string };
            });
    },
});

const { reducer } = profileSlice;
export default reducer;
export const { clearErrors } = profileSlice.actions;
export { fetchProfile };
