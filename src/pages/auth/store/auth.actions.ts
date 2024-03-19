import { $api } from '../../../api/api';
import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TAuth } from '@shared/types/auth.type';
import { TCheckEmail } from '@shared/types/check-email.type';
import { TConfirmEmail } from '@shared/types/confirm-email.type';
import { TChangePassword } from '@shared/types/change-password.type';
import { AuthEndpointEnum } from '../constants/auth-endpoints.enum';
import { AuthThunkPrefix } from '../constants/auth-thunk-prefixes .enum';

export const fetchSignIn = createAsyncThunk(
    AuthThunkPrefix.FETCH_SIGN_IN,
    async (data: TAuth, { rejectWithValue }) => {
        try {
            const response = await $api.post(AuthEndpointEnum.AUTH_LOGIN, data);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data.message as string);
            }
        }
    },
);

export const fetchSignUp = createAsyncThunk(
    AuthThunkPrefix.FETCH_SIGN_UP,
    async (data: TAuth, { rejectWithValue }) => {
        try {
            const response = await $api.post(AuthEndpointEnum.AUTH_REGISTRATION, data);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.status);
            }
        }
    },
);

export const fetchCheckEmail = createAsyncThunk(
    AuthThunkPrefix.FETCH_CHECK_EMAIL,
    async (data: TCheckEmail, { rejectWithValue }) => {
        try {
            const response = await $api.post(AuthEndpointEnum.AUTH_CHECK_EMAIL, data);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue({
                    status: error.response?.status,
                    message: error.response?.data.message,
                });
            }
        }
    },
);

export const fetchConfirmEmail = createAsyncThunk(
    AuthThunkPrefix.FETCH_CONFIRM_EMAIL,
    async (data: TConfirmEmail, { rejectWithValue }) => {
        try {
            const response = await $api.post(AuthEndpointEnum.AUTH_CONFIRM_EMAIL, data, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data);
            }
        }
    },
);

export const fetchChangePassword = createAsyncThunk(
    AuthThunkPrefix.FETCH_CHANGE_PASSWORD,
    async (data: TChangePassword, { rejectWithValue }) => {
        try {
            const response = await $api.post(AuthEndpointEnum.AUTH_CHANGE_PASSWORD, data, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error?.response?.data);
            }
        }
    },
);

export const fetchGoogleAuth = createAsyncThunk(
    AuthThunkPrefix.FETCH_GOOGLE_AUTH,
    async (_, { rejectWithValue }) => {
        try {
            const response = await $api.post(AuthEndpointEnum.AUTH_GOOGLE);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error?.response?.data);
            }
        }
    },
);
