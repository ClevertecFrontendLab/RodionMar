import { Navigate, Routes, Route } from 'react-router-dom';

import ChangePasswordPage from './changePassword.page';
import ConfirmEmailPage from './confirmEmail.page';
import SignInPage from './signIn.page';
import SignUpPage from './signUp.page';

const AuthRoutes = () => {
    return (
        <Routes>
            <Route path={'/'} element={<SignInPage />} />
            <Route path={'/registration'} element={<SignUpPage />} />
            <Route path={'/confirm-email'} element={<ConfirmEmailPage />} />
            <Route path={'/change-password'} element={<ChangePasswordPage />} />
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    );
};

export default AuthRoutes;
