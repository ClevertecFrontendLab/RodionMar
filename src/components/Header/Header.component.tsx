// ==================== Ant Design ====================
import { Layout, Typography, Col, Row, Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

// ==================== Styles ====================
import styles from "./index.module.scss";


const { Header } = Layout;
const { Title, Text } = Typography;

const HeaderComponent = () => {
  return (
    <Header className={styles.headerStyles}>
      <Row>
        <Col>
          <Text className={styles.pageIndentifierStyles}>
            Главная
          </Text>
        </Col>
      </Row>
      <Row className={styles.mainInfoStyles}>
        <Col>
          <Title className={styles.titleStyles}>
            Приветствуем тебя в CleverFit — приложении, которое поможет тебе добиться своей мечты!
          </Title>
        </Col>
        <Col>
          <Button className={styles.settingButtonStyles} type="text" icon={<SettingOutlined className={styles.settingIconStyles} />}>
            <Text className={styles.settingTextStyles}>
              Настройки
            </Text>
          </Button>
        </Col>
      </Row>
    </Header>
  )
};

export default HeaderComponent;