import { createSlice } from '@reduxjs/toolkit';

import { fetchTariffList, createTariff } from './settings.actions';
import { TariffListResponse } from '@shared/types/tariff-list-response.type';

type SettingsError = {
    status?: number;
    error?: string;
    message?: string;
};

type InitialState = {
    tariffList: TariffListResponse[];
    errors: SettingsError | null;
    pending: boolean;
};

const initialState = {
    tariffList: [],
    errors: null,
    pending: false,
} as InitialState;

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.errors = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTariffList.pending, (state) => {
                state.pending = true;
            })
            .addCase(fetchTariffList.fulfilled, (state, action) => {
                state.pending = false;
                state.tariffList = action.payload;
                state.errors = null;
            })
            .addCase(fetchTariffList.rejected, (state, action) => {
                state.pending = false;
                state.errors = action.payload as { message: string };
            })
            .addCase(createTariff.pending, (state) => {
                state.pending = true;
            })
            .addCase(createTariff.fulfilled, (state) => {
                state.pending = false;
                state.errors = null;
            })
            .addCase(createTariff.rejected, (state, action) => {
                state.pending = false;
                state.errors = action.payload as { message: string };
            });
    },
});

const { reducer } = settingsSlice;
export default reducer;
export const { clearErrors } = settingsSlice.actions;
export { fetchTariffList };
