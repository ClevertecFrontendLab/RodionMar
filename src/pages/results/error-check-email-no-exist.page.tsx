import { useEffect } from "react";

import Result from "@components/Result";
import { useAppDispatch } from "@hooks/index";
import { push } from "redux-first-history";

import { useLocation } from "react-router-dom"


const ErrorCheckEmailNoExist = () => {
  const navigationDispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    const isDirectAccess = !location.state || !location.state.fromServer;

    if (isDirectAccess) {
      navigationDispatch(push('/auth'));
    }
    
  }, [navigationDispatch, location.state]);

  return (
    <Result
      result="error"
      title="Такой e-mail не зарегистрирован"
      description="Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail."
      buttonText="Попробовать снова"
      buttonTestId="check-retry-button"
      isConfirmEmailPage
      handleRedirect={() => navigationDispatch(push('/auth'))}
    />
  )
};

export default ErrorCheckEmailNoExist;