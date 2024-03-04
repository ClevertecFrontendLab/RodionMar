import { Layout, Typography, Col, Row, Button, Card } from 'antd';

import { AndroidFilled, AppleFilled } from '@ant-design/icons';

import styles from "./index.module.scss";


const { Footer } = Layout;
const { Text } = Typography;

const FooterComponent = ({
  handleResponseFeedbacks,
}: {
  handleResponseFeedbacks: () => void;
}) => (
  <Footer className={styles.footerStyles}>
    <Row className={styles.wrapperStyles}>
      <Col className={styles.buttonCol}>
        <Button type="link" className={styles.commentButtonStyles} onClick={handleResponseFeedbacks} data-test-id='see-reviews' block>
          Смотреть отзывы
        </Button>
      </Col>
      <Col className={styles.cardCol}>
        <Card className={styles.cardStyles} title={
          <>
            <Text className={styles.cardTitleStyles}>Скачать на телефон</Text>
            <Text className={styles.subtitleStyles}>
              Доступно в PRO-тарифе
            </Text>
          </>
        }>

          <Row className={styles.buttonContainerStyles}>
            <Col span={12}>
              <Button type="text" className={styles.cardButtonStyles} icon={<AndroidFilled />} block>
                Android OS
              </Button>
            </Col>
            <Col span={12}>
              <Button type="text" className={styles.cardButtonStyles} icon={<AppleFilled />} block>
                Apple iOS
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  </Footer >
)


export default FooterComponent;