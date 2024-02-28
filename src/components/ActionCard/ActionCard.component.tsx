import { Card, Button, Typography, Divider } from 'antd';

import { CalendarTwoTone, HeartFilled, IdcardOutlined } from '@ant-design/icons';

import styles from "./index.module.scss"

type ButtonIconType = "heart" | "calendar" | "profile";

type TActionCard = {
  title: string,
  buttonText: string,
  buttonIcon: ButtonIconType
}

const { Text } = Typography;


const ActionCard = ({ title, buttonText, buttonIcon }: TActionCard) => {
  const renderButtonIcon = () => {
    switch (buttonIcon) {
      case "heart":
        return <HeartFilled className={styles.iconStyles} />;
      case "calendar":
        return <CalendarTwoTone className={styles.iconStyles} />;
      case "profile":
        return <IdcardOutlined className={styles.iconStyles} />;
      default:
        return null;
    }
  }
  return (
    <Card className={styles.cardStyles} title={<Text className={styles.cardTitleStyles}>{title}</Text>}>
      <Divider className={styles.divider} />
      <Button className={styles.buttonStyles} icon={renderButtonIcon()} type="link">
        <Text className={styles.buttonTextStyles}>
          {buttonText}
        </Text>
      </Button>
    </Card>
  )
};

export default ActionCard;