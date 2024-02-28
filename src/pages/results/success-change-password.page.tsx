import Result from "@components/Result";
import { useEffect } from "react";

import { useLocation } from "react-router-dom"
import { history } from "@redux/configure-store";

const SuccessChangePasswordPage = () => {
  const location = useLocation();

  useEffect(() => {
    const isDirectAccess = !location.state || !location.state.fromServer;

    if (isDirectAccess) {
      history.push('/auth');
    }
    
  }, [history, location.state]);
  
  return(
    <Result 
      result="success"
      title="Пароль успешно изменен"
      description={<>Теперь можно войти в аккаунт, используя<br />свой логин и новый пароль</>}
      buttonTestId="change-entry-button"
      buttonText="Вход"
      handleRedirect={() => history.push('/auth')}
    />
  )
};

export default SuccessChangePasswordPage;