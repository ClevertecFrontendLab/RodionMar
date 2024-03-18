import { $api } from '../../../api/api';
import { AxiosError } from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { TAuth } from '@shared/types/auth.type';
import { TCheckEmail } from '@shared/types/check-email.type';
import { TConfirmEmail } from '@shared/types/confirm-email.type';
import { TChangePassword } from '@shared/types/change-password.type';

export const fetchSignIn = createAsyncThunk(
    'auth/fetchSignIn',
    async (data: TAuth, { rejectWithValue }) => {
        try {
            const response = await $api.post(`/auth/login`, data);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data.message as string);
            }
        }
    },
);

export const fetchSignUp = createAsyncThunk(
    'auth/fetchSignUp',
    async (data: TAuth, { rejectWithValue }) => {
        try {
            const response = await $api.post(`/auth/registration`, data);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.status);
            }
        }
    },
);

export const fetchCheckEmail = createAsyncThunk(
    'auth/fetchCheckEmail',
    async (data: TCheckEmail, { rejectWithValue }) => {
        try {
            const response = await $api.post(`/auth/check-email`, data);
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
    'auth/fetchConfirmEmail',
    async (data: TConfirmEmail, { rejectWithValue }) => {
        try {
            const response = await $api.post(`/auth/confirm-email`, data, {
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
    'auth/fetchChangePassword',
    async (data: TChangePassword, { rejectWithValue }) => {
        try {
            const response = await $api.post(`/auth/change-password`, data, {
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
    'auth/fetchGoogleAuth',
    async (_, { rejectWithValue }) => {
        try {
            const response = await $api.post(`/auth/google`);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error?.response?.data);
            }
        }
    },
);
