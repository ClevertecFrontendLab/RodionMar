import { configureStore } from '@reduxjs/toolkit';

import { createReduxHistoryContext } from 'redux-first-history';

import { createBrowserHistory } from 'history';

import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';

import auth from '@pages/auth/store/auth.slice';
import feedback from '@pages/feedbacks/store/feedback.slice';
import loading from '@components/LottieLoader/loading.slice';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
    savePreviousLocations: 5,
});

export const store = configureStore({
    reducer: {
        router: routerReducer,
        auth,
        feedback,
        loading,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware),
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
