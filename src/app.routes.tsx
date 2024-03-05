import React, { Suspense } from 'react';

import {LottieLoader} from '@components/LottieLoader';

import { Navigate, Routes, Route } from 'react-router-dom';

import { AppRouteEnum } from '@constants/app-routes.enum';

import {AuthPage} from '@pages/auth';
import {ResultPage} from '@pages/results';
import {FeedbacksPage} from '@pages/feedbacks';
const MainPage = React.lazy(() => import('./pages/main'));


const isAllowed = () => {
    const token = window.localStorage.getItem('token');
    if (token) {
        return true;
    }
    return false;
};

const PrivateRouteMainPage = ({ element: Element }: { element: React.FC }) => {
    return isAllowed() ? (
        <Suspense fallback={<LottieLoader />}>
            <Element />
        </Suspense>
    ) : (
        <Navigate to={AppRouteEnum.BASIC} />
    );
};

const PrivateRoute = ({ element: Element }: { element: React.FC }) => {
    return isAllowed() ? <Element /> : <Navigate to={AppRouteEnum.BASIC} />;
};

const PublicRoute = ({ element: Element }: { element: React.FC }) => {
    return isAllowed() ? <Navigate to={AppRouteEnum.BASIC_MAIN} /> : <Element />;
};

const AppRoutes = () => {
    return (
        <Routes>
            {/* PUBLIC */}
            <Route path={AppRouteEnum.AUTH} element={<PublicRoute element={AuthPage} />} />
            <Route path={AppRouteEnum.RESULT} element={<PublicRoute element={ResultPage} />} />

            {/* PRIVATE */}
            <Route path={AppRouteEnum.MAIN} element={<PrivateRouteMainPage element={MainPage} />} />
            <Route path={AppRouteEnum.FEEDBACKS} element={<PrivateRoute element={FeedbacksPage} />} />

            {/* DEFAULT */}
            <Route path='*' element={<Navigate to={AppRouteEnum.BASIC_AUTH} />} />
        </Routes>
    );
};

export default AppRoutes;
