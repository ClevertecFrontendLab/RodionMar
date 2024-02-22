import { Navigate, Routes, Route } from 'react-router-dom';

import ErrorChangePasswordPage from './error-change-password.page';
import ErrorCheckEmailNoExist from './error-check-email-no-exist.page';
import ErrorCheckEmail from './error-check-email.page';
import ErrorLogin from './error-login.page';
import SignUpErrorUserExist from './signUp-error-user-exist.page';
import SignUpError from './signUp-error.page';
import SignUpSuccess from './signUp-success.page';
import SuccessChangePasswordPage from './success-change-password.page';


const ResultRoutes = () => {
    return (
        <Routes>
            <Route path={'/error-login'} element={<ErrorLogin />} />
            <Route path={'/success'} element={<SignUpSuccess />} />
            <Route
                path={'/error-user-exist'}
                element={<SignUpErrorUserExist />}
            />
            <Route path={'/error'} element={<SignUpError />} />
            <Route
                path={'/error-check-email-no-exist'}
                element={<ErrorCheckEmailNoExist />}
            />
            <Route
                path={'/error-check-email'}
                element={<ErrorCheckEmail />}
            />
            <Route
                path={'/success-change-password'}
                element={<SuccessChangePasswordPage />}
            />
            <Route
                path={'/error-change-password'}
                element={<ErrorChangePasswordPage />}
            />
            <Route path='*' element={<Navigate to='/auth' />} />
        </Routes>
    );
};

export default ResultRoutes;
