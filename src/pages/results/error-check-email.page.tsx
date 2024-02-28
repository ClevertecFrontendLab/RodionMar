import { useEffect } from "react";

import Result from "@components/Result";
import { fetchCheckEmail } from "@pages/auth/store/auth.actions";
import { AppDispatch, history } from "@redux/configure-store";
import { useDispatch } from "react-redux";

import { useLocation } from "react-router-dom"


export const handleResponseCheckEmail = (
  response: any,
) => {
  if (response.meta.requestStatus === "fulfilled") {
    window.localStorage.setItem("checkEmailData", response.payload.email);
    history.push("/auth/confirm-email", { fromServer: true });
    return true;
  } else {
    response.payload.statusCode === 404 && response.payload.message === "Email не найден"
      ? history.push("/result/error-check-email-no-exist", { fromServer: true })
      : history.push("/result/error-check-email", { fromServer: true });
  }
};

const ErrorCheckEmail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  useEffect(() => {
    const isDirectAccess = !location.state || !location.state.fromServer;

    if (isDirectAccess) {
      history.push('/auth');
    }

  }, [history, location.state]);

  const handleRepeatCheckEmail = async () => {
    history.push('/auth');

    const confirmEmailData = window.localStorage.getItem('checkEmailData') || "";

    const data = {
      email: confirmEmailData,
    };

    const responseData = await dispatch(fetchCheckEmail(data));
    handleResponseCheckEmail(responseData);
  };

  return (
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

export default ErrorCheckEmail;