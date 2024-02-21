import { useEffect } from "react";

import Result from "@components/Result";
import { useAppDispatch } from "@hooks/index";

import { useLocation } from "react-router-dom"
import { push } from "redux-first-history";


const SignUpErrorUserExist = () => {
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
      result="error"
      title="Данные не сохранились"
      description="Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail."
      buttonTestId="registration-back-button"
      buttonText="Назад к регистрации"
      handleRedirect={() => navigationDispatch(push("/auth/registration"))}
    />
  )
};

export default SignUpErrorUserExist;