import { $api } from '../../../api/api';
import { AxiosError } from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { TTrainingRequest } from '../../../shared/types/training-request.type';
import { TCreateTraining } from '@shared/types/create-training.type';
import { TTrainingResponse } from '@shared/types/training-response.type';

export const fetchTrainings = createAsyncThunk(
    'calendar/fetchTrainings',
    async (_, { rejectWithValue }) => {
        try {
            const response = await $api.get(`/training`);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data.message as string);
            }
        }
    },
);

export const fetchTrainingsCatalog = createAsyncThunk(
    'calendar/fetchTrainingsCatalog',
    async (_, { rejectWithValue }) => {
        try {
            const response = await $api.get(`/catalogs/training-list`);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data.message as string);
            }
        }
    },
);

export const createTraining = createAsyncThunk(
    'calendar/careteTrainings',
    async (data: TCreateTraining, { rejectWithValue }) => {
        try {
            const response = await $api.post(`/training`, data);
            const responseData: TTrainingResponse = response.data;
            return responseData;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data.message as string);
            }
        }
    },
);

export const updateTraining = createAsyncThunk(
    'calendar/updateTrainings',
    async (data: TTrainingRequest, { rejectWithValue }) => {
        try {
            const response = await $api.put(`/training/${data._id}`, data);
            const responseData: TTrainingResponse = response.data;
            return responseData;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data.message as string);
            }
        }
    },
);

export const deleteTraining = createAsyncThunk(
    'calendar/deleteTraining',
    async (id: string, { rejectWithValue }) => {
        try {
            const { data } = await $api.delete(`/training/${id}`);
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data.message as string);
            }
        }
    },
);
