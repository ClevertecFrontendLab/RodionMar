import { Navigate, Routes, Route } from 'react-router-dom';

import { ChangePasswordPage } from './changePassword.page';
import { ConfirmEmailPage } from './confirmEmail.page';
import { SignInPage } from './signIn.page';
import { SignUpPage } from './signUp.page';

import { RouteEnum } from './types/routes.enum';

export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path={RouteEnum.AUTH} element={<SignInPage />} />
            <Route path={RouteEnum.REGISTARTION} element={<SignUpPage />} />
            <Route path={RouteEnum.CONFIRM_EMAIL} element={<ConfirmEmailPage />} />
            <Route path={RouteEnum.CHANGE_PASSWORD} element={<ChangePasswordPage />} />
            <Route path='*' element={<Navigate to={RouteEnum.AUTH} />} />
        </Routes>
    );
};
