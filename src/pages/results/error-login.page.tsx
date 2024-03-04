import { useEffect } from "react";

import styles from "./index.module.scss";

import { useLocation } from "react-router-dom"
import { history } from "@redux/configure-store";
import { Result, Button } from "antd";

const ErrorLogin = () => {
  const location = useLocation();

  useEffect(() => {
    const isDirectAccess = !location.state || !location.state.fromServer;

    if (isDirectAccess) {
      history.push('/auth');
    }

  }, [history, location.state]);

  return (
    <Result
      className={styles.result}
      status="warning"
      title="Вход не выполнен"
      subTitle="Что-то пошло не так. Попробуйте еще раз"
      extra={
        <Button
          type="primary"
          size="large"
          htmlType="button"
          className={styles.button}
          onClick={() => history.push('/auth')}
          data-test-id="login-retry-button"
          block
        >
          Повторить
        </Button>
      }
    />
  )
};

export default ErrorLogin;