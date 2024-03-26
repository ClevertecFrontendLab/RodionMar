import { useEffect } from 'react';

import { fetchCheckEmail } from '@pages/auth/store/auth.actions';
import { AppDispatch, history } from '@redux/configure-store';
import { useDispatch } from 'react-redux';

import { useLocation } from 'react-router-dom';
import { Result, Button } from 'antd';

import cn from 'classnames';

import styles from './index.module.scss';
import { AppRouteEnum } from '@constants/app-routes.enum';
import { TCheckEmailResponse } from '@shared/types/check-email-response.type';
import { DataTestEnum } from '@constants/data-tests.enum';

export const ErrorCheckEmail = () => {
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();

    useEffect(() => {
        const isDirectAccess = !location.state || !location.state.fromServer;

        if (isDirectAccess) {
            history.push(AppRouteEnum.AUTH);
        }
    }, [location.state]);

    const handleResponseCheckEmail = (response: TCheckEmailResponse) => {
        if (response.meta.requestStatus === 'fulfilled') {
            window.localStorage.setItem('checkEmailData', response.payload.email);
            history.push(AppRouteEnum.CONFIRM_EMAIL, { fromServer: true });
            return true;
        } else {
            response.payload.status === 404 && response.payload.message === 'Email не найден'
                ? history.push(AppRouteEnum.ERROR_CHECK_EMAIL_NO_EXIST, { fromServer: true })
                : history.push(AppRouteEnum.ERROR_CHECK_EMAIL, { fromServer: true });
        }
    };

    const handleRepeatCheckEmail = async () => {
        history.push(AppRouteEnum.AUTH);

        const confirmEmailData = window.localStorage.getItem('checkEmailData') || '';

        const data = {
            email: confirmEmailData,
        };

        const response = await dispatch(fetchCheckEmail(data));

        const responseData: TCheckEmailResponse = {
            meta: response.meta,
            payload: response.payload,
        };

        handleResponseCheckEmail(responseData);
    };

    return (
        <Result
            className={cn(styles.result, styles.emailResult)}
            status='500'
            title='Что-то пошло не так'
            subTitle='Произошла ошибка, попробуйте отправить форму ещё раз.'
            extra={
                <Button
                    type='primary'
                    size='large'
                    htmlType='button'
                    className={styles.button}
                    onClick={handleRepeatCheckEmail}
                    data-test-id={DataTestEnum.CHECK_BACK_BUTTON}
                >
                    Назад
                </Button>
            }
        />
    );
};
