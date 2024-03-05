import { createSlice } from '@reduxjs/toolkit';

import {
    fetchSignIn,
    fetchSignUp,
    fetchCheckEmail,
    fetchConfirmEmail,
    fetchChangePassword,
} from './auth.actions';

export type TAuthResponse = {
    accessToken: 'string';
};

type TEmailResponse = {
    email: string,
    message: "string"
};

type TChangePasswordResponse = {
    message: "string"
};

type TAuthError = {
    status?: number;
    error?: string;
    message?: string;
}

type TInitialState = {
    token?: string;
    emailData?: TEmailResponse;
    changePasswordData?: TChangePasswordResponse;
    errors: TAuthError | null;
    pending: boolean;
};

const initialState = {
    token: '',
    emailData: {},
    changePasswordData: {},
    errors: null,
    pending: false,
} as TInitialState;

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = '';
        },
        clearErrors: (state) => {
            state.errors = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSignIn.pending, (state) => {
                state.pending = true;
            })
            .addCase(fetchSignIn.fulfilled, (state, action) => {
                state.pending = false;
                state.token = action.payload.accessToken;
                state.errors = null;
            })
            .addCase(fetchSignIn.rejected, (state, action) => {
                state.pending = false;
                state.errors = action.payload as { message: string };
            })
            .addCase(fetchSignUp.pending, (state) => {
                state.pending = true;
            })
            .addCase(fetchSignUp.fulfilled, (state) => {
                state.pending = false;
                state.errors = null;
            })
            .addCase(fetchSignUp.rejected, (state, action) => {
                state.pending = false;
                state.errors = action.payload as { status: number };
            })
            .addCase(fetchCheckEmail.pending, (state) => {
                state.pending = true;
            })
            .addCase(fetchCheckEmail.fulfilled, (state, action) => {
                state.pending = false;
                state.emailData = action.payload;
                state.errors = null;
            })
            .addCase(fetchCheckEmail.rejected, (state, action) => {
                state.pending = false;
                state.errors = action.payload as { status: number, message: string };
            })
            .addCase(fetchConfirmEmail.pending, (state) => {
                state.pending = true;
            })
            .addCase(fetchConfirmEmail.fulfilled, (state, action) => {
                state.pending = false;
                state.emailData = action.payload;
                state.errors = null;
            })
            .addCase(fetchConfirmEmail.rejected, (state, action) => {
                state.pending = false;
                state.errors = action.payload as TAuthError;
            })
            .addCase(fetchChangePassword.pending, (state) => {
                state.pending = true;
            })
            .addCase(fetchChangePassword.fulfilled, (state, action) => {
                state.pending = false;
                state.changePasswordData = action.payload;
                state.errors = null;
            })
            .addCase(fetchChangePassword.rejected, (state, action) => {
                state.pending = false;
                state.errors = action.payload as TAuthError;
            })
    },
});

const { reducer } = authSlice;
export default reducer;
export const { logout, clearErrors } = authSlice.actions;
export { fetchSignIn };
