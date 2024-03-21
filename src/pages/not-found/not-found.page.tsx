import { history } from '@redux/configure-store';

import { SiderComponent } from '@components/Sider';

import { Layout, Button, Result } from 'antd';

const { Content } = Layout;

import styles from './index.module.scss';

import { useEffect, useState } from 'react';
import { AppRouteEnum } from '@constants/app-routes.enum';


export const NotFoundPage = () => {
    const [isSiderOpened, setIsSidebarOpened] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const buttonHandler = () => {
        history.push(AppRouteEnum.BASIC_MAIN, { fromServer: true })
    };

    return (
        <Layout className={styles.mainLayout}>
            <SiderComponent
                isSiderOpened={isSiderOpened}
                setIsSidebarOpened={setIsSidebarOpened}
                windowWidth={windowWidth}
                activeMenuItemKey='4'
            />
            <Layout className={styles.contentWrapper}>
                <Content className={styles.contentStyles}>
                    <Result
                        status="404"
                        title="Такой страницы нет"
                        subTitle="Извините, страница не найдена, возможно, она была удалена или перемещена."
                        className={styles.result}
                        extra={
                            <Button
                                type='primary'
                                size='large'
                                htmlType='button'
                                className={styles.button}
                                onClick={buttonHandler}
                            >
                                На главную
                            </Button>
                        }
                    />

                </Content>
            </Layout>
        </Layout>
    );
};