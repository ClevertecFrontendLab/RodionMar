import React, { Suspense } from 'react';

import LottieLoader from '@components/LottieLoader/LottieLoader';

import { Navigate, Routes, Route } from 'react-router-dom';
import AuthPage from '@pages/auth';
import ResultPage from '@pages/results';

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
        <Element />
    );
};

const MainPage = React.lazy(() => import('./pages/main'));

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
