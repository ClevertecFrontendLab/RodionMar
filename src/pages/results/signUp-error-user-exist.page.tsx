import { useEffect } from 'react';

import styles from './index.module.scss';

import { useLocation } from 'react-router-dom';
import { history } from '@redux/configure-store';
import { Result, Button } from 'antd';

export const SignUpErrorUserExist = () => {
    const location = useLocation();

    useEffect(() => {
        const isDirectAccess = !location.state || !location.state.fromServer;

        if (isDirectAccess) {
            history.push('/auth');
        }
    }, [history, location.state]);

    return (
        <Result
            className={styles.result}
            status='error'
            title='Данные не сохранились'
            subTitle='Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.'
            extra={
                <Button
                    type='primary'
                    size='large'
                    htmlType='button'
                    className={styles.button}
                    onClick={() => history.push('/auth/registration')}
                    data-test-id='login-retry-button'
                    block
                >
                    Назад к регистрации
                </Button>
            }
        />
    );
};