import { useSelector } from "react-redux";
import AuthRoutes from "./auth.routes"

import styles from "./index.module.scss";
import { AuthPendingSelector } from "./store/auth.selector";
import LottieLoader from "@components/LottieLoader/LottieLoader";

const AuthPage = () => {
  const fetchPending = useSelector(AuthPendingSelector);
  return (
    <div className={styles.wrapper}>
      <div className={styles.blur}>
        <div className={styles.contentWrapper}>
          {fetchPending !== undefined && fetchPending === true && (
            <LottieLoader data-test-id='loader' />
          )}
          <AuthRoutes />
        </div>
      </div>
    </div>
  )
};

export default AuthPage;