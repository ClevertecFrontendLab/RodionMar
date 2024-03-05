import {SignUpComponent} from '@components/SignUp';

import { clearErrors } from './store/auth.slice';

import { TAuth } from '@shared/auth.type';
import { TSignUpResponse } from './types/signUpResponse.type copy';

import { fetchSignUp } from './store/auth.actions';
import { useAppDispatch } from '@hooks/index';
import { history } from '@redux/configure-store';

export const handleResponse = (response: TSignUpResponse) => {
    if (response.meta.requestStatus === 'fulfilled') {
        history.push('/result/success', { fromServer: true });
        return true;
    } else {
        switch (response.payload) {
            case 409:
                history.push('/result/error-user-exist', { fromServer: true });
                break;
            default:
                history.push('/result/error', { fromServer: true });
        }
    }
};

export const SignUpPage = () => {
    const dispatch = useAppDispatch();

    const handleRedirectToSignIn = () => {
        dispatch(clearErrors());
        history.push('/auth');
    };

    const handleSignUp = async (data: TAuth) => {
        const response = await dispatch(fetchSignUp(data));

        const responseData: TSignUpResponse = {
            meta: response.meta,
            payload: response.payload
        }

        handleResponse(responseData);
    };

    return (
        <SignUpComponent
            handleRedirectToSignIn={handleRedirectToSignIn}
            handleSignUp={handleSignUp}
        />
    );
};