import { Button, Row, Typography, Col } from 'antd';

import styles from './index.module.scss';
import { DataTestEnum } from '@constants/data-tests.enum';

const { Title, Paragraph } = Typography;

type NoFeedbacksProps = {
    setIsFeedbackModalOpen: (value: boolean) => void;
};

export const NoFeedbacks = ({ setIsFeedbackModalOpen }: NoFeedbacksProps) => (
    <Row className={styles.noFeedback} justify='center'>
        <Col className={styles.textSection} span={24}>
            <Title level={3} className={styles.title}>
                Оставьте свой отзыв первым
            </Title>
            <Paragraph className={styles.text}>
                Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении. Поделитесь
                своим мнением и опытом с другими пользователями, и помогите им сделать правильный
                выбор.
            </Paragraph>
        </Col>
        <Col span={24} className={styles.buttonCol}>
            <Button
                type='primary'
                size='large'
                className={styles.button}
                onClick={() => setIsFeedbackModalOpen(true)}
                data-test-id={DataTestEnum.WRITE_REVIEW}
                block
            >
                Написать отзыв
            </Button>
        </Col>
    </Row>
);
