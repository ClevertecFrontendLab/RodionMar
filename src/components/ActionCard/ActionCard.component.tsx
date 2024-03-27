import { Card, Button, Typography } from 'antd';

import { CalendarTwoTone, HeartFilled, IdcardOutlined } from '@ant-design/icons';

import styles from './index.module.scss';
import { ActionCard } from '@shared/types/action-card.type';
import { ActionIcon } from '@constants/action-card.enum';

const { Text } = Typography;

export const ActionCardComponent = ({
    title,
    buttonText,
    buttonIcon,
    handleRedirect,
    dataTestId,
}: ActionCard) => {
    const renderButtonIcon = () => {
        switch (buttonIcon) {
            case ActionIcon.HEART:
                return <HeartFilled className={styles.iconStyles} />;
            case ActionIcon.CALENDAR:
                return <CalendarTwoTone className={styles.iconStyles} />;
            case ActionIcon.PROFILE:
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
