import { Button, Space, Typography, Image } from "antd";
import 'antd/lib/button/style/index.css';
import 'antd/lib/space/style/index.css';
import 'antd/lib/typography/style/index.css';

import cn from "classnames";

import styles from './index.module.scss';

const { Title, Text } = Typography;

type TResultProps = {
  result: "warning" | "error" | "success" | "execute" | "error-image" | "404";
  title: string;
  description: React.ReactNode;
  buttonText: string;
  buttonTestId: string;
  isConfirmEmailPage?: boolean;
  handleRedirect: () => void;
}

const Result = ({
  result,
  title,
  description,
  buttonText,
  buttonTestId,
  isConfirmEmailPage = false,
  handleRedirect
}: TResultProps) => {
  let iconSrc = "";
  switch (result) {
    case "success":
      iconSrc = "../../../../Success.svg"
      break;
    case "error":
      iconSrc = "../../../../Error.svg";
      break;
    case "execute":
      iconSrc = "../../../../Execute.svg"
      break;
    case "warning":
      iconSrc = "../../../../Warning.svg";
      break;
    case "404":
      iconSrc = "../../../../404.svg";
      break;
  }
  return (
    <Space className={cn(styles.wrapper, isConfirmEmailPage ? styles.confirmEmailPage : null)} direction="vertical" size="large">
      <Image src={iconSrc} alt="result icon" preview={false} className={styles.resultIcon} />
      <Space.Compact className={styles.textWrapper}>
        <Title className={styles.title}>
          {title}
        </Title>
        <Text className={styles.description}>
          {description}
        </Text>
      </Space.Compact>
      <Button
        type="primary"
        size="large"
        htmlType="button"
        className={styles.button}
        onClick={handleRedirect}
        data-test-id={buttonTestId}
        block={!isConfirmEmailPage}
      >
        {buttonText}
      </Button>
    </Space>
  )
};

export default Result;