import { useLocation } from 'react-router-dom';

import { fetchConfirmEmail } from '@pages/auth/store/auth.actions';
import { AppDispatch, history } from '@redux/configure-store';
import { useDispatch } from 'react-redux';

import { ConfirmEmailComponent } from '@components/ConfirmEmail';

import { TConfirmEmail } from '@shared/confirm-email.type';
import { useEffect } from 'react';
import { TConfirmEmailResponse } from './types/confirmEmailResponse.type';


export const handleResponseConfirmEmail = (response: TConfirmEmailResponse) => {
    if (response.meta.requestStatus === 'fulfilled') {
        if (window.localStorage.getItem('status')) {
            window.localStorage.removeItem('status');
        }

        window.localStorage.setItem('checkEmailData', response.payload.email);
        window.localStorage.setItem('status', 'execute');

        history.push('/auth/change-password', { fromServer: true });
        return true;
    } else {
        if (window.localStorage.getItem('status')) {
            window.localStorage.removeItem('status');
        }
        window.localStorage.setItem('status', 'error');

        history.push('/auth/confirm-email', { fromServer: true });
    }
};

export const ConfirmEmailPage = () => {
    const dispatch = useDispatch<AppDispatch>();

    const location = useLocation();

    useEffect(() => {
        const isDirectAccess = !location.state || !location.state.fromServer;

        if (isDirectAccess) {
            history.push('/auth');
        }
    }, [history, location.state]);

    const handleConfirmEmail = async (data: TConfirmEmail) => {
        const response = await dispatch(fetchConfirmEmail(data));

        const responseData: TConfirmEmailResponse = {
            meta: response.meta,
            payload: response.payload
        }

        handleResponseConfirmEmail(responseData);
    };

    return (
        <ConfirmEmailComponent
            handleConfirmEmail={handleConfirmEmail}
            status={(window.localStorage.getItem('status') as 'error') || 'execute'}
        />
    );
};