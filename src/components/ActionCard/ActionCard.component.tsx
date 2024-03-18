import { Card, Button, Typography } from 'antd';

import { CalendarTwoTone, HeartFilled, IdcardOutlined } from '@ant-design/icons';

import styles from './index.module.scss';
import { TActionCard } from '@shared/types/action-card.type';

const { Text } = Typography;

export const ActionCard = ({
    title,
    buttonText,
    buttonIcon,
    handleRedirect,
    dataTestId,
}: TActionCard) => {
    const renderButtonIcon = () => {
        switch (buttonIcon) {
            case 'heart':
                return <HeartFilled className={styles.iconStyles} />;
            case 'calendar':
                return <CalendarTwoTone className={styles.iconStyles} />;
            case 'profile':
                return <IdcardOutlined className={styles.iconStyles} />;
            default:
                return null;
        }
    };
    return (
        <Card
            className={styles.cardStyles}
            title={<Text className={styles.cardTitleStyles}>{title}</Text>}
        >
            <Button
                className={styles.buttonStyles}
                icon={renderButtonIcon()}
                type='link'
                onClick={handleRedirect}
                data-test-id={dataTestId}
                block
            >
                <Text className={styles.buttonTextStyles}>{buttonText}</Text>
            </Button>
        </Card>
    );
};
