import { RootState } from '@redux/configure-store';

export const TrainingSelector = (state: RootState) => state.training.training;

export const TrainingsSelector = (state: RootState) => state.training.trainings;

export const TrainingsCatalogSelector = (state: RootState) => state.training.trainingsCatalog;

export const TrainingErrorSelector = (state: RootState) => state.training.errors;

export const TrainingPendingSelector = (state: RootState) => state.training.pending;
