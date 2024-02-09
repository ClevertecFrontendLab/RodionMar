// ==================== Ant Design ====================
import { Card, Button, Typography, Divider } from 'antd';

// ==================== Ant Design Icons ====================
import { CalendarOutlined, HeartFilled, IdcardOutlined } from '@ant-design/icons';

// ==================== Styles ====================
import styles from "./index.module.scss"

// ==================== Types ====================
type ButtonIconType = "heart" | "calendar" | "profile";

// ==================== Interfaces ====================
interface IActionCard {
  title: string,
  buttonText: string,
  buttonIcon: ButtonIconType | string
}

const { Text } = Typography;


const ActionCard: React.FC<IActionCard> = ({ title, buttonText, buttonIcon }) => {
  const renderButtonIcon = () => {
    switch (buttonIcon) {
      case "heart":
        return <HeartFilled className={styles.iconStyles} />;
      case "calendar":
        return <CalendarOutlined className={styles.iconStyles} />;
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