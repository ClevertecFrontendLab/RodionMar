import { Col, Row, Typography } from 'antd';
import styles from './index.module.scss';

import { CheckCircleFilled, CloseCircleOutlined } from '@ant-design/icons';

type TSettingsFeatureItemProps = {
    title: React.ReactNode;
    includeInFree: boolean;
    includeInPro: boolean;
};

const { Text } = Typography;

export const SettingsFeatureItem = ({
    title,
    includeInFree,
    includeInPro,
}: TSettingsFeatureItemProps) => (
    <Row className={styles.wrapper} justify='space-between'>
        <Col>
            <Text className={styles.title}>{title}</Text>
        </Col>
        <Col className={styles.iconsCol}>
            <Row gutter={53}>
                <Col>{includeInFree ? <CheckCircleFilled /> : <CloseCircleOutlined />}</Col>
                <Col>{includeInPro ? <CheckCircleFilled /> : <CloseCircleOutlined />}</Col>
            </Row>
        </Col>
    </Row>
);
