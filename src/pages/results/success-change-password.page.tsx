import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import { history } from '@redux/configure-store';
import { Result, Button } from 'antd';

import styles from './index.module.scss';
import { AppRouteEnum } from '@constants/app-routes.enum';
import { DataTestEnum } from '@constants/data-tests.enum';

export const SuccessChangePasswordPage = () => {
    const location = useLocation();

    useEffect(() => {
        const isDirectAccess = !location.state || !location.state.fromServer;

        if (isDirectAccess) {
            history.push(AppRouteEnum.AUTH);
        }
    }, [location.state]);

    return (
        <Result
            className={styles.result}
            status='success'
            title='Пароль успешно изменен'
            subTitle={
                <>
                    Теперь можно войти в аккаунт, используя
                    <br />
                    свой логин и новый пароль
                </>
            }
            extra={
                <Button
                    type='primary'
                    size='large'
                    htmlType='button'
                    className={styles.button}
                    onClick={() => history.push(AppRouteEnum.AUTH)}
                    data-test-id={DataTestEnum.REGISTRATION_ENTER_BUTTON}
                    block
                >
                    Вход
                </Button>
            }
        />
    );
};
