import { useSelector } from 'react-redux';

import styles from './index.module.scss';
import {LottieLoader} from '@components/LottieLoader';
import {ResultRoutes} from './result.routes';
import { AuthPendingSelector } from '@pages/auth/store/auth.selector';

export const ResultPage = () => {
    const fetchPending = useSelector(AuthPendingSelector);
    return (
        <div className={styles.wrapper}>
            <div className={styles.blur}>
                <div className={styles.contentWrapper}>
                    {fetchPending !== undefined && fetchPending === true && (
                        <LottieLoader data-test-id='loader' />
                    )}
                    <ResultRoutes />
                </div>
            </div>
        </div>
    );
};