import { $api } from '../../../api/api';
import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProfileThunkPrefix } from '../constants/profile-thunk-prefixes .enum';
import { ProfileEndpointEnum } from '../constants/profile-endpoints.enum';
import { TProfileRequest } from '@shared/types/profile-request.type';
import { TProfileResponse } from '@shared/types/profile-response.type';

export const fetchProfile = createAsyncThunk(
    ProfileThunkPrefix.FETCH_PROFILE,
    async (_, { rejectWithValue }) => {
        try {
            const response = await $api.get(ProfileEndpointEnum.FETCH_PROFILE);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data.message as string);
            }
        }
    },
);

export const updateProfile = createAsyncThunk(
    ProfileThunkPrefix.UPDATE_PROFILE,
    async (data: TProfileRequest, { rejectWithValue }) => {
        try {
            const response = await $api.put(ProfileEndpointEnum.UPDATE_PROFILE, data);
            const responseData: TProfileResponse = response.data;
            return responseData;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data.message as string);
            }
        }
    },
);