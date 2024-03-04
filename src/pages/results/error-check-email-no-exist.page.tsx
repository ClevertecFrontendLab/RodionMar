import { useEffect } from "react";

import { history } from "@redux/configure-store";

import { useLocation } from "react-router-dom"
import { Result, Button } from "antd";

import cn from "classnames";

import styles from "./index.module.scss";


const ErrorCheckEmailNoExist = () => {
  const location = useLocation();

  useEffect(() => {
    const isDirectAccess = !location.state || !location.state.fromServer;

    if (isDirectAccess) {
      history.push('/auth');
    }

  }, [history, location.state]);

  return (
    <Result
      className={cn(styles.result, styles.emailResult)}
      status="error"
      title="Такой e-mail не зарегистрирован"
      subTitle={<>Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail</>}
      extra={<Button
        type="primary"
        size="large"
        htmlType="button"
        className={styles.button}
        onClick={() => history.push('/auth')}
        data-test-id="check-retry-button"
      >
        Попробовать снова
      </Button>
      }
    />
  )
};

export default ErrorCheckEmailNoExist;