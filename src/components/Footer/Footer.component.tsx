// ==================== Ant Design ====================
import { Layout, Typography, Col, Row, Button, Divider, Card } from 'antd';

// ==================== Ant Design Icons ====================
import { AndroidFilled, AppleFilled } from '@ant-design/icons';

// ==================== Styles ====================
import styles from "./index.module.scss";


const { Footer } = Layout;
const { Text } = Typography;

const FooterComponent = () => {
  return (
    <Footer className={styles.footerStyles}>
      <Row className={styles.wrapperStyles}>
        <Col>
          <Card className={styles.cardStyles} title={<Text className={styles.cardTitleStyles}>Скачать на телефон</Text>}>
            <Text className={styles.subtitleStyles}>
              Доступно в PRO-тарифе
            </Text>
            <Divider className={styles.divider} />
            <Row className={styles.buttonContainerStyles}>
              <Col>
                <Button type="text" className={styles.cardButtonStyles} icon={<AndroidFilled />}>
                  Android OS
                </Button>
              </Col>
              <Col>
                <Button type="text" className={styles.cardButtonStyles} icon={<AppleFilled />}>
                  Apple iOS
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col>
          <Button type="link" className={styles.commentButtonStyles}>
            Смотреть отзывы
          </Button>
        </Col>
      </Row>

    </Footer >
  )
};

export default FooterComponent;