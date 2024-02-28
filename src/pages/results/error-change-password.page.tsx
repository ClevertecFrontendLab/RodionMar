import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, history } from "@redux/configure-store";
import { fetchChangePassword } from "@pages/auth/store/auth.actions";

import Result from "@components/Result";

import { useLocation } from "react-router-dom";


export const handleResponse = async (
  response: any,
) => {
  if (response.meta.requestStatus === "fulfilled") {
    history.push("/result/success-change-password", { fromServer: true });
    localStorage.removeItem("changePasswordData");
    return true;
  } else {
    history.push("/result/error-change-password", { fromServer: true });
  }
};

const ErrorChangePasswordPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  useEffect(() => {
    const isDirectAccess = !location.state || !location.state.fromServer;

    if (isDirectAccess) {
      history.push('/auth');
    }

  }, [history, location.state]);

  const handleRepeatChangePassword = async () => {
    if (location.pathname === "/auth/result/error-change-password") {
      history.push("/auth/change-passwword");
    }

    const storedPassword = JSON.parse(
      localStorage.getItem("changePasswordData") || "{}"
    );

    const data = {
      password: storedPassword.password,
      confirmPassword: storedPassword.password
    };

    const responseData = await dispatch(fetchChangePassword(data));
    handleResponse(responseData);
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