import Result from "@components/Result";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { history } from "@redux/configure-store";


const SignUpSuccess = () => {
  const location = useLocation();

  useEffect(() => {
    const isDirectAccess = !location.state || !location.state.fromServer;

    if (isDirectAccess) {
      history.push('/auth');
    }
    
  }, [location.state]);
  
  return(
    <Result 
      result="success"
      title="Регистрация успешна"
      description="Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль."
      buttonText="Войти"
      buttonTestId='registration-enter-button'
      handleRedirect={() => history.push("/auth")}
    />
  )
};

export default SignUpSuccess;