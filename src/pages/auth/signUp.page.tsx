import { SignUpComponent } from '@components/SignUp';
import { clearErrors } from './store/auth.slice';
import { Auth } from '@shared/types/auth.type';
import { SignUpResponse } from '@shared/types/sign-up-response.type copy';
import { fetchSignUp } from './store/auth.actions';
import { useAppDispatch } from '@hooks/index';
import { history } from '@redux/configure-store';
import { AppRouteEnum } from '@constants/app-routes.enum';

export const SignUpPage = () => {
    const dispatch = useAppDispatch();

    const handleRedirectToSignIn = () => {
        dispatch(clearErrors());
        history.push(AppRouteEnum.BASIC_AUTH);
    };

    const handleResponse = (response: SignUpResponse) => {
        if (response.meta.requestStatus === 'fulfilled') {
            history.push(AppRouteEnum.SUCCESS, { fromServer: true });
            return true;
        } else {
            switch (response.payload) {
                case 409:
                    history.push(AppRouteEnum.ERROR_USER_EXIST, { fromServer: true });
                    break;
                default:
                    history.push(AppRouteEnum.ERROR, { fromServer: true });
            }
        }
    };

    const handleSignUp = async (data: Auth) => {
        const response = await dispatch(fetchSignUp(data));

        const responseData: SignUpResponse = {
            meta: response.meta,
            payload: response.payload,
        };

        handleResponse(responseData);
    };

    return (
        <SignUpComponent
            handleRedirectToSignIn={handleRedirectToSignIn}
            handleSignUp={handleSignUp}
        />
    );
};
