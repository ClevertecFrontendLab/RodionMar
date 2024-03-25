import { RootState } from '@redux/configure-store';

export const TariffListSelector = (state: RootState) => state.settings.tariffList;

export const SettingsErrorSelector = (state: RootState) => state.settings.errors;

export const SettingsPendingSelector = (state: RootState) => state.settings.pending;
