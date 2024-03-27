import { Layout, Typography, Col, Row, Button, Breadcrumb } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

import styles from './index.module.scss';
import { PageEnum } from '@constants/pages.enum';
import { AppRouteEnum } from '@constants/app-routes.enum';
import { DataTestEnum } from '@constants/data-tests.enum';

type HeaderProps = {
    isSiderOpened: boolean;
    windowWidth: number;
    handleClickSettingsButton: () => void;
};

const { Header } = Layout;
const { Title, Text } = Typography;

const items = [
    {
        path: AppRouteEnum.BASIC_MAIN,
        breadcrumbName: PageEnum.MAIN,
    },
];

export const HeaderComponent = ({
    isSiderOpened,
    windowWidth,
    handleClickSettingsButton,
}: HeaderProps) => (
    <Header className={styles.headerStyles}>
        <Row>
            <Col>
                <Breadcrumb routes={items} className={styles.breadcrumbs} />
            </Col>
        </Row>
        <Row className={styles.mainInfoStyles}>
            <Col>
                <Title className={styles.title}>
                    Приветствуем тебя в CleverFit —{' '}
                    <span
                        className={
                            isSiderOpened && windowWidth < 835 && windowWidth > 704
                                ? styles.isSidebarOpenedStyles
                                : ''
                        }
                    >
                        приложении,{' '}
                    </span>{' '}
                    которое поможет тебе добиться своей мечты!
                </Title>
            </Col>
            <Col>
                <Button
                    className={styles.settingButtonStyles}
                    type='text'
                    icon={<SettingOutlined className={styles.settingIconStyles} />}
                    onClick={handleClickSettingsButton}
                    data-test-id={DataTestEnum.HEADER_SETTINGS}
                >
                    <Text className={styles.settingTextStyles}>Настройки</Text>
                </Button>
            </Col>
        </Row>
    </Header>
);
