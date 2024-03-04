import { RootState } from "@redux/configure-store";


export const FeedbackSelector = (state: RootState) => state.feedback.feedbacks;

export const FeedbackErrorSelector = (state: RootState) => state.feedback.errors;

export const FeedbackPendingSelector = (state: RootState) => state.feedback.pending;