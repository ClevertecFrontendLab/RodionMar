import loaderAnimation from './loader.json';
import Lottie from 'react-lottie';

import styles from './index.module.scss';
import { DataTestEnum } from '@constants/data-tests.enum';

export const LottieLoader = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loaderAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <div className={styles.wrapper} data-test-id={DataTestEnum.LOADER}>
            <Lottie options={defaultOptions} height={150} width={150} />
        </div>
    );
};
