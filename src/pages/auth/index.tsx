import { useSelector } from 'react-redux';
import {AuthRoutes} from './auth.routes';
import { RootState, useAppSelector } from '@redux/configure-store';

import styles from './index.module.scss';
import { AuthPendingSelector } from './store/auth.selector';
import {LottieLoader} from '@components/LottieLoader';

export const AuthPage = () => {
    const fetchPending = useSelector(AuthPendingSelector);
    const isLoading = useAppSelector((state: RootState) => state.loading.isLoading);
    console.log()
    return (
        <div className={styles.wrapper}>
            <div className={styles.blur}>
                <div className={styles.contentWrapper}>
                    {((fetchPending !== undefined && fetchPending === true) || isLoading) &&
                        (<LottieLoader data-test-id='loader' />)}
                    <AuthRoutes />
                </div>
            </div>
        </div>
    );
};