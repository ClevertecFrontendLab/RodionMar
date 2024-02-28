import { useEffect } from "react";

import Result from "@components/Result";
import { history } from "@redux/configure-store";

import { useLocation } from "react-router-dom"


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
      result="error"
      title="Такой e-mail не зарегистрирован"
      description={<>Мы не нашли в базе вашего e-mail. Попробуйте<br /> войти с другим e-mail</>}
      buttonText="Попробовать снова"
      buttonTestId="check-retry-button"
      isConfirmEmailPage
      handleRedirect={() => history.push('/auth')}
    />
  )
};

export default ErrorCheckEmailNoExist;