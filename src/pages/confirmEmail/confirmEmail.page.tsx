import { To, useLocation } from "react-router-dom";

import { fetchConfirmEmail } from "@pages/auth/store/auth.actions";
import { AppDispatch, useAppDispatch } from "@redux/configure-store";
import { useDispatch } from "react-redux";

import ConfirmEmailComponent from "@components/ConfirmEmail/ConfirmEmail.component";

import { IConfirmEmail } from "../../types/confirm-email.interface";
import { push } from "redux-first-history";
import { CallHistoryMethodAction } from "redux-first-history/build/es6/actions";
import { useEffect } from "react";


export const handleResponseConfirmEmail = (
  response: any,
  navigationDispatch: (path: CallHistoryMethodAction<[to: To, state?: any]>) => void
) => {
  if (response.meta.requestStatus === "fulfilled") {
    if (window.localStorage.getItem("status")) {
      window.localStorage.removeItem("status");
    }

    window.localStorage.setItem("checkEmailData", response.payload.email);
    window.localStorage.setItem("status", "execute");

    navigationDispatch(push("/auth/change-password", { fromServer: true }));
    return true;
  } else {
    if (window.localStorage.getItem("status")) {
      window.localStorage.removeItem("status");
    }
    window.localStorage.setItem("status", "error");

    navigationDispatch(push("/auth/confirm-email", { fromServer: true }));
  }
};

const ConfirmEmailPage = () => {
  const authDispatch = useDispatch<AppDispatch>();

  const navigationDispatch = useAppDispatch();

  const location = useLocation();

  useEffect(() => {
    const isDirectAccess = !location.state || !location.state.fromServer;

    if (isDirectAccess) {
      navigationDispatch(push('/auth'));
    }

  }, [navigationDispatch, location.state]);


  const handleConfirmEmail = async (data: IConfirmEmail) => {
    const responseData = await authDispatch(fetchConfirmEmail(data));
    handleResponseConfirmEmail(responseData, navigationDispatch);
  };

  return (
    <ConfirmEmailComponent
      handleConfirmEmail={handleConfirmEmail}
      status={window.localStorage.getItem("status") as "error" || "execute"}
    />
  )
};

export default ConfirmEmailPage;