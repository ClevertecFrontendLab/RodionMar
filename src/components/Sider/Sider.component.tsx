import { useState } from 'react';

import { history, useAppDispatch } from '@redux/configure-store';

import cn from 'classnames';

import { Layout, Typography, Button, Image, Menu, MenuProps, Divider } from 'antd';

import {
    CalendarTwoTone,
    HeartFilled,
    IdcardOutlined,
    MenuFoldOutlined,
    TrophyFilled,
} from '@ant-design/icons';

import { logout } from '@pages/auth/store/auth.slice';

import styles from './index.module.scss';
import { AppRouteEnum } from '@constants/app-routes.enum';
import { DataTestEnum } from '@constants/data-tests.enum';

type MenuItem = Required<MenuProps>['items'][number];

type SiderProps = {
    isSiderOpened: boolean;
    setIsSidebarOpened: (isSiderOpened: boolean) => void;
    windowWidth: number;
    activeMenuItemKey?: string;
    handleTrainings?: () => void;
};

const { Sider } = Layout;
const { Text } = Typography;

const SIDER_BREAKPOINT = 705; 

export const SiderComponent = ({
    isSiderOpened,
    setIsSidebarOpened,
    windowWidth,
    activeMenuItemKey = '',
    handleTrainings,
}: SiderProps) => {
    const [activeItemKey, setActiveItemKey] = useState<string>('' || activeMenuItemKey);
    const dispatch = useAppDispatch();

    const toggleSidebar = () => {
        setIsSidebarOpened(!isSiderOpened);
    };

    const handleClickTraining = () => {
        setActiveItemKey('1');
        if (handleTrainings) handleTrainings();
    };

    const handleClickProfile = () => {
        setActiveItemKey('4');
        history.push(AppRouteEnum.PROFILE, { fromServer: true });
    };

    const renderSwitcherButton = () => {
        if (windowWidth < SIDER_BREAKPOINT) {
            return (
                <Button
                    icon={
                        <MenuFoldOutlined
                            className={styles.switcherIconStyles}
                            rotate={isSiderOpened ? 0 : 180}
                        />
                    }
                    className={cn(styles.commonSwitcherStyles, styles.switcherMobileStyles)}
                    onClick={() => toggleSidebar()}
                    data-test-id={DataTestEnum.SIDER_SWITCH_MOBILE}
                />
            );
        } else if (windowWidth > SIDER_BREAKPOINT) {
            return (
                <Button
                    icon={
                        <MenuFoldOutlined
                            className={styles.switcherIconStyles}
                            rotate={isSiderOpened ? 0 : 180}
                        />
                    }
                    className={cn(styles.commonSwitcherStyles, styles.switcherStyles)}
                    onClick={() => toggleSidebar()}
                    data-test-id={DataTestEnum.SIDER_SWITCH}
                />
            );
        }
    };

    const menuItems: MenuItem[] = [
        {
            label: isSiderOpened ? <Text className={styles.menuLabelStyles}>Календарь</Text> : null,
            key: '1',
            icon: <CalendarTwoTone className={styles.menuIconStyles} />,
            onClick: handleClickTraining,
        },
        {
            label: isSiderOpened ? (
                <Text className={styles.menuLabelStyles}>Тренировки</Text>
            ) : null,
            key: '2',
            icon: <HeartFilled className={styles.menuIconStyles} />,
        },
        {
            label: isSiderOpened ? (
                <Text className={styles.menuLabelStyles}>Достижения</Text>
            ) : null,
            key: '3',
            icon: <TrophyFilled className={styles.menuIconStyles} />,
        },
        {
            label: isSiderOpened ? <Text className={styles.menuLabelStyles}>Профиль</Text> : null,
            key: '4',
            icon: <IdcardOutlined className={styles.menuIconStyles} />,
            onClick: handleClickProfile,
        },
    ];

    const handleMenuClick = (menuItem: MenuItem) => {
        if (menuItem?.key) setActiveItemKey(menuItem?.key.toString());
    };

    const logoutHandler = () => {
        dispatch(logout());
        localStorage.removeItem('token');
        history.push(AppRouteEnum.BASIC);
    };

    const sidebarWidth = windowWidth < SIDER_BREAKPOINT ? 106 : isSiderOpened ? 208 : 64;

    return (
        <Sider
            className={
                isSiderOpened
                    ? cn(styles.siderStyles, styles.siderOpenedStyles)
                    : cn(styles.siderStyles, styles.siderClosedStyles)
            }
            width={sidebarWidth}
            theme='light'
            collapsedWidth={windowWidth > SIDER_BREAKPOINT ? 64 : 0}
            collapsed={!isSiderOpened}
        >
            <div className={styles.layoutWrapperStyles}>
                <div>
                    {isSiderOpened ? (
                        <Image
                            src='../../../logo--opened.svg'
                            alt='logo'
                            preview={false}
                            className={cn(styles.logoStyles, styles.logoOpenedStyles)}
                            onClick={() => history.push(AppRouteEnum.BASIC_MAIN)}
                        />
                    ) : (
                        <Image
                            src='../../../logo--closed.svg'
                            alt='logo'
                            preview={false}
                            className={cn(styles.logoStyles, styles.logoClosedStyles)}
                            onClick={() => history.push(AppRouteEnum.BASIC_MAIN)}
                        />
                    )}
                    <Menu
                        defaultSelectedKeys={undefined}
                        selectedKeys={[activeItemKey]}
                        mode='vertical'
                        items={menuItems}
                        className={
                            isSiderOpened
                                ? cn(styles.menuStyles, styles.menuOpenedStyles)
                                : cn(styles.menuStyles, styles.menuClosedStyles)
                        }
                        onClick={handleMenuClick}
                    />
                </div>
                <div>
                    <Divider className={styles.divider} />
                    <Button
                        className={
                            isSiderOpened
                                ? cn(styles.exitButtonStyles, styles.exitButtonOpenedStyles)
                                : cn(styles.exitButtonStyles, styles.exitButtonClosedStyles)
                        }
                        icon={
                            <Image
                                src='../../../Exit.svg'
                                alt='exit icon'
                                preview={false}
                                className={styles.exitIconStyles}
                            />
                        }
                        onClick={logoutHandler}
                        type='text'
                    >
                        {isSiderOpened ? (
                            <Text className={styles.exitTextStyles}>Выход</Text>
                        ) : null}
                    </Button>
                </div>
            </div>
            {renderSwitcherButton()}
        </Sider>
    );
};
