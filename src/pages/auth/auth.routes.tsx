import React, { PropsWithChildren, Suspense } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

import LottieLoader from '@components/LottieLoader/LottieLoader';

const Suspended = ({ element: Element }: PropsWithChildren & { element: any }) => {
    return (
        <Suspense fallback={<LottieLoader />}>
            <Element />
        </Suspense>
    );
};

// ========================== pages ===========================
const SignInPage = React.lazy(() => import('./signIn.page'));

const SignUpPage = React.lazy(() => import('./signUp.page'));

const ErrorLogin = React.lazy(() => import('../results/error-login.page'));

const SignUpSuccess = React.lazy(() => import('../results/signUp-success.page'));

const SignUpErrorUserExist = React.lazy(
    () => import('../results/signUp-error-user-exist.page'),
);

const SignUpError = React.lazy(() => import('../results/signUp-error.page'));

const ConfirmEmailPage = React.lazy(() => import('../confirmEmail'));

const ErrorCheckEmailNoExist = React.lazy(
    () => import('../results/error-check-email-no-exist.page'),
);

const ErrorCheckEmail = React.lazy(() => import('../results/error-check-email.page'));

const ChangePasswordPage = React.lazy(() => import('../changePassword'));

const SuccessChangePasswordPage = React.lazy(
    () => import('../results/success-change-password.page'),
);

const ErrorChangePasswordPage = React.lazy(
    () => import('../results/error-change-password.page'),
);

const AuthRoutes = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Suspended element={SignInPage} />} />
            <Route path={'/registration'} element={<Suspended element={SignUpPage} />} />
            <Route path={'/result/error-login'} element={<Suspended element={ErrorLogin} />} />
            <Route path={'/result/success'} element={<Suspended element={SignUpSuccess} />} />
            <Route
                path={'/result/error-user-exist'}
                element={<Suspended element={SignUpErrorUserExist} />}
            />
            <Route path={'/result/error'} element={<Suspended element={SignUpError} />} />
            <Route path={'/confirm-email'} element={<Suspended element={ConfirmEmailPage} />} />
            <Route
                path={'/result/error-check-email-no-exist'}
                element={<Suspended element={ErrorCheckEmailNoExist} />}
            />
            <Route
                path={'/result/error-check-email-no-exist'}
                element={<Suspended element={ErrorCheckEmail} />}
            />
            <Route path={'/change-password'} element={<Suspended element={ChangePasswordPage} />} />
            <Route
                path={'/result/success-change-password'}
                element={<Suspended element={SuccessChangePasswordPage} />}
            />
            <Route
                path={'/result/error-change-password'}
                element={<Suspended element={ErrorChangePasswordPage} />}
            />
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    );
};

export default AuthRoutes;
