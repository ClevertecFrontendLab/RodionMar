import { useEffect } from "react";

import Result from "@components/Result";
import { useAppDispatch } from "@hooks/index";
import { fetchCheckEmail } from "@pages/auth/store/auth.actions";
import { AppDispatch } from "@redux/configure-store";
import { useDispatch } from "react-redux";

import { To, useLocation } from "react-router-dom"
import { push } from "redux-first-history";
import { CallHistoryMethodAction } from "redux-first-history/build/es6/actions";


export const handleResponseCheckEmail = (
  response: any,
  navigationDispatch: (path: CallHistoryMethodAction<[to: To, state?: any]>) => void
) => {
  if (response.meta.requestStatus === "fulfilled") {
    window.localStorage.setItem("checkEmailData", response.payload.email);
    navigationDispatch(push("/auth/confirm-email", { fromServer: true }));
    return true;
  } else {
    response.payload.statusCode === 404 && response.payload.message === "Email не найден" 
      ? navigationDispatch(push("/result/error-check-email-no-exist", { fromServer: true }))
      : navigationDispatch(push("/result/error-check-email", { fromServer: true }))
  }
};

const ErrorCheckEmailNoExist = () => {
  const authDispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigationDispatch = useAppDispatch();

  useEffect(() => {
    const isDirectAccess = !location.state || !location.state.fromServer;

    if (isDirectAccess) {
      navigationDispatch(push('/auth'));
    }
    
  }, [navigationDispatch, location.state]);

  const handleRepeatCheckEmail = async () => {
    navigationDispatch(push('/auth'));

    const confirmEmailData = window.localStorage.getItem('checkEmailData') || ""

    const data = {
      email: confirmEmailData,
    };

    const responseData = await authDispatch(fetchCheckEmail(data));
    handleResponseCheckEmail(responseData, navigationDispatch);
  };
  
  return(
    <Result 
      result="404"
      title="Что-то пошло не так"
      description="Произошла ошибка, попробуйте отправить форму ещё раз."
      buttonTestId="check-back-button"
      buttonText="Назад"
      isConfirmEmailPage
      handleRedirect={handleRepeatCheckEmail}
    />
  )
};

export default ErrorCheckEmailNoExist;