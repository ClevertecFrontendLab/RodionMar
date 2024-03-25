import { useSelector } from 'react-redux';
import { useAppDispatch, history } from '@redux/configure-store';

import { SiderComponent } from '@components/Sider';
import { LottieLoader } from '@components/LottieLoader';

import { Layout, Typography, Button, PageHeader, Row, Col, Card } from 'antd';

const { Content } = Layout;
const { Text } = Typography;

import styles from './index.module.scss';

import cn from 'classnames';

import { useEffect, useState } from 'react';
import { PageEnum } from '@constants/pages.enum';
import { CheckOutlined } from '@ant-design/icons';
import { clearErrors } from './store/settings.slice';
import { AppRouteEnum } from '@constants/app-routes.enum';
import { ProfilePendingSelector, ProfileSelector } from '@pages/profile/store/profile.selector';
import { updateProfile } from '@pages/profile/store/profile.actions';
import { SettingsPendingSelector, TariffListSelector } from './store/settings.selector';
import { FeedbackModal } from '@components/FeedbackModal';
import { TCreateFeedback } from '@shared/types/create-feedback.type';
import { fetchCreateFeedback } from '@pages/feedbacks/store/feedback.actions';
import { SettingsSwitchComponent } from '@components/SettingsSwitch';
import { TTarifListPeriod } from '@shared/types/tarif-list-period.type';
import { SettingsDrawerComponent } from '@components/SettingsDrawer';
import { TTarifRequest } from '@shared/types/tarif-request.type';
import { createTariff } from './store/settings.actions';
import { TGetResponse } from '@shared/types/getResponse.type';
import { ResultModal } from '@components/ResultModal';
import { TooltipPlacement } from 'antd/es/tooltip';

const { Title } = Typography;

export const SettingsPage = () => {
    const [isSiderOpened, setIsSidebarOpened] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [isDrawerOpened, setIsDrawerOpened] = useState(false);
    const [tarifTransferData, setTarifTransferData] = useState<{
        _id: string;
        periods: TTarifListPeriod[];
    }>({ _id: '', periods: [] });
    const [isCheckEmailModalOpened, setIsCheckEmailModalOpened] = useState(false);
    const dispatch = useAppDispatch();
    const fetchProfilePending = useSelector(ProfilePendingSelector);
    const fetchSettingsPending = useSelector(SettingsPendingSelector);
    const profile = useSelector(ProfileSelector);
    const tarifList = useSelector(TariffListSelector);

    console.log(tarifList);

    useEffect(() => {
        if (tarifList) {
            setTarifTransferData({
                _id: tarifList[0]._id,
                periods: tarifList[0].periods,
            });
        }
    }, [tarifList, setTarifTransferData]);

    console.log(tarifTransferData);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const onBackPageHeaderPHandler = () => {
        dispatch(clearErrors());
        history.back();
    };

    console.log(profile);

    const switchChangeTrainingsHandler = (value: boolean) => {
        if (profile) {
            const data = {
                ...profile,
                readyForJointTraining: value,
            };

            dispatch(updateProfile(data));
        }
    };

    const switchChangeNotificationsHandler = (vallue: boolean) => {
        if (profile) {
            const data = {
                ...profile,
                sendNotification: vallue,
            };

            dispatch(updateProfile(data));
        }
    };

    const handleShowAllFeedbacks = () => {
        dispatch(clearErrors());
        history.push(AppRouteEnum.FEEDBACKS, { fromServer: true });
    };

    const handleFeedback = (data: TCreateFeedback) => {
        dispatch(fetchCreateFeedback(data));
    };

    const handleClickButtonDetails = (_id?: string, periods?: TTarifListPeriod[]) => {
        if (periods && _id) {
            setTarifTransferData({
                _id: _id,
                periods: periods,
            });
        }
        setIsDrawerOpened(!isDrawerOpened);
    };

    const handleResponseCreateTariff = (response: Pick<TGetResponse, 'meta'>) => {
        if (response.meta.requestStatus === 'fulfilled') {
            setIsCheckEmailModalOpened(true);
        } else {
            return;
        }
    };

    const chooseAndPayHandler = async (data: TTarifRequest) => {
        const response = await dispatch(createTariff(data));

        const responseData = {
            meta: response.meta,
        };

        handleResponseCreateTariff(responseData);
    };

    const onCancelResultModalHandler = () => {
        localStorage.removeItem('token');

        dispatch(clearErrors());
        history.push(AppRouteEnum.BASIC_AUTH);
    };

    const switchData = [
        {
            label: 'Открыт для совместных тренировок',
            tooltip: 'включеная функция позволит участвовать в совместных тренировках',
            checked: profile ? profile.readyForJointTraining : false,
            onChange: switchChangeTrainingsHandler,
            placement: windowWidth > 480 ? 'bottomLeft' : 'topRight',
            overlayClassName: styles.openToCommonTrainings,
        },
        {
            label: 'Уведомления',
            tooltip: 'включеная функция позволит получать уведомления об активностях',
            checked: profile ? profile.sendNotification : false,
            onChange: switchChangeNotificationsHandler,
            placement: windowWidth > 480 ? 'bottomLeft' : 'topLeft',
            overlayClassName: styles.getNotifications,
        },
        {
            label: 'Тёмная тема',
            tooltip: 'темная тема доступна для PRO tarif',
            disabled: !profile?.tariff,
            placement: windowWidth > 480 ? 'bottomLeft' : 'topLeft',
            overlayClassName: styles.darkMode,
        },
    ];

    const switches = switchData.map((item, index) => (
        <SettingsSwitchComponent
            key={index}
            label={item.label}
            tooltip={item.tooltip}
            defaultChecked={item.checked}
            onChange={item.onChange}
            disabled={item.disabled}
            placement={item.placement as TooltipPlacement}
            overlayClassName={item.overlayClassName}
        />
    ));

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);

        const day = date.getDate();
        const month = date.getMonth() + 1;

        return `активен до ${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}`;
    };

    return (
        <Layout className={styles.mainLayout}>
            {((fetchProfilePending !== undefined && fetchProfilePending === true) ||
                (fetchSettingsPending !== undefined && fetchSettingsPending === true)) && (
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
                    title={<Title className={styles.pageTitle}>{PageEnum.SETTINGS}</Title>}
                    onBack={onBackPageHeaderPHandler}
                />
                <Content className={styles.contentStyles}>
                    <div className={styles.componentsWrapper}>
                        <Row>
                            <Text className={styles.tarifText}>Мой тариф</Text>
                        </Row>
                        <Row className={styles.cardRow} wrap={false}>
                            <Col>
                                <Card
                                    className={styles.card}
                                    title='FREE tarif'
                                    extra={
                                        <Button
                                            className={styles.cardButton}
                                            type='link'
                                            size='small'
                                            onClick={() => handleClickButtonDetails()}
                                        >
                                            Подробнее
                                        </Button>
                                    }
                                    cover={<img alt='free tarif' src='../../../free.jpg' />}
                                >
                                    <Text className={styles.cardContentText}>
                                        активен
                                        <CheckOutlined />
                                    </Text>
                                </Card>
                            </Col>
                            {tarifList.map((tarif) => (
                                <Col key={tarif._id}>
                                    <Card
                                        className={styles.card}
                                        title={`${tarif.name.toUpperCase()} tarif`}
                                        extra={
                                            <Button
                                                className={styles.cardButton}
                                                type='link'
                                                size='small'
                                                onClick={() =>
                                                    handleClickButtonDetails(
                                                        tarif._id,
                                                        tarif.periods,
                                                    )
                                                }
                                            >
                                                Подробнее
                                            </Button>
                                        }
                                        cover={
                                            <img
                                                alt={`${tarif.name} tarif`}
                                                src={
                                                    profile?.tariff &&
                                                    tarif._id === profile?.tariff.tariffId
                                                        ? '../../../pro-able.jpg'
                                                        : '../../../pro-disable.jpg'
                                                }
                                            />
                                        }
                                    >
                                        {profile?.tariff &&
                                        tarif._id === profile?.tariff.tariffId ? (
                                            <Text className={styles.cardExpiredText}>
                                                {formatDate(profile.tariff.expired)}
                                            </Text>
                                        ) : (
                                            <Button
                                                className={styles.cardContentButton}
                                                type='primary'
                                                size='large'
                                            >
                                                Активировать
                                            </Button>
                                        )}
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                        <Row className={styles.switchesWrapper}>{switches}</Row>
                        <Row className={styles.feedbackButtons}>
                            <Col>
                                <Button
                                    type='primary'
                                    size='large'
                                    className={styles.feedbackButton}
                                    onClick={() => setIsFeedbackModalOpen(true)}
                                    block
                                >
                                    Написать отзыв
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    type='link'
                                    size='large'
                                    onClick={handleShowAllFeedbacks}
                                    className={cn(styles.button, styles.textButton)}
                                    block
                                >
                                    Смотреть все отзывы
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Content>
            </Layout>

            <FeedbackModal
                setIsFeedbackModalOpen={setIsFeedbackModalOpen}
                isFeedbackModalOpen={isFeedbackModalOpen}
                handleFeedback={handleFeedback}
            />

            <SettingsDrawerComponent
                isOpened={isDrawerOpened}
                setIsOpened={setIsDrawerOpened}
                chooseAndPayHandler={chooseAndPayHandler}
                tarifTransferData={tarifTransferData}
                formatDate={formatDate}
            />

            <ResultModal
                isModalOpen={isCheckEmailModalOpened}
                status='success'
                title={<Text className={styles.resultTitle}>Чек для оплаты у вас на почте</Text>}
                subTitle={
                    <Text className={styles.resultSubtitle}>
                        Мы отправили инструкцию для оплаты вам на e-mail{' '}
                        <span>{profile?.email}</span>. После подтверждения оплаты войдите в
                        приложение заново.
                    </Text>
                }
                resultClassName={styles.result}
                extra={
                    <Text className={styles.resultExtraText}>
                        Не пришло письмо? Проверьте папку Спам.
                    </Text>
                }
                onCancelHandler={onCancelResultModalHandler}
                closable
            />
        </Layout>
    );
};
