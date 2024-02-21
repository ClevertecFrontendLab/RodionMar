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

const ErrorLogin = React.lazy(() => import('./error-login.page'));

const SignUpSuccess = React.lazy(() => import('./signUp-success.page'));

const SignUpErrorUserExist = React.lazy(() => import('./signUp-error-user-exist.page'));

const SignUpError = React.lazy(() => import('./signUp-error.page'));

const ErrorCheckEmailNoExist = React.lazy(() => import('./error-check-email-no-exist.page'));

const ErrorCheckEmail = React.lazy(() => import('./error-check-email.page'));

const SuccessChangePasswordPage = React.lazy(() => import('./success-change-password.page'));

const ErrorChangePasswordPage = React.lazy(() => import('./error-change-password.page'));

const ResultRoutes = () => {
    return (
        <Routes>
            <Route path={'/error-login'} element={<Suspended element={ErrorLogin} />} />
            <Route path={'/success'} element={<Suspended element={SignUpSuccess} />} />
            <Route
                path={'/error-user-exist'}
                element={<Suspended element={SignUpErrorUserExist} />}
            />
            <Route path={'/error'} element={<Suspended element={SignUpError} />} />
            <Route
                path={'/error-check-email-no-exist'}
                element={<Suspended element={ErrorCheckEmailNoExist} />}
            />
            <Route
                path={'/error-check-email'}
                element={<Suspended element={ErrorCheckEmail} />}
            />
            <Route
                path={'/success-change-password'}
                element={<Suspended element={SuccessChangePasswordPage} />}
            />
            <Route
                path={'/error-change-password'}
                element={<Suspended element={ErrorChangePasswordPage} />}
            />
            <Route path='*' element={<Navigate to='/auth' />} />
        </Routes>
    );
};

export default ResultRoutes;
