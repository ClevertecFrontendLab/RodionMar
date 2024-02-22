import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch } from '@hooks/index';
import { AppDispatch } from "@redux/configure-store";
import { fetchChangePassword } from "@pages/auth/store/auth.actions";
import { push } from 'redux-first-history';
import { CallHistoryMethodAction } from "redux-first-history/build/es6/actions";

import Result from "@components/Result";

import { To, useLocation } from "react-router-dom";


export const handleResponse = async (
  response: any,
  navigationDispatch: (path: CallHistoryMethodAction<[to: To, state?: any]>) => void
) => {
  if (response.meta.requestStatus === "fulfilled") {
    navigationDispatch(push("/result/success-change-password", { fromServer: true }));
    localStorage.removeItem("changePasswordData");
    return true;
  } else {
    navigationDispatch(push("/result/error-change-password", { fromServer: true }));
  }
};

const ErrorChangePasswordPage = () => {
  const authDispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  const navigationDispatch = useAppDispatch();

  
    useEffect(() => {
      const isDirectAccess = !location.state || !location.state.fromServer;
  
      if (isDirectAccess) {
        navigationDispatch(push('/auth'));
      }
      
    }, [navigationDispatch, location.state]);

  const handleRepeatChangePassword = async () => {
    if (location.pathname === "/auth/result/error-change-password") {
      navigationDispatch(push("/auth/change-passwword"));
    }

    const storedPassword = JSON.parse(
      localStorage.getItem("changePasswordData") || "{}"
    );

    const data = {
      password: storedPassword.password,
      confirmPassword: storedPassword.password
    };

    const responseData = await authDispatch(fetchChangePassword(data));
    handleResponse(responseData, navigationDispatch);
  };

  return (
    <div>
      <Result
        result="error"
        title="Данные не сохранились"
        description="Что-то пошло не так. Попробуйте ещё раз"
        buttonTestId="change-retry-button"
        buttonText="Повторить"
        handleRedirect={handleRepeatChangePassword}
      />
    </div>
  );
};

export default ErrorChangePasswordPage;