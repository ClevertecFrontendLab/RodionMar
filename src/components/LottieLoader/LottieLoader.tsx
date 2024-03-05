import loaderAnimation from './loader.json';
import Lottie from 'react-lottie';

import styles from './index.module.scss';

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
        <div className={styles.wrapper} data-test-id='loader'>
            <Lottie options={defaultOptions} height={150} width={150} />
        </div>
    );
};
