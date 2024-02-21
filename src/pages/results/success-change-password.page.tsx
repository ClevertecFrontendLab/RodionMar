import Result from "@components/Result";
import { useAppDispatch } from "@hooks/index";
import { useEffect } from "react";

import { useLocation } from "react-router-dom"
import { push } from "redux-first-history";

const SuccessChangePasswordPage = () => {
  const location = useLocation();
  const navigationDispatch = useAppDispatch();

  useEffect(() => {
    const isDirectAccess = !location.state || !location.state.fromServer;

    if (isDirectAccess) {
      navigationDispatch(push('/auth'));
    }
    
  }, [navigationDispatch, location.state]);
  
  return(
    <Result 
      result="success"
      title="Пароль успешно изменен"
      description="Теперь можно войти в аккаунт, используя свой логин и новый пароль"
      buttonTestId="change-entry-button"
      buttonText="Вход"
      handleRedirect={() => navigationDispatch(push('/auth'))}
    />
  )
};

export default SuccessChangePasswordPage;