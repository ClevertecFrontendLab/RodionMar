import { fetchChangePassword } from "@pages/auth/store/auth.actions";
import { AppDispatch } from "@redux/configure-store";
import { useDispatch } from "react-redux";
import { To, useLocation } from "react-router-dom";

import ChangePasswordComponent from "@components/ChangePassword";

import { IChangePassword } from "../../types/change-password.interface";
import { useAppDispatch } from "@hooks/index";
import { useEffect } from "react";
import { push } from "redux-first-history";
import { CallHistoryMethodAction } from "redux-first-history/build/es6/actions";


export const handleResponse = (
  response: any,
  navigationDispatch: (path: CallHistoryMethodAction<[to: To, state?: any]>) => void
) => {
  if (response.meta.requestStatus === "fulfilled") {
    localStorage.removeItem("changePasswordData");
    navigationDispatch(push("/result/success-change-password", { fromServer: true }));
    return true;
  } else {
    navigationDispatch(push("/result/error-change-password", { fromServer: true }));
  }
};

const ChangePasswordPage = () => {
  const authDispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigationDispatch = useAppDispatch();

  useEffect(() => {
    const isDirectAccess = !location.state || !location.state.fromServer;

    if (isDirectAccess) {
      navigationDispatch(push('/auth'));
    }
    
  }, [navigationDispatch, location.state]);

  const handleChangePassword = async (data: IChangePassword) => {
    const responseData = await authDispatch(fetchChangePassword(data));
    handleResponse(responseData, navigationDispatch);
  }

  return (
    <ChangePasswordComponent handleChangePassword={handleChangePassword} />
  )
}

export default ChangePasswordPage;