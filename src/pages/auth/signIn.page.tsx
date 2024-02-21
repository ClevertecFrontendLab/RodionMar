import { To } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '@redux/configure-store';
import { clearErrors, fetchSignIn } from './store/auth.slice';

import { IAuth } from '../../types/auth.interface';
import { ICheckEmail } from '../../types/check-email.interface';

import { useAppDispatch } from "@hooks/index";

import SignInComponent from '@components/SignIn';
import { fetchCheckEmail } from './store/auth.actions';
import { CallHistoryMethodAction, push } from 'redux-first-history/build/es6/actions';


export const handleResponseSignIn = (
  response: any,
  navigationDispatch: (path: CallHistoryMethodAction<[to: To, state?: any]>) => void
) => {
  if (response.meta.requestStatus === "fulfilled") {
    window.localStorage.setItem("token", response.payload);
    navigationDispatch(push("/main"));
    return true;
  } else {
    navigationDispatch(push("/result/error-login", { fromServer: true }));
  }
};

export const handleResponseCheckEmail = (
  response: any,
  navigationDispatch: (path: CallHistoryMethodAction<[to: To, state?: any]>) => void
) => {
  if (response.meta.requestStatus === "fulfilled") {
    window.localStorage.setItem("checkEmailData", response.payload.email);
    navigationDispatch(push("/auth/confirm-email", { fromServer: true }));
    return true;
  } else {
    response.payload.status === 404 && response.payload.message === "Email не найден" 
      ? navigationDispatch(push("/result/error-check-email-no-exist", { fromServer: true }))
      : navigationDispatch(push("/result/error-check-email", { fromServer: true }));
  }
};

window.addEventListener('beforeunload', () => {
  const storedProfile = JSON.parse(window.localStorage.getItem('profile') || '{}');
  
  if (storedProfile.remember === false) {
    window.localStorage.removeItem("token");
  }
});

const SignInPage = () => {
  const authDispatch = useDispatch<AppDispatch>();
  const navigationDispatch = useAppDispatch();
  
  const handleSignIn = async (data: IAuth) => {
    const newToken = await authDispatch(fetchSignIn(data));
    handleResponseSignIn(newToken, navigationDispatch);
  };

  const handleRedirectToSignUp = () => {
    authDispatch(clearErrors());
    navigationDispatch(push("/auth/registration"));
  };

  const handleRedirectToForgetPassword = async (data: ICheckEmail) => {
    authDispatch(clearErrors());

    if(window.localStorage.getItem("status")) {
      window.localStorage.removeItem("status");
    }

    const responseData = await authDispatch(fetchCheckEmail(data));
    handleResponseCheckEmail(responseData, navigationDispatch)
  };

  return (
    <SignInComponent
      handleSignIn={handleSignIn}
      handleRedirectToSignUp={handleRedirectToSignUp}
      handleRedirectToForgetPassword={handleRedirectToForgetPassword}
    />
  );
};

export default SignInPage;
