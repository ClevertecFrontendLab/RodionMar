import { useEffect } from "react";

import Result from "@components/Result";

import { useLocation } from "react-router-dom";
import { history } from "@redux/configure-store";


const SignUpErrorUserExist = () => {
  const location = useLocation();

  useEffect(() => {
    const isDirectAccess = !location.state || !location.state.fromServer;

    if (isDirectAccess) {
      history.push('/auth');
    }
    
  }, [history, location.state]);

  return(
    <Result 
      result="error"
      title="Данные не сохранились"
      description="Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail."
      buttonTestId="registration-back-button"
      buttonText="Назад к регистрации"
      handleRedirect={() => history.push("/auth/registration")}
    />
  )
};

export default SignUpErrorUserExist;