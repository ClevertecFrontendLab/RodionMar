import React, { Suspense } from 'react';

import { LottieLoader } from '@components/LottieLoader';

import { Navigate, Routes, Route } from 'react-router-dom';

import { AppRouteEnum } from '@constants/app-routes.enum';

import { AuthPage } from '@pages/auth';
import { ResultPage } from '@pages/results';
import { FeedbacksPage } from '@pages/feedbacks';
import { CalendarPage } from '@pages/calendar';
import { ProfilePage } from '@pages/profile';
import { NotFoundPage } from '@pages/not-found';
import { SettingsPage } from '@pages/settings';
const MainPage = React.lazy(() => import('./pages/main'));

const isAllowed = () => {
    const token = localStorage.getItem('token');
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

const DefaultRoute = () => {
    return isAllowed() ? <Navigate to={AppRouteEnum.NOT_FOUND} /> : <Navigate to={AppRouteEnum.BASIC_AUTH} />
};

const AppRoutes = () => (
    <Routes>
        {/* PUBLIC */}
        <Route path={AppRouteEnum.AUTH} element={<PublicRoute element={AuthPage} />} />
        <Route path={AppRouteEnum.RESULT} element={<PublicRoute element={ResultPage} />} />

        {/* PRIVATE */}
        <Route path={AppRouteEnum.MAIN} element={<PrivateRouteMainPage element={MainPage} />} />
        <Route
            path={AppRouteEnum.FEEDBACKS}
            element={<PrivateRoute element={FeedbacksPage} />}
        />
        <Route path={AppRouteEnum.CALENDAR} element={<PrivateRoute element={CalendarPage} />} />
        <Route path={AppRouteEnum.PROFILE} element={<PrivateRoute element={ProfilePage} />} />
        <Route path={AppRouteEnum.SETTINGS} element={<PrivateRoute element={SettingsPage} />} />
        <Route
            path={AppRouteEnum.NOT_FOUND}
            element={<PrivateRoute element={NotFoundPage} />}
        />

        {/* DEFAULT */}
        <Route path='*' element={<DefaultRoute />} />
    </Routes>
);


export default AppRoutes;
