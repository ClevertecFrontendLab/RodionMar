import { history, useAppDispatch } from '@redux/configure-store';
import { fetchSignUp } from '@pages/auth/store/auth.actions';

import styles from './index.module.scss';

import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Result, Button } from 'antd';
import { SignUpResponse } from '@shared/types/sign-up-response.type copy';
import { AppRouteEnum } from '@constants/app-routes.enum';
import { DataTestEnum } from '@constants/data-tests.enum';

export const SignUpError = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();

    useEffect(() => {
        const isDirectAccess = !location.state || !location.state.fromServer;

        if (isDirectAccess) {
            history.push(AppRouteEnum.AUTH);
        }
    }, [location.state]);

    const handleResponse = async (response: SignUpResponse) => {
        if (response.meta.requestStatus === 'fulfilled') {
            history.push(AppRouteEnum.SUCCESS, { fromServer: true });
            return true;
        } else {
            switch (response.payload) {
                case 409:
                    history.push(AppRouteEnum.ERROR_USER_EXIST, { fromServer: true });
                    break;
                default:
                    history.push(AppRouteEnum.ERROR, { fromServer: true });
            }
        }
    };

    const handleRepeatRegistration = async () => {
        if (location.pathname === AppRouteEnum.ERROR) {
            history.push(AppRouteEnum.REGISTRATION);
        }

        const storedProfile = JSON.parse(sessionStorage.getItem('signUpData') || '{}');

        const data = {
            email: storedProfile.email,
            password: storedProfile.password,
        };

        const response = await dispatch(fetchSignUp(data));

        const responseData: SignUpResponse = {
            meta: response.meta,
            payload: response.payload,
        };

        handleResponse(responseData);
    };

    return (
        <Result
            className={styles.result}
            status='error'
            title='Данные не сохранились'
            subTitle={
                <>
                    Что-то пошло не так и ваша регистрация
                    <br />
                    не завершилась. Попробуйте ещё раз.
                </>
            }
            extra={
                <Button
                    type='primary'
                    size='large'
                    htmlType='button'
                    className={styles.button}
                    onClick={handleRepeatRegistration}
                    data-test-id={DataTestEnum.REGISTRATION_RETRY_BUTTON}
                    block
                >
                    Повторить
                </Button>
            }
        />
    );
};
