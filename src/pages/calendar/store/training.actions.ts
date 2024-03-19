import { $api } from '../../../api/api';
import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TTrainingRequest } from '../../../shared/types/training-request.type';
import { TCreateTraining } from '@shared/types/create-training.type';
import { TTrainingResponse } from '@shared/types/training-response.type';
import { TrainingEndpointEnum } from '../constants/training-endpoints.enum';
import { TrainingThunkPrefix } from '../constants/training-thunk-prefixes .enum';

export const fetchTrainings = createAsyncThunk(
    TrainingThunkPrefix.FETCH_TRAININGS,
    async (_, { rejectWithValue }) => {
        try {
            const response = await $api.get(TrainingEndpointEnum.TRAININGS);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data.message as string);
            }
        }
    },
);

export const fetchTrainingsCatalog = createAsyncThunk(
    TrainingThunkPrefix.FETCH_TRAININGS_CATALOG,
    async (_, { rejectWithValue }) => {
        try {
            const response = await $api.get(TrainingEndpointEnum.FETCH_TRAININGS_CATALOG);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data.message as string);
            }
        }
    },
);

export const createTraining = createAsyncThunk(
    TrainingThunkPrefix.CREATE_TRAINING,
    async (data: TCreateTraining, { rejectWithValue }) => {
        try {
            const response = await $api.post(TrainingEndpointEnum.TRAININGS, data);
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
    TrainingThunkPrefix.UPDATE_TRAINING,
    async (data: TTrainingRequest, { rejectWithValue }) => {
        try {
            const response = await $api.put(`${TrainingEndpointEnum.TRAININGS}/${data._id}`, data);
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
    TrainingThunkPrefix.DELETE_TRAINING,
    async (id: string, { rejectWithValue }) => {
        try {
            const { data } = await $api.delete(`${TrainingEndpointEnum.TRAININGS}/${id}`);
            return data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data.message as string);
            }
        }
    },
);
