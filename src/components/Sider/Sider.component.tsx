// ==================== React ====================
import { useEffect, useState } from 'react';

// ==================== Classnames ====================
import cn from 'classnames';

// ==================== Ant Design ====================
import { Layout, Typography, Button, Image, Menu, MenuProps, Divider, Space } from 'antd';

// ==================== Ant Design Icons ====================
import { CalendarTwoTone, HeartFilled, IdcardOutlined, TrophyFilled } from '@ant-design/icons';

// ==================== Styles ====================
import styles from "./index.module.scss";

// ==================== Types ====================
type MenuItem = Required<MenuProps>['items'][number];


const { Sider } = Layout;
const { Text } = Typography;


const SiderComponent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderSwitcherButton = () => {
    if (windowWidth < 705) {
      return (
        <Button
          icon={isSidebarOpen ? (
            <Image src="../../../public/mobile-menu-fixed-switcher--opened.svg" alt="switcher icon" preview={false} className={styles.switcherIconStyles} />
          ) : (
            <Image src="../../../public/mobile-menu-fixed-switcher--closed.svg" alt="switcher icon" preview={false} className={styles.switcherIconStyles} />
          )}
          className={styles.switcherStyles}
          onClick={() => toggleSidebar()}
          data-test-id="sider-switch-mobile"
        />
      );
    } else if (windowWidth > 705) {
      return (
        <Button
          icon={isSidebarOpen ? (
            <Image src="../../../public/sidemenu-fixed-switcher--opened.svg" alt="switcher icon" preview={false} className={styles.switcherIconStyles} />
          ) : (
            <Image src="../../../public/sidemenu-fixed-switcher--closed.svg" alt="switcher icon" preview={false} className={styles.switcherIconStyles} />
          )}
          className={styles.switcherStyles}
          onClick={() => toggleSidebar()}
          data-test-id="sider-switch"
        />
      );
    }
  };

  const menuItems: MenuItem[] = [
    { label: isSidebarOpen ? <Text className={styles.menuLabelStyles}>Календарь</Text> : null, key: "2", icon: <CalendarTwoTone className={styles.menuIconStyles} /> },
    { label: isSidebarOpen ? <Text className={styles.menuLabelStyles}>Тренировки</Text> : null, key: "1", icon: <HeartFilled className={styles.menuIconStyles} /> },
    { label: isSidebarOpen ? <Text className={styles.menuLabelStyles}>Достижения</Text> : null, key: "3", icon: <TrophyFilled className={styles.menuIconStyles} /> },
    { label: isSidebarOpen ? <Text className={styles.menuLabelStyles}>Профиль</Text> : null, key: "4", icon: <IdcardOutlined className={styles.menuIconStyles} /> }
  ];

  const sidebarWidth = windowWidth < 705 ? 106 : (isSidebarOpen ? 208 : 64);

  return (
    <Sider className={isSidebarOpen ? cn(styles.siderStyles, styles.siderOpenedStyles) : cn(styles.siderStyles, styles.siderClosedStyles)} width={sidebarWidth}>
      <Space.Compact className={styles.layoutWrapperStyles}>
        <Space direction="vertical">
          {isSidebarOpen ? (
            <Image src="../../../public/logo--opened.svg" alt="logo" preview={false} className={cn(styles.logoStyles, styles.logoOpenedStyles)} />
          ) : (
            <Image src="../../../public/logo--closed.svg" alt="logo" preview={false} className={cn(styles.logoStyles, styles.logoClosedStyles)} />
          )
          }
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={menuItems}
            className={isSidebarOpen ? cn(styles.menuStyles, styles.menuOpenedStyles) : cn(styles.menuStyles, styles.menuClosedStyles)}
          />
        </Space>
        <Space direction="vertical">
          <Divider className={styles.divider} />
          <Button
            className={isSidebarOpen ? cn(styles.exitButtonStyles, styles.exitButtonOpenedStyles) : cn(styles.exitButtonStyles, styles.exitButtonClosedStyles)}
            icon={<Image src="../../../public/exit.svg" alt="exit icon" preview={false} className={styles.exitIconStyles} />}
          >
            {isSidebarOpen ? (
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