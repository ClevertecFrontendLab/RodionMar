import { createSlice } from "@reduxjs/toolkit";

import { fetchFeedbacks, fetchCreateFeedback } from "./feedback.actions";

import { TGetFeedback } from "@shared/get-feedback.type";

type IInitialState = {
  feedbacks: TGetFeedback[],
  errors: number | null;
  pending: boolean;
};

const initialState = {
  feedbacks: [],
  errors: null,
  pending: false,
} as IInitialState;

const feedbackSlice = createSlice({
  name: "feedback",
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
      .addCase(fetchFeedbacks.fulfilled, (state, action: any) => {
        state.pending = false;
        state.errors = null;
        state.feedbacks = action.payload.data
      })
      .addCase(fetchFeedbacks.rejected, (state, action: any & { payload: any }) => {
        state.pending = false;
        state.errors = action.payload;
      })
      .addCase(fetchCreateFeedback.pending, (state) => {
        state.pending = true;
      })
      .addCase(fetchCreateFeedback.fulfilled, (state) => {
        state.pending = false;
        state.errors = null;
      })
      .addCase(fetchCreateFeedback.rejected, (state, action: any & { payload: any }) => {
        state.pending = false;
        state.errors = action.payload || { statusCode: 0, error: "Unknown", message: "Unknown error" };
      })
  },
});

const { reducer } = feedbackSlice;
export default reducer;
export const { clearErrors } = feedbackSlice.actions;
export { fetchFeedbacks };
