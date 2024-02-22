import Result from "@components/Result";
import { useAppDispatch } from "@hooks/index";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { push } from "redux-first-history";


const SignUpSuccess = () => {
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
      title="Регистрация успешна"
      description="Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль."
      buttonText="Войти"
      buttonTestId='registration-enter-button'
      handleRedirect={() => navigationDispatch(push("/auth"))}
    />
  )
};

export default SignUpSuccess;