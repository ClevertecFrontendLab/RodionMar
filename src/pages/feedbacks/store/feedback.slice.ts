import { createSlice } from '@reduxjs/toolkit';

import { fetchFeedbacks, fetchCreateFeedback } from './feedback.actions';

import { TGetFeedback } from '@shared/types/get-feedback.type';

type TInitialState = {
    feedbacks: TGetFeedback[];
    errors: string | number | null;
    pending: boolean;
};

const initialState = {
    feedbacks: [],
    errors: null,
    pending: false,
} as TInitialState;

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.errors = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFeedbacks.pending, (state) => {
                state.pending = true;
            })
            .addCase(fetchFeedbacks.fulfilled, (state, action) => {
                state.pending = false;
                state.errors = null;
                state.feedbacks = action.payload;
            })
            .addCase(fetchFeedbacks.rejected, (state, action) => {
                state.pending = false;
                state.errors = action.payload as number;
            })
            .addCase(fetchCreateFeedback.pending, (state) => {
                state.pending = true;
            })
            .addCase(fetchCreateFeedback.fulfilled, (state) => {
                state.pending = false;
                state.errors = null;
            })
            .addCase(fetchCreateFeedback.rejected, (state, action) => {
                state.pending = false;
                state.errors = action.payload as string;
            });
    },
});

const { reducer } = feedbackSlice;
export default reducer;
export const { clearErrors } = feedbackSlice.actions;
export { fetchFeedbacks };
