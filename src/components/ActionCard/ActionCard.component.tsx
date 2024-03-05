import { Card, Button, Typography } from 'antd';

import { CalendarTwoTone, HeartFilled, IdcardOutlined } from '@ant-design/icons';

import styles from './index.module.scss';

type TActionCard = {
    title: string;
    buttonText: string;
    buttonIcon: 'heart' | 'calendar' | 'profile';
};

const { Text } = Typography;

export const ActionCard = ({ title, buttonText, buttonIcon }: TActionCard) => {
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
            <Button className={styles.buttonStyles} icon={renderButtonIcon()} type='link' block>
                <Text className={styles.buttonTextStyles}>{buttonText}</Text>
            </Button>
        </Card>
    );
};