import { $api } from '../../../api/api';
import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SettingsThunkPrefix } from '../constants/settings-thunk-prefixes .enum';
import { SettingsEndpointEnum } from '../constants/settings-endpoints.enum';
import { TTarifRequest } from '@shared/types/tarif-request.type';

export const fetchTariffList = createAsyncThunk(
    SettingsThunkPrefix.FETCH_TARIFF_LIST,
    async (_, { rejectWithValue }) => {
        try {
            const response = await $api.get(SettingsEndpointEnum.FETCH_TARIFF_LIST);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data.message as string);
            }
        }
    },
);

export const createTariff = createAsyncThunk(
    SettingsThunkPrefix.CREATE_TARIFF,
    async (data: TTarifRequest, { rejectWithValue }) => {
        try {
            const response = await $api.post(SettingsEndpointEnum.CREATE_TARIFF, data);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data.message as string);
            }
        }
    },
);
