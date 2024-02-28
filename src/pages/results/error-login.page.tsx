import { useEffect } from "react";

import Result from "@components/Result";

import { useLocation } from "react-router-dom"
import { history } from "@redux/configure-store";

const ErrorLogin = () => {
  const location = useLocation();

  useEffect(() => {
    const isDirectAccess = !location.state || !location.state.fromServer;

    if (isDirectAccess) {
      history.push('/auth');
    }
    
  }, [history, location.state]);
  
  return(
    <Result 
      result="warning"
      title="Вход не выполнен"
      description="Что-то пошло не так. Попробуйте еще раз"
      buttonTestId="login-retry-button"
      buttonText="Повторить"
      handleRedirect={() => history.push('/auth')}
    />
  )
};

export default ErrorLogin;