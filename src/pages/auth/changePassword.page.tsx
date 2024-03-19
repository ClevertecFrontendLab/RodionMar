import { fetchChangePassword } from '@pages/auth/store/auth.actions';
import { AppDispatch, history } from '@redux/configure-store';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { ChangePasswordComponent } from '@components/ChangePassword';

import { TChangePassword } from '@shared/types/change-password.type';
import { useEffect } from 'react';
import { TChangePasswordResponse } from './types/changePasswordResponse.type';
import { AppRouteEnum } from '@constants/app-routes.enum';

export const ChangePasswordPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();

    useEffect(() => {
        const isDirectAccess = !location.state || !location.state.fromServer;

        if (isDirectAccess) {
            history.push(AppRouteEnum.BASIC_AUTH);
        }
    }, [location.state]);

    const handleResponse = (response: TChangePasswordResponse) => {
        if (response.meta.requestStatus === 'fulfilled') {
            localStorage.removeItem('changePasswordData');
            history.push(AppRouteEnum.SUCCESS_CHANGE_PASSWORD, { fromServer: true });
            return true;
        } else {
            history.push(AppRouteEnum.ERROR_CHANGE_PASSWORD, { fromServer: true });
        }
    };

    const handleChangePassword = async (data: TChangePassword) => {
        const response = await dispatch(fetchChangePassword(data));

        const responseData: TChangePasswordResponse = {
            meta: response.meta,
        };

        handleResponse(responseData);
    };

    return <ChangePasswordComponent handleChangePassword={handleChangePassword} />;
};
