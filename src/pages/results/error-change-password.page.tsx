import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, history } from "@redux/configure-store";
import { fetchChangePassword } from "@pages/auth/store/auth.actions";

import styles from "./index.module.scss";

import { useLocation } from "react-router-dom";
import { Button, Result } from "antd";


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
    if (location.pathname === "/result/error-change-password") {
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
    <Result
      className={styles.result}
      status="error"
      title="Данные не сохранились"
      subTitle="Что-то пошло не так. Попробуйте ещё раз"
      extra={<Button
        type="primary"
        size="large"
        htmlType="button"
        className={styles.button}
        onClick={handleRepeatChangePassword}
        data-test-id="change-retry-button"
        block
      >
        Повторить
      </Button>}
    />
  );
};

export default ErrorChangePasswordPage;