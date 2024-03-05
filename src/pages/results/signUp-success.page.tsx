import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { history } from '@redux/configure-store';
import { Result, Button } from 'antd';

import styles from './index.module.scss';
import { AppRouteEnum } from '@constants/app-routes.enum';

export const SignUpSuccess = () => {
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
            title='Регистрация успешна'
            subTitle='Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.'
            extra={
                <Button
                    type='primary'
                    size='large'
                    htmlType='button'
                    className={styles.button}
                    onClick={() => history.push(AppRouteEnum.AUTH)}
                    data-test-id='registration-enter-button'
                    block
                >
                    Войти
                </Button>
            }
        />
    );
};
