import { RootState } from '@redux/configure-store';

export const ProfileSelector = (state: RootState) => state.profile.profile;

export const uploadImageSelector = (state: RootState) => state.profile.uploadImage;

export const ProfileErrorSelector = (state: RootState) => state.profile.errors;

export const ProfilePendingSelector = (state: RootState) => state.profile.pending;

export const UploadImagePendingSelector = (state: RootState) => state.profile.uploadImagePending;
