import { Card, Typography, Row, Col, Image } from 'antd';

import { StarFilled, StarOutlined } from '@ant-design/icons';

import styles from './index.module.scss';

import { GetFeedback } from '@shared/types/get-feedback.type';

const { Text } = Typography;

export const FeedbackCard = ({ fullName, imageSrc, message, rating, createdAt }: GetFeedback) => {
    const date = new Date(createdAt);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`;

    const stars = Array(5)
        .fill(null)
        .map((_, index) => {
            if (index < rating) {
                return <StarFilled key={index} className={styles.starFilled} />;
            } else {
                return <StarOutlined key={index} className={styles.starOutlined} />;
            }
        });

    return (
        <Card className={styles.card}>
            <Row gutter={8} wrap={false} className={styles.cardContent}>
                <Col className={styles.imageCell} flex='174px'>
                    <Image
                        src={imageSrc ? imageSrc : '../../../Avatar.svg'}
                        alt='avatar'
                        preview={false}
                        width={42}
                        height={42}
                        className={styles.avatar}
                    />
                    <Text className={styles.fullname}>{fullName || 'Пользователь'}</Text>
                </Col>
                <Col className={styles.messageCell}>
                    <Row gutter={16} align='middle'>
                        <Col>{stars}</Col>
                        <Col>
                            <Text className={styles.date}>{formattedDate}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Text className={styles.feedback}>{message}</Text>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
};
