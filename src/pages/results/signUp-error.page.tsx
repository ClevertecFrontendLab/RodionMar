import { useDispatch } from "react-redux";
import { AppDispatch } from "@redux/configure-store";
import { fetchSignUp } from "@pages/auth/store/auth.actions";

import Result from "@components/Result";

import { To, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { push } from "redux-first-history";
import { useAppDispatch } from "@hooks/index";
import { CallHistoryMethodAction } from "redux-first-history/build/es6/actions";

export const handleResponse = async (
  response: any,
  navigationDispatch: (path: CallHistoryMethodAction<[to: To, state?: any]>) => void
) => {
  if (response.meta.requestStatus === "fulfilled") {
    navigationDispatch(push("/result/success", { fromServer: true } ));
    return true;
  } else {
    switch (response.payload) {
      case 409:
        navigationDispatch(push("/result/error-user-exist", { fromServer: true }));
        break;
      default:
        navigationDispatch(push("/result/error", { fromServer: true }));
    }
  }
};

const SignUpError = () => {
  const authDispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigationDispatch = useAppDispatch();

  useEffect(() => {
    const isDirectAccess = !location.state || !location.state.fromServer;

    if (isDirectAccess) {
      navigationDispatch(push('/auth'));
    }
    
  }, [navigationDispatch, location.state]);

  const handleRepeatRegistration = async () => {
    if (location.pathname === "/auth/result/error") {
      navigationDispatch(push("/auth/registration"));
    }

    const storedProfile = JSON.parse(
      sessionStorage.getItem("signUpData") || "{}"
    );

    const data = {
      email: storedProfile.email,
      password: storedProfile.password
    };

    const responseData = await authDispatch(fetchSignUp(data));
    handleResponse(responseData, navigationDispatch);
  };

  return (
    <div>
      <Result
        result="error"
        title="Данные не сохранились"
        description="Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз."
        buttonText="Повторить"
        buttonTestId="registration-retry-button"
        handleRedirect={handleRepeatRegistration}
      />
    </div>
  );
};

export default SignUpError;