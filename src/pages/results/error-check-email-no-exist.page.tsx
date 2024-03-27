import { useEffect } from 'react';

import { history } from '@redux/configure-store';

import { useLocation } from 'react-router-dom';
import { Result, Button } from 'antd';

import cn from 'classnames';

import styles from './index.module.scss';
import { AppRouteEnum } from '@constants/app-routes.enum';
import { DataTestEnum } from '@constants/data-tests.enum';

export const ErrorCheckEmailNoExist = () => {
    const location = useLocation();

    useEffect(() => {
        const isDirectAccess = !location.state || !location.state.fromServer;

        if (isDirectAccess) {
            history.push(AppRouteEnum.AUTH);
        }
    }, [location.state]);

    return (
        <Result
            className={cn(styles.result, styles.emailResult)}
            status='error'
            title='Такой e-mail не зарегистрирован'
            subTitle={<>Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail</>}
            extra={
                <Button
                    type='primary'
                    size='large'
                    htmlType='button'
                    className={styles.button}
                    onClick={() => history.push(AppRouteEnum.AUTH)}
                    data-test-id={DataTestEnum.CHECK_RETRY_BUTTON}
                >
                    Попробовать снова
                </Button>
            }
        />
    );
};
