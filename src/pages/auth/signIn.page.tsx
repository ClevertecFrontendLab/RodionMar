import { useDispatch } from 'react-redux';
import { AppDispatch, RootState, history, useAppSelector } from '@redux/configure-store';
import { clearErrors, fetchSignIn } from './store/auth.slice';
import { fetchCheckEmail } from './store/auth.actions';
import { setLoading } from '@components/LottieLoader/loading.slice';

import { TAuth } from '@shared/auth.type';
import { TCheckEmail } from '@shared/check-email.type';
import { TSignInResponse } from './types/signInResponse.type';
import { TCheckEmailResponse } from '@shared/check-email-response.type';

import { SignInComponent } from '@components/SignIn';
import { useEffect } from 'react';
import { AppRouteEnum } from '@constants/app-routes.enum';

window.addEventListener('beforeunload', () => {
    const storedProfile = JSON.parse(window.localStorage.getItem('profile') || '{}');

    if (storedProfile.remember === false) {
        window.localStorage.removeItem('token');
    }
});

export const SignInPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const location = useAppSelector((state: RootState) => state.router.previousLocations);
    const isLoading = useAppSelector((state: RootState) => state.loading.isLoading);

    const handleResponseSignIn = (response: TSignInResponse) => {
        if (response.meta.requestStatus === 'fulfilled') {
            window.localStorage.setItem('token', response.payload.accessToken);
            history.push(AppRouteEnum.BASIC_MAIN);
            return true;
        } else {
            history.push(AppRouteEnum.ERROR_LOGIN, { fromServer: true });
        }
    };

    const handleResponseCheckEmail = (response: TCheckEmailResponse) => {
        if (response.meta.requestStatus === 'fulfilled') {
            window.localStorage.setItem('checkEmailData', response.payload.email);
            history.push(AppRouteEnum.CONFIRM_EMAIL, { fromServer: true });
            return true;
        } else {
            response.payload.status === 404 && response.payload.message === 'Email не найден'
                ? history.push(AppRouteEnum.ERROR_CHECK_EMAIL_NO_EXIST, { fromServer: true })
                : history.push(AppRouteEnum.ERROR_CHECK_EMAIL, { fromServer: true });
        }
    };

    const handleSignIn = async (data: TAuth) => {
        const response = await dispatch(fetchSignIn(data));

        const responseData: TSignInResponse = {
            meta: response.meta,
            payload: response.payload,
        };

        handleResponseSignIn(responseData);
    };

    const handleRedirectToSignUp = () => {
        dispatch(clearErrors());
        history.push(AppRouteEnum.REGISTRATION);
    };

    const handleRedirectToForgetPassword = async (data: TCheckEmail) => {
        dispatch(clearErrors());

        if (window.localStorage.getItem('status')) {
            window.localStorage.removeItem('status');
        }

        const response = await dispatch(fetchCheckEmail(data));

        const responseData: TCheckEmailResponse = {
            meta: response.meta,
            payload: response.payload,
        };

        handleResponseCheckEmail(responseData);
    };

    const handleGoogleAuth = () => {
        dispatch(setLoading(true));
        window.location.href = 'https://marathon-api.clevertec.ru/auth/google';
    };

    useEffect(() => {
        if (location && location.length > 0 && location[2]?.location?.search) {
            if (isLoading) dispatch(setLoading(false));
            const token = location[2].location?.search.slice(13);
            localStorage.setItem('token', token);
            history.push(AppRouteEnum.MAIN);
        }
    }, [dispatch, isLoading, location]);

    return (
        <SignInComponent
            handleSignIn={handleSignIn}
            handleRedirectToSignUp={handleRedirectToSignUp}
            handleRedirectToForgetPassword={handleRedirectToForgetPassword}
            handleGoogleAuth={handleGoogleAuth}
        />
    );
};
