import { createSlice } from '@reduxjs/toolkit';

import {
    fetchTrainings,
    fetchTrainingsCatalog,
    createTraining,
    updateTraining,
    deleteTraining,
} from './training.actions';

import { TTrainingResponse } from '../../../shared/types/training-response.type';
import { TTrainingCatalogItem } from '@shared/types/training-catalog-item.type';
import { TTrainingRequest } from '@shared/types/training-request.type';

type TCalendarError = {
    status?: number;
    error?: string;
    message?: string;
};

type TInitialState = {
    trainings: TTrainingResponse[];
    trainingsCatalog: TTrainingCatalogItem[];
    training: Partial<TTrainingRequest> | null;
    errors: TCalendarError | null;
    pending: boolean;
};

const initialState = {
    trainings: [],
    trainingsCatalog: [],
    training: null,
    errors: null,
    pending: false,
} as TInitialState;

const calendarSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.errors = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrainings.pending, (state) => {
                state.pending = true;
            })
            .addCase(fetchTrainings.fulfilled, (state, action) => {
                state.pending = false;
                state.trainings = action.payload;
                state.errors = null;
            })
            .addCase(fetchTrainings.rejected, (state, action) => {
                state.pending = false;
                state.errors = action.payload as { message: string };
            })
            .addCase(fetchTrainingsCatalog.pending, (state) => {
                state.pending = true;
            })
            .addCase(fetchTrainingsCatalog.fulfilled, (state, action) => {
                state.pending = false;
                state.trainingsCatalog = action.payload;
                state.errors = null;
            })
            .addCase(fetchTrainingsCatalog.rejected, (state, action) => {
                state.pending = false;
                state.errors = action.payload as { message: string };
            })
            .addCase(createTraining.pending, (state) => {
                state.pending = true;
            })
            .addCase(createTraining.fulfilled, (state, action) => {
                state.pending = false;
                state.training = action.payload as TTrainingRequest;
                state.errors = null;
            })
            .addCase(createTraining.rejected, (state, action) => {
                state.pending = false;
                state.errors = action.payload as { status: number };
            })
            .addCase(updateTraining.pending, (state) => {
                state.pending = true;
            })
            .addCase(updateTraining.fulfilled, (state, action) => {
                state.pending = false;
                state.training = action.payload as TTrainingRequest;
                state.errors = null;
            })
            .addCase(updateTraining.rejected, (state, action) => {
                state.pending = false;
                state.errors = action.payload as { status: number; message: string };
            })
            .addCase(deleteTraining.pending, (state) => {
                state.pending = true;
            })
            .addCase(deleteTraining.rejected, (state, action) => {
                state.pending = false;
                state.errors = action.payload as TCalendarError;
            });
    },
});

const { reducer } = calendarSlice;
export default reducer;
export const { clearErrors } = calendarSlice.actions;
export { fetchTrainings };