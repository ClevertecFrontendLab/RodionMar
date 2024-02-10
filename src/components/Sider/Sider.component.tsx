import cn from 'classnames';

import { Layout, Typography, Button, Image, Menu, MenuProps, Divider, Space } from 'antd';

import { CalendarTwoTone, HeartFilled, IdcardOutlined, TrophyFilled } from '@ant-design/icons';

import styles from "./index.module.scss";

type MenuItem = Required<MenuProps>['items'][number];

interface ISidebarProps {
  isSiderOpened: boolean;
  setIsSidebarOpened: (isSiderOpened: boolean) => void;
  windowWidth: number;
}


const { Sider } = Layout;
const { Text } = Typography;


const SiderComponent = ({ isSiderOpened, setIsSidebarOpened, windowWidth }: ISidebarProps) => {
  const toggleSidebar = () => {
    setIsSidebarOpened(!isSiderOpened);
  };

  const renderSwitcherButton = () => {
    if (windowWidth < 705) {
      return (
        <Button
          icon={isSiderOpened ? (
            <Image src="../../../mobile-menu-fixed-switcher--opened.svg" alt="switcher icon" preview={false} className={styles.switcherIconStyles} />
          ) : (
            <Image src="../../../mobile-menu-fixed-switcher--closed.svg" alt="switcher icon" preview={false} className={styles.switcherIconStyles} />
          )}
          className={styles.switcherStyles}
          onClick={() => toggleSidebar()}
          data-test-id="sider-switch-mobile"
        />
      );
    } else if (windowWidth > 705) {
      return (
        <Button
          icon={isSiderOpened ? (
            <Image src="../../../sidemenu-fixed-switcher--opened.svg" alt="switcher icon" preview={false} className={styles.switcherIconStyles} />
          ) : (
            <Image src="../../../sidemenu-fixed-switcher--closed.svg" alt="switcher icon" preview={false} className={styles.switcherIconStyles} />
          )}
          className={styles.switcherStyles}
          onClick={() => toggleSidebar()}
          data-test-id="sider-switch"
        />
      );
    }
  };

  const menuItems: MenuItem[] = [
    { label: isSiderOpened ? <Text className={styles.menuLabelStyles}>Календарь</Text> : null, key: "2", icon: <CalendarTwoTone className={styles.menuIconStyles} /> },
    { label: isSiderOpened ? <Text className={styles.menuLabelStyles}>Тренировки</Text> : null, key: "1", icon: <HeartFilled className={styles.menuIconStyles} /> },
    { label: isSiderOpened ? <Text className={styles.menuLabelStyles}>Достижения</Text> : null, key: "3", icon: <TrophyFilled className={styles.menuIconStyles} /> },
    { label: isSiderOpened ? <Text className={styles.menuLabelStyles}>Профиль</Text> : null, key: "4", icon: <IdcardOutlined className={styles.menuIconStyles} /> }
  ];

  const sidebarWidth = windowWidth < 705 ? 106 : (isSiderOpened ? 208 : 64);

  return (
    <Sider className={isSiderOpened ? cn(styles.siderStyles, styles.siderOpenedStyles) : cn(styles.siderStyles, styles.siderClosedStyles)} width={sidebarWidth}>
      <Space.Compact className={styles.layoutWrapperStyles}>
        <Space direction="vertical">
          {isSiderOpened ? (
            <Image src="../../../logo--opened.svg" alt="logo" preview={false} className={cn(styles.logoStyles, styles.logoOpenedStyles)} />
          ) : (
            <Image src="../../../logo--closed.svg" alt="logo" preview={false} className={cn(styles.logoStyles, styles.logoClosedStyles)} />
          )
          }
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={menuItems}
            className={isSiderOpened ? cn(styles.menuStyles, styles.menuOpenedStyles) : cn(styles.menuStyles, styles.menuClosedStyles)}
          />
        </Space>
        <Space direction="vertical">
          <Divider className={styles.divider} />
          <Button
            className={isSiderOpened ? cn(styles.exitButtonStyles, styles.exitButtonOpenedStyles) : cn(styles.exitButtonStyles, styles.exitButtonClosedStyles)}
            icon={<Image src="../../../Exit.svg" alt="exit icon" preview={false} className={styles.exitIconStyles} />}
          >
            {isSiderOpened ? (
              <Text className={styles.exitTextStyles}>
                Выход
              </Text>
            ) : null
            }
          </Button>
        </Space>
      </Space.Compact>
      {renderSwitcherButton()}
    </Sider>
  )
};

export default SiderComponent;