import {$api} from '../../../api/api';
import { AxiosError } from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { TCreateFeedback } from '@shared/create-feedback.type';

export const fetchCreateFeedback = createAsyncThunk(
    'feedbacks/fetchCreateFeedback',
    async (data: TCreateFeedback, { rejectWithValue }) => {
        try {
            const response = await $api.post(`/feedback`, data);
            return { status: response.status };
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data.message);
            }
        }
    },
);

export const fetchFeedbacks = createAsyncThunk(
    'feedbacks/fetchFeedbacks',
    async (_, { rejectWithValue }) => {
        try {
            const response = await $api.get(`/feedback`);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.status);
            }
        }
    },
);
