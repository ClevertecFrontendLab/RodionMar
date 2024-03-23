import { useSelector } from 'react-redux';
import { useAppDispatch } from '@redux/configure-store';

import { SiderComponent } from '@components/Sider';
import { LottieLoader } from '@components/LottieLoader';

import { Layout, Typography, Button, PageHeader, Alert, Row } from 'antd';

const { Content } = Layout;
const { Text } = Typography;

import styles from './index.module.scss';

import { useEffect, useState } from 'react';
import { ProfilePendingSelector, ProfileSelector } from './store/profile.selector';
import { PageEnum } from '@constants/pages.enum';
import { CloseCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { ProfileFormComponent } from '@components/ProfileForm';
import { ModalAlert } from '@components/ModalAlert';
import { clearErrors } from './store/profile.slice';
import { TProfileRequest } from '@shared/types/profile-request.type';
import { TGetResponse } from '@shared/types/getResponse.type';
import { updateProfile } from './store/profile.actions';

const { Title } = Typography;

export const ProfilePage = () => {
    const [isSiderOpened, setIsSidebarOpened] = useState(false);
    const [isErrorModalOpened, setIsErrorModalOpened] = useState(false);
    const [isSaveChangesErrorModalOpened, setIsSaveChangesErrorModalOpened] = useState(false);
    const [isAlertOpened, setIsAlertOpened] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const fetchPending = useSelector(ProfilePendingSelector);
    const fetchProfile = useSelector(ProfileSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const errorModalCloseHandler = () => {
        dispatch(clearErrors());
        setIsErrorModalOpened(false);
    };

    const errorSaveChangesCloseHandler = () => {
        dispatch(clearErrors());
        setIsSaveChangesErrorModalOpened(false);
    };

    const alertCloseHandler = () => {
        setIsAlertOpened(false);
    };

    const handleResponseSaveChanges = (response: Pick<TGetResponse, 'meta'>) => {
        if (response.meta.requestStatus === 'fulfilled') {
            setIsAlertOpened(true)
        } else {
            setIsSaveChangesErrorModalOpened(true)
        }
    };

    const handleSaveChanges = async (data: TProfileRequest) => {
        const response = await dispatch(updateProfile(data));
        
        const responseData = {
            meta: response.meta,
        };

        handleResponseSaveChanges(responseData);
    };

    return (
        <Layout className={styles.mainLayout}>
            {fetchPending !== undefined && fetchPending === true && (
                <LottieLoader data-test-id='loader' />
            )}
            <SiderComponent
                isSiderOpened={isSiderOpened}
                setIsSidebarOpened={setIsSidebarOpened}
                windowWidth={windowWidth}
                activeMenuItemKey='4'
            />
            <Layout className={styles.contentWrapper}>
                <PageHeader
                    className={styles.pageHeader}
                    title={<Title className={styles.pageTitle}>{PageEnum.PROFILE}</Title>}
                    extra={
                        <Button
                            className={styles.settingButtonStyles}
                            type='text'
                            icon={<SettingOutlined className={styles.settingIconStyles} />}
                            size='large'
                        >
                            <Text className={styles.settingTextStyles}>Настройки</Text>
                        </Button>
                    }
                />
                <Content className={styles.contentStyles}>
                    <Row className={styles.componentsWrapper}>
                        <ProfileFormComponent
                            profile={fetchProfile}
                            setIsErrorModalOpened={setIsErrorModalOpened}
                            handleSaveChanges={handleSaveChanges}
                            windowWidth={windowWidth}
                        />
                        {
                            isAlertOpened ? (
                                <Alert className={styles.alert} message="Данные профиля успешно обновлены" type="success" onClose={alertCloseHandler} showIcon closable />
                            ) : null
                        }
                    </Row>

                </Content>

            </Layout>
            <ModalAlert
                isModalOpen={isErrorModalOpened}
                type='error'
                message='Файл слишком большой'
                description='ПВыберите файл размером [......] МБ.'
                icon={<CloseCircleOutlined />}
                closable={false}
                onCloseHandler={errorModalCloseHandler}
                button={
                    <Button
                        type='primary'
                        size='large'
                        htmlType='button'
                        className={styles.button}
                        onClick={errorModalCloseHandler}
                    >
                        Закрыть
                    </Button>
                }
            />
            <ModalAlert
                className={styles.saveChangeErrorModal}
                isModalOpen={isSaveChangesErrorModalOpened}
                type='error'
                message='При сохранении данных произошла ошибка '
                description='Придётся попробовать ещё раз'
                icon={<CloseCircleOutlined />}
                closable={false}
                onCloseHandler={errorSaveChangesCloseHandler}
                button={
                    <Button
                        type='primary'
                        size='large'
                        htmlType='button'
                        className={styles.button}
                        onClick={errorSaveChangesCloseHandler}
                    >
                        Закрыть
                    </Button>
                }
            />
        </Layout>
    );
};

