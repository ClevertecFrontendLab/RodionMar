import axios from 'axios';

// ===== main instance =====
export const $api = axios.create({
    baseURL: 'https://marathon-api.clevertec.ru',
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
        if (error.response.status === 403) {
            window.location.replace('/auth');
        }
        return Promise.reject(error);
    },
);