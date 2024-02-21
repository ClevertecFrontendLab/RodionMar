import SignUpComponent from '@components/SignUp';

import { To } from 'react-router-dom';

import { clearErrors } from './store/auth.slice';

import { IAuth } from '../../types/auth.interface';
import { fetchSignUp } from './store/auth.actions';
import { CallHistoryMethodAction, push } from 'redux-first-history/build/es6/actions';
import { useAppDispatch } from '@hooks/index';

export const handleResponse = (
    response: any,
    navigationDispatch: (path: CallHistoryMethodAction<[to: To, state?: any]>) => void,
) => {
    if (response.meta.requestStatus === 'fulfilled') {
        navigationDispatch(push('/result/success', { fromServer: true }));
        return true;
    } else {
        switch (response.payload) {
            case 409:
                navigationDispatch(push('/result/error-user-exist', { fromServer: true }));
                break;
            default:
                navigationDispatch(push('/result/error', { fromServer: true }));
        }
    }
};

const SignUpPage = () => {
    const authDispatch = useAppDispatch();
    const navigationDispatch = useAppDispatch();

    const handleRedirectToSignIn = () => {
        authDispatch(clearErrors());
        navigationDispatch(push('/auth'));
    };

    const handleSignUp = async (data: IAuth) => {
        const responseData = await authDispatch(fetchSignUp(data));
        handleResponse(responseData, navigationDispatch);
    };

    return (
        <SignUpComponent
            handleRedirectToSignIn={handleRedirectToSignIn}
            handleSignUp={handleSignUp}
        />
    );
};

export default SignUpPage;
