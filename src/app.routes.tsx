import React, { Suspense } from 'react';

import LottieLoader from '@components/LottieLoader/LottieLoader';

import { Navigate, Routes, Route } from 'react-router-dom';

const isAllowed = () => {
    const token = window.localStorage.getItem('token');
    if (token) {
        return true;
    }
    return false;
};

const PrivateRoute = ({ element: Element }: { element: any }) => {
    return isAllowed() ? (
        <Suspense fallback={<LottieLoader />}>
            <Element />
        </Suspense>
    ) : (
        <Navigate to={'/'} />
    );
};

const PublicRoute = ({ element: Element }: { element: any }) => {
    return isAllowed() ? (
        <Navigate to={'/main'} />
    ) : (
        <Suspense fallback={<LottieLoader />}>
            <Element />
        </Suspense>
    );
};

const MainPage = React.lazy(() => import('./pages/main'));
const AuthPage = React.lazy(() => import('./pages/auth'));
const ResultPage = React.lazy(() => import('./pages/results'));

const AppRoutes = () => {
    return (
        <Routes>
            {/* PUBLIC */}
            <Route path={'/auth/*'} element={<PublicRoute element={AuthPage} />} />
            <Route path={'/result/*'} element={<PublicRoute element={ResultPage} />} />

            {/* PRIVATE */}
            <Route path={'/main/*'} element={<PrivateRoute element={MainPage} />} />

            {/* DEFAULT */}
            <Route path='*' element={<Navigate to='/auth' />} />
        </Routes>
    );
};

export default AppRoutes;
