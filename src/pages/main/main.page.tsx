import { useEffect, useState } from 'react';
import { history, useAppDispatch } from '@redux/configure-store';
import { useSelector } from 'react-redux';
import { fetchFeedbacks } from '@pages/feedbacks/store/feedback.actions';
import { FeedbackPendingSelector } from '@pages/feedbacks/store/feedback.selector';

import { Layout, Row, Col, Typography, Space, Button } from 'antd';

import { HeaderComponent } from '@components/Header';
import { ActionCardComponent } from '@components/ActionCard';
import { FooterComponent } from '@components/Footer';
import { SiderComponent } from '@components/Sider';
import { LottieLoader } from '@components/LottieLoader';

import styles from './index.module.scss';

import { GetResponse } from '../../shared/types/getResponse.type';
import { AppRouteEnum } from '@constants/app-routes.enum';
import { TrainingPendingSelector } from '@pages/calendar/store/training.selector';
import { fetchTrainings } from '@pages/calendar/store/training.actions';
import { ActionCard } from '@shared/types/action-card.type';
import { ResultModal } from '@components/ResultModal';
import { clearErrors } from '@pages/calendar/store/training.slice';
import { fetchProfile } from '@pages/profile/store/profile.actions';
import { ProfilePendingSelector } from '@pages/profile/store/profile.selector';
import { fetchTariffList } from '@pages/settings/store/settings.actions';
import { SettingsPendingSelector } from '@pages/settings/store/settings.selector';
import { DataTestEnum } from '@constants/data-tests.enum';
import { ActionIcon } from '@constants/action-card.enum';

const { Content } = Layout;
const { Title } = Typography;

const MainPage = () => {
    const [isSiderOpened, setIsSidebarOpened] = useState(true);
    const [isServerErrorModalOpen, setIsServerErrorModalOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const dispatch = useAppDispatch();
    const fetchFeedbacksPending = useSelector(FeedbackPendingSelector);
    const fetchTrainingPending = useSelector(TrainingPendingSelector);
    const fetchProfilePending = useSelector(ProfilePendingSelector);
    const fetchTariffListPending = useSelector(SettingsPendingSelector);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    const handleResponseFeedbacks = (response: GetResponse) => {
        if (response.meta.requestStatus === 'fulfilled') {
            history.push(AppRouteEnum.FEEDBACKS, { fromServer: true });
            return true;
        } else {
            switch (response.payload.status) {
                case 403:
                    localStorage.removeItem('token');
                    history.push(AppRouteEnum.AUTH);
                    break;
                default:
                    history.push(AppRouteEnum.FEEDBACKS, { fromServer: true });
                    break;
            }
        }
    };

    const handleResponseTrainings = (response: GetResponse) => {
        if (response.meta.requestStatus === 'fulfilled') {
            history.push(AppRouteEnum.CALENDAR, { fromServer: true });
            return true;
        } else {
            setIsServerErrorModalOpen(true);
        }
    };

    const handleFeedbacks = async () => {
        const response = await dispatch(fetchFeedbacks());

        const responseData: GetResponse = {
            meta: response.meta,
            payload: response.payload,
        };

        handleResponseFeedbacks(responseData);
    };

    const handleTrainings = async () => {
        const response = await dispatch(fetchTrainings());

        const responseData: GetResponse = {
            meta: response.meta,
            payload: response.payload,
        };

        handleResponseTrainings(responseData);
    };

    const handleProfile = () => history.push(AppRouteEnum.PROFILE, { fromServer: true });

    const cards: ActionCard[] = [
        {
            title: 'Расписать тренировки',
            buttonText: 'Тренировки',
            buttonIcon: ActionIcon.HEART,
        },
        {
            title: 'Назначить календарь',
            buttonText: 'Календарь',
            buttonIcon: ActionIcon.CALENDAR,
            handleRedirect: handleTrainings,
            dataTestId: 'menu-button-calendar',
        },
        {
            title: 'Заполнить профиль',
            buttonText: 'Профиль',
            buttonIcon: ActionIcon.PROFILE,
            handleRedirect: handleProfile,
            dataTestId: 'menu-button-profile',
        },
    ];

    const serverErrorModalButtonHandler = () => {
        dispatch(clearErrors());
        setIsServerErrorModalOpen(false);
    };

    const handleClickSettingsButton = async () => {
        const response = await dispatch(fetchTariffList());
        if (response) history.push(AppRouteEnum.SETTINGS, { fromServer: true });
    };

    return (
        <Layout className={styles.mainLayout}>
            {(fetchFeedbacksPending ||
                fetchTrainingPending ||
                fetchProfilePending ||
                fetchTariffListPending) && <LottieLoader />}
            <SiderComponent
                isSiderOpened={isSiderOpened}
                setIsSidebarOpened={setIsSidebarOpened}
                windowWidth={windowWidth}
                handleTrainings={handleTrainings}
            />
            <Layout className={styles.contentWrapper}>
                <HeaderComponent
                    isSiderOpened={isSiderOpened}
                    windowWidth={windowWidth}
                    handleClickSettingsButton={handleClickSettingsButton}
                />
                <Content className={styles.contentStyles}>
                    <Space.Compact className={styles.containerStyles} direction='vertical'>
                        <Row>
                            <Col className={styles.possibilitiesTextStyles} span={24}>
                                {'С CleverFit ты сможешь: — планировать свои тренировки на календаре, выбирая тип и уровень нагрузки; — отслеживать свои достижения в разделе статистики, сравнивая свои результаты с нормами и рекордами; — создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы о тренировках; — выполнять расписанные тренировки для разных частей тела, следуя подробным инструкциям и советам профессиональных тренеров.'
                                    .split('—')
                                    .map((str, idx) => (
                                        <span key={idx}>
                                            {' '}
                                            {idx != 0 ? '—' : ''} {str} <br />{' '}
                                        </span>
                                    ))}
                            </Col>
                        </Row>
                        <Row className={styles.helperWrapperStyles}>
                            <Col span={24}>
                                <Title level={4} className={styles.helperTitleStyles}>
                                    CleverFit — это не просто приложение, а твой личный помощник в
                                    мире фитнеса. Не откладывай на завтра — начни тренироваться уже
                                    сегодня!
                                </Title>
                            </Col>
                            <Row className={styles.cardWrapperStyles}>
                                {cards.map((card, index) => (
                                    <Col className={styles.card} key={index}>
                                        <ActionCardComponent
                                            key={index}
                                            title={card.title}
                                            buttonText={card.buttonText}
                                            buttonIcon={card.buttonIcon}
                                            handleRedirect={card.handleRedirect}
                                            dataTestId={card.dataTestId}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        </Row>
                    </Space.Compact>
                </Content>
                <FooterComponent handleResponseFeedbacks={handleFeedbacks} />
            </Layout>
            <ResultModal
                dataTestId={DataTestEnum.MODAL_NO_REVIEW}
                isModalOpen={isServerErrorModalOpen}
                status='500'
                title='Что-то пошло не так'
                subTitle='Произошла ошибка, попробуйте ещё раз.'
                resultClassName={styles.result}
                extra={
                    <Button
                        type='primary'
                        size='large'
                        htmlType='button'
                        className={styles.button}
                        onClick={serverErrorModalButtonHandler}
                    >
                        Назад
                    </Button>
                }
            />
        </Layout>
    );
};

export default MainPage;
