import React, { Suspense } from 'react';

import LottieLoader from '@components/LottieLoader/LottieLoader';

import { Navigate, Routes, Route } from 'react-router-dom';

import AuthPage from '@pages/auth';
import ResultPage from '@pages/results';
import FeedbacksPage from '@pages/feedbacks';
const MainPage = React.lazy(() => import('./pages/main'));

const isAllowed = () => {
    const token = window.localStorage.getItem('token');
    if (token) {
        return true;
    }
    return false;
};

const PrivateRouteMainPage = ({ element: Element }: { element: any }) => {
    return isAllowed() ? (
        <Suspense fallback={<LottieLoader />}>
            <Element />
        </Suspense>
    ) : (
        <Navigate to={'/'} />
    );
};

const PrivateRoute = ({ element: Element }: { element: any }) => {
    return isAllowed() ? (
        <Element />
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

const AppRoutes = () => {
    return (
        <Routes>
            {/* PUBLIC */}
            <Route path={'/auth/*'} element={<PublicRoute element={AuthPage} />} />
            <Route path={'/result/*'} element={<PublicRoute element={ResultPage} />} />
            {/* <Route path={'/feedbacks'} element={<PublicRoute element={FeedbacksPage} />} /> */}

            {/* PRIVATE */}
            <Route path={'/main/*'} element={<PrivateRouteMainPage element={MainPage} />} />
            <Route path={'/feedbacks'} element={<PrivateRoute element={FeedbacksPage} />} />

            {/* DEFAULT */}
            <Route path='*' element={<Navigate to='/auth' />} />
        </Routes>
    );
};

export default AppRoutes;
