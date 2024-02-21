import { useEffect } from "react";

import Result from "@components/Result";
import { useAppDispatch } from "@hooks/index";

import { useLocation } from "react-router-dom"
import { push } from "redux-first-history";

const ErrorLogin = () => {
  const navigationDispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    const isDirectAccess = !location.state || !location.state.fromServer;

    if (isDirectAccess) {
      navigationDispatch(push('/auth'));
    }
    
  }, [navigationDispatch, location.state]);
  
  return(
    <Result 
      result="warning"
      title="Вход не выполнен"
      description="Что-то пошло не так. Попробуйте еще раз"
      buttonTestId="login-retry-button"
      buttonText="Повторить"
      handleRedirect={() => navigationDispatch(push('/auth'))}
    />
  )
};

export default ErrorLogin;