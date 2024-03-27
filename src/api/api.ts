import { APIRouteEnum } from '@constants/api-routes.enum';
import { AppRouteEnum } from '@constants/app-routes.enum';
import axios from 'axios';

// ===== main instance =====
export const $api = axios.create({
    baseURL: APIRouteEnum.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ===== set token =====
$api.interceptors.request.use(
    async (config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// ===== unathorized interceptor =====
$api.interceptors.response.use(
    async (response) => response,
    (error) => {
        if (error.response.status === 403 && window.location.pathname !== AppRouteEnum.PROFILE) {
            window.location.replace(AppRouteEnum.BASIC_AUTH);
        }
        return Promise.reject(error);
    },
);
