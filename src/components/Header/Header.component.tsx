import { Layout, Typography, Col, Row, Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

import styles from "./index.module.scss";


type THeaderProps = {
  isSiderOpened: boolean
  windowWidth: number;
}


const { Header } = Layout;
const { Title, Text } = Typography;

const HeaderComponent = ({ isSiderOpened, windowWidth }: THeaderProps) => (
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
          Приветствуем тебя в CleverFit — <span className={isSiderOpened && windowWidth < 835 && windowWidth > 704 ? styles.isSidebarOpenedStyles : ""}>приложении, </span> которое поможет тебе добиться своей мечты!
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

export default HeaderComponent;