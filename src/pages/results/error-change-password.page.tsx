import { useEffect } from 'react';
import { history, useAppDispatch } from '@redux/configure-store';
import { fetchChangePassword } from '@pages/auth/store/auth.actions';

import styles from './index.module.scss';

import { useLocation } from 'react-router-dom';
import { Button, Result } from 'antd';
import { AppRouteEnum } from '@constants/app-routes.enum';
import { DataTestEnum } from '@constants/data-tests.enum';

export const ErrorChangePasswordPage = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    useEffect(() => {
        const isDirectAccess = !location.state || !location.state.fromServer;

        if (isDirectAccess) {
            history.push(AppRouteEnum.AUTH);
        }
    }, [location.state]);

    const handleResponse = async (response: { meta: { requestStatus: string } }) => {
        if (response.meta.requestStatus === 'fulfilled') {
            history.push(AppRouteEnum.SUCCESS_CHANGE_PASSWORD, { fromServer: true });
            localStorage.removeItem('changePasswordData');
            return true;
        } else {
            history.push(AppRouteEnum.ERROR_CHANGE_PASSWORD, { fromServer: true });
        }
    };

    const handleRepeatChangePassword = async () => {
        if (location.pathname === AppRouteEnum.ERROR_CHANGE_PASSWORD) {
            history.push(AppRouteEnum.CHANGE_PASSWORD);
        }

        const storedPassword = JSON.parse(localStorage.getItem('changePasswordData') || '{}');

        const data = {
            password: storedPassword.password,
            confirmPassword: storedPassword.password,
        };

        const responseData = await dispatch(fetchChangePassword(data));
        handleResponse(responseData);
    };

    return (
        <Result
            className={styles.result}
            status='error'
            title='Данные не сохранились'
            subTitle='Что-то пошло не так. Попробуйте ещё раз'
            extra={
                <Button
                    type='primary'
                    size='large'
                    htmlType='button'
                    className={styles.button}
                    onClick={handleRepeatChangePassword}
                    data-test-id={DataTestEnum.CHANGE_RETRY_BUTTON}
                    block
                >
                    Повторить
                </Button>
            }
        />
    );
};
