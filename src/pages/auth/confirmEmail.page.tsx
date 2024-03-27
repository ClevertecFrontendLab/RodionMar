import { useLocation } from 'react-router-dom';

import { fetchConfirmEmail } from '@pages/auth/store/auth.actions';
import { history, useAppDispatch } from '@redux/configure-store';

import { ConfirmEmailComponent } from '@components/ConfirmEmail';

import { ConfirmEmail } from '@shared/types/confirm-email.type';
import { useEffect } from 'react';
import { ConfirmEmailResponse } from './types/confirmEmailResponse.type';
import { AppRouteEnum } from '@constants/app-routes.enum';

export const ConfirmEmailPage = () => {
    const dispatch = useAppDispatch();

    const location = useLocation();

    useEffect(() => {
        const isDirectAccess = !location.state || !location.state.fromServer;

        if (isDirectAccess) {
            history.push(AppRouteEnum.BASIC_AUTH);
        }
    }, [location.state]);

    const handleResponse = (response: ConfirmEmailResponse) => {
        if (response.meta.requestStatus === 'fulfilled') {
            if (window.localStorage.getItem('status')) {
                window.localStorage.removeItem('status');
            }

            window.localStorage.setItem('checkEmailData', response.payload.email);
            window.localStorage.setItem('status', 'execute');

            history.push(AppRouteEnum.CHANGE_PASSWORD, { fromServer: true });
            return true;
        } else {
            if (window.localStorage.getItem('status')) {
                window.localStorage.removeItem('status');
            }
            window.localStorage.setItem('status', 'error');

            history.push(AppRouteEnum.CONFIRM_EMAIL, { fromServer: true });
        }
    };

    const handleConfirmEmail = async (data: ConfirmEmail) => {
        const response = await dispatch(fetchConfirmEmail(data));

        const responseData: ConfirmEmailResponse = {
            meta: response.meta,
            payload: response.payload,
        };

        handleResponse(responseData);
    };

    return (
        <ConfirmEmailComponent
            handleConfirmEmail={handleConfirmEmail}
            status={(window.localStorage.getItem('status') as 'error') || 'execute'}
        />
    );
};
