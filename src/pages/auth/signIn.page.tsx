import { useDispatch } from 'react-redux';
import { AppDispatch, history } from '@redux/configure-store';
import { clearErrors, fetchSignIn } from './store/auth.slice';
import { fetchCheckEmail } from './store/auth.actions';

import { TAuth } from '@shared/auth.type';
import { TCheckEmail } from '@shared/check-email.type';

import SignInComponent from '@components/SignIn';


export const handleResponseSignIn = (
  response: any,
) => {
  if (response.meta.requestStatus === "fulfilled") {
    window.localStorage.setItem("token", response.payload);
    history.push("/main");
    return true;
  } else {
    history.push("/result/error-login", { fromServer: true });
  }
};

export const handleResponseCheckEmail = (
  response: any,
) => {
  if (response.meta.requestStatus === "fulfilled") {
    window.localStorage.setItem("checkEmailData", response.payload.email);
    history.push("/auth/confirm-email", { fromServer: true })
    return true;
  } else {
    response.payload.status === 404 && response.payload.message === "Email не найден" 
      ? history.push("/result/error-check-email-no-exist", { fromServer: true })
      : history.push("/result/error-check-email", { fromServer: true });
  }
};

window.addEventListener('beforeunload', () => {
  const storedProfile = JSON.parse(window.localStorage.getItem('profile') || '{}');
  
  if (storedProfile.remember === false) {
    window.localStorage.removeItem("token");
  }
});

const SignInPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const handleSignIn = async (data: TAuth) => {
    const response = await dispatch(fetchSignIn(data));
    handleResponseSignIn(response);
  };

  const handleRedirectToSignUp = () => {
    dispatch(clearErrors());
    history.push("/auth/registration");
  };

  const handleRedirectToForgetPassword = async (data: TCheckEmail) => {
    dispatch(clearErrors());

    if(window.localStorage.getItem("status")) {
      window.localStorage.removeItem("status");
    }

    const response = await dispatch(fetchCheckEmail(data));
    handleResponseCheckEmail(response)
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
