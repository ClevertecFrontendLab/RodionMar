import { fetchChangePassword } from "@pages/auth/store/auth.actions";
import { AppDispatch, history } from "@redux/configure-store";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import ChangePasswordComponent from "@components/ChangePassword";

import { TChangePassword } from "@shared/change-password.type";
import { useEffect } from "react";


export const handleResponse = (
  response: any,
) => {
  if (response.meta.requestStatus === "fulfilled") {
    localStorage.removeItem("changePasswordData");
    history.push("/result/success-change-password", { fromServer: true });
    return true;
  } else {
    history.push("/result/error-change-password", { fromServer: true });
  }
};

const ChangePasswordPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  useEffect(() => {
    const isDirectAccess = !location.state || !location.state.fromServer;

    if (isDirectAccess) {
      history.push("/auth");
    }
    
  }, [history, location.state]);

  const handleChangePassword = async (data: TChangePassword) => {
    const responseData = await dispatch(fetchChangePassword(data));
    handleResponse(responseData);
  }

  return (
    <ChangePasswordComponent handleChangePassword={handleChangePassword} />
  )
}

export default ChangePasswordPage;