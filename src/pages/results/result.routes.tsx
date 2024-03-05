import { Navigate, Routes, Route } from 'react-router-dom';

import {ErrorChangePasswordPage} from './error-change-password.page';
import {ErrorCheckEmailNoExist} from './error-check-email-no-exist.page';
import {ErrorCheckEmail} from './error-check-email.page';
import {ErrorLogin} from './error-login.page';
import {SignUpErrorUserExist} from './signUp-error-user-exist.page';
import {SignUpError} from './signUp-error.page';
import {SignUpSuccess} from './signUp-success.page';
import {SuccessChangePasswordPage} from './success-change-password.page';

import { RouteEnum } from './types/routes.enum';

export const ResultRoutes = () => {
    return (
        <Routes>
            <Route path={RouteEnum.ERROR_LOGIN} element={<ErrorLogin />} />
            <Route path={RouteEnum.SUCCESS} element={<SignUpSuccess />} />
            <Route path={RouteEnum.ERROR_USER_EXIST} element={<SignUpErrorUserExist />} />
            <Route path={RouteEnum.ERROR} element={<SignUpError />} />
            <Route path={RouteEnum.ERROR_CHECK_EMAIL_NO_EXIST} element={<ErrorCheckEmailNoExist />} />
            <Route path={RouteEnum.ERROR_CHECK_EMAIL} element={<ErrorCheckEmail />} />
            <Route path={RouteEnum.SUCCESS_CHANGE_PASSWORD} element={<SuccessChangePasswordPage />} />
            <Route path={RouteEnum.ERROR_CHANGE_PASSWORD} element={<ErrorChangePasswordPage />} />
            <Route path='*' element={<Navigate to={RouteEnum.AUTH} />} />
        </Routes>
    );
};