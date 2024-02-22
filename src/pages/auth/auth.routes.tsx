import { PropsWithChildren, Suspense } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

import LottieLoader from '@components/LottieLoader/LottieLoader';

import ChangePasswordPage from '@pages/changePassword/changePassword.page';
import ConfirmEmailPage from '@pages/confirmEmail';
import ErrorChangePasswordPage from '@pages/results/error-change-password.page';
import ErrorCheckEmailNoExist from '@pages/results/error-check-email-no-exist.page';
import ErrorCheckEmail from '@pages/results/error-check-email.page';
import ErrorLogin from '@pages/results/error-login.page';
import SignUpErrorUserExist from '@pages/results/signUp-error-user-exist.page';
import SignUpError from '@pages/results/signUp-error.page';
import SignUpSuccess from '@pages/results/signUp-success.page';
import SuccessChangePasswordPage from '@pages/results/success-change-password.page';
import SignInPage from './signIn.page';
import SignUpPage from './signUp.page';

const Suspended = ({ element: Element }: PropsWithChildren & { element: any }) => {
    return (
        <Suspense fallback={<LottieLoader />}>
            <Element />
        </Suspense>
    );
};

const AuthRoutes = () => {
    return (
        <Routes>
            <Route path={'/'} element={<SignInPage />} />
            <Route path={'/registration'} element={<SignUpPage />} />
            <Route path={'/result/error-login'} element={<ErrorLogin />} />
            <Route path={'/result/success'} element={<SignUpSuccess />} />
            <Route
                path={'/result/error-user-exist'}
                element={<Suspended element={SignUpErrorUserExist} />}
            />
            <Route path={'/result/error'} element={<SignUpError />} />
            <Route path={'/confirm-email'} element={<ConfirmEmailPage />} />
            <Route
                path={'/result/error-check-email-no-exist'}
                element={<ErrorCheckEmailNoExist />}
            />
            <Route
                path={'/result/error-check-email-no-exist'}
                element={<ErrorCheckEmail />}
            />
            <Route path={'/change-password'} element={<ChangePasswordPage />} />
            <Route
                path={'/result/success-change-password'}
                element={<SuccessChangePasswordPage />}
            />
            <Route
                path={'/result/error-change-password'}
                element={<ErrorChangePasswordPage />}
            />
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    );
};

export default AuthRoutes;
