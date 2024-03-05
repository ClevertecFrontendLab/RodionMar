import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import { history } from '@redux/configure-store';
import { Result, Button } from 'antd';

import styles from './index.module.scss';

export const SuccessChangePasswordPage = () => {
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
                    onClick={() => history.push('/auth')}
                    data-test-id='registration-enter-button'
                    block
                >
                    Вход
                </Button>
            }
        />
    );
};