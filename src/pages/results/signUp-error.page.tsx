import { useDispatch } from "react-redux";
import { AppDispatch, history } from "@redux/configure-store";
import { fetchSignUp } from "@pages/auth/store/auth.actions";

import styles from "./index.module.scss";

import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Result, Button } from "antd";

export const handleResponse = async (
  response: any,
) => {
  if (response.meta.requestStatus === "fulfilled") {
    history.push("/result/success", { fromServer: true });
    return true;
  } else {
    switch (response.payload) {
      case 409:
        history.push("/result/error-user-exist", { fromServer: true });
        break;
      default:
        history.push("/result/error", { fromServer: true });
    }
  }
};

const SignUpError = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  useEffect(() => {
    const isDirectAccess = !location.state || !location.state.fromServer;

    if (isDirectAccess) {
      history.push('/auth');
    }

  }, [history, location.state]);

  const handleRepeatRegistration = async () => {
    if (location.pathname === "/auth/result/error") {
      history.push("/auth/registration");
    }

    const storedProfile = JSON.parse(
      sessionStorage.getItem("signUpData") || "{}"
    );

    const data = {
      email: storedProfile.email,
      password: storedProfile.password
    };

    const responseData = await dispatch(fetchSignUp(data));
    handleResponse(responseData);
  };

  return (
    <Result
      className={styles.result}
      status="error"
      title="Данные не сохранились"
      subTitle={<>Что-то пошло не так и ваша регистрация<br />не завершилась. Попробуйте ещё раз.</>}
      extra={<Button
        type="primary"
        size="large"
        htmlType="button"
        className={styles.button}
        onClick={handleRepeatRegistration}
        data-test-id="registration-retry-button"
        block
      >
        Повторить
      </Button>
      }
    />
  );
};

export default SignUpError;