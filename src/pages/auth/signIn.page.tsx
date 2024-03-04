import { useDispatch } from 'react-redux';
import { AppDispatch, RootState, history, useAppSelector } from '@redux/configure-store';
import { clearErrors, fetchSignIn } from './store/auth.slice';
import { fetchCheckEmail } from './store/auth.actions';
import { setLoading } from '@components/LottieLoader/loading.slice';

import { TAuth } from '@shared/auth.type';
import { TCheckEmail } from '@shared/check-email.type';

import SignInComponent from '@components/SignIn';
import { useEffect } from 'react';


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
  const location = useAppSelector((state: RootState) => state.router.previousLocations);
  const isLoading = useAppSelector((state: RootState) => state.loading.isLoading);

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

    if (window.localStorage.getItem("status")) {
      window.localStorage.removeItem("status");
    }

    const response = await dispatch(fetchCheckEmail(data));
    handleResponseCheckEmail(response)
  };

  const handleGoogleAuth = () => {
    dispatch(setLoading(true));
    window.location.href = 'https://marathon-api.clevertec.ru/auth/google';
  }

  useEffect(() => {
    if(isLoading) dispatch(setLoading(false));
    if (location && location.length > 0 && location[2]?.location?.search) {
      const token = location[2].location?.search.slice(13);
      localStorage.setItem('token', token);
      history.push("/main");
    }
  }, []);

  return (
    <SignInComponent
      handleSignIn={handleSignIn}
      handleRedirectToSignUp={handleRedirectToSignUp}
      handleRedirectToForgetPassword={handleRedirectToForgetPassword}
      handleGoogleAuth={handleGoogleAuth}
    />
  );
};

export default SignInPage;
