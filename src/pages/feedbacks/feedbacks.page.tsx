import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    FeedbackErrorSelector,
    FeedbackPendingSelector,
    FeedbackSelector,
} from './store/feedback.selector';
import { useAppSelector, history, AppDispatch } from '@redux/configure-store';
import { useLocation } from 'react-router-dom';

import cn from 'classnames';

import { SiderComponent } from '@components/Sider';
import { LottieLoader } from '@components/LottieLoader';
import { FeedbackCard } from '@components/FeedbackCard';
import { FeedbackModal } from '@components/FeedbackModal';
import { NoFeedbacks } from '@components/NoFeedbacks';

import { TCreateFeedback } from '@shared/types/create-feedback.type';
import { TCreateFeedbackResponse } from './types/createFeedbackResponse.type';

import { Layout, Row, Col, Space, Breadcrumb, Button } from 'antd';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

const { Content } = Layout;

import styles from './index.module.scss';
import { fetchCreateFeedback, fetchFeedbacks } from './store/feedback.actions';
import { ResultModal } from '@components/ResultModal';
import { AppRouteEnum } from '@constants/app-routes.enum';
import { PageEnum } from '@constants/pages.enum';

const items = [
    {
        path: AppRouteEnum.BASIC_MAIN,
        breadcrumbName: PageEnum.MAIN,
    },
    {
        path: AppRouteEnum.FEEDBACKS,
        breadcrumbName: PageEnum.FEEDBACKS,
    },
];

export const FeedbacksPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [isSiderOpened, setIsSidebarOpened] = useState(true);
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isServerErrorModalOpen, setIsServerErrorModalOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showAllFeedbacks, setShowAllFeedbacks] = useState(false);
    const fetchPending = useSelector(FeedbackPendingSelector);
    const fetchErrors = useSelector(FeedbackErrorSelector);
    const feedbacks = useAppSelector(FeedbackSelector);

    const feedbacksCopy = [...feedbacks];
    if (feedbacksCopy) {
        feedbacksCopy.sort(
            (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
    }

    const displayedFeedbacks = showAllFeedbacks
        ? feedbacksCopy
        : feedbacksCopy.slice(Math.max(feedbacksCopy.length - 4, 0));

    const handleShowAllFeedbacks = () => setShowAllFeedbacks(!showAllFeedbacks);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);

        if (fetchErrors && fetchErrors !== 403) {
            setIsServerErrorModalOpen(true);
        }

        window.addEventListener('resize', handleResize);

        dispatch(fetchFeedbacks());

        return () => window.removeEventListener('resize', handleResize);

    }, [dispatch, fetchErrors]);

    const location = useLocation();

    useEffect(() => {
        const isDirectAccess = !location.state || !location.state.fromServer;

        if (isDirectAccess) {
            history.push(AppRouteEnum.BASIC);
        }
    }, [location.state]);

    const handleResponseCreateFeedback = (
        response: TCreateFeedbackResponse,
        setIsSuccessModalOpen: (value: boolean) => void,
        setIsErrorModalOpen: (value: boolean) => void,
    ) => {
        if (response.meta.requestStatus === 'fulfilled') {
            setIsSuccessModalOpen(true);
            return true;
        } else {
            setIsErrorModalOpen(true);
        }
    };

    const handleFeedback = async (data: TCreateFeedback) => {
        const response = await dispatch(fetchCreateFeedback(data));
        dispatch(fetchFeedbacks());

        handleResponseCreateFeedback(response, setIsSuccessModalOpen, setIsErrorModalOpen);
    };

    const setFeedbackHandler = () => {
        setIsErrorModalOpen(false);
        setIsFeedbackModalOpen(true);
    }

    const serverErrorModalButtonHandler = () => {
        setIsServerErrorModalOpen(false);
        history.push('/main');
    }

    return (
        <Layout className={styles.mainLayout}>
            {fetchPending !== undefined && fetchPending === true && (
                <LottieLoader data-test-id='loader' />
            )}
            <SiderComponent
                isSiderOpened={isSiderOpened}
                setIsSidebarOpened={setIsSidebarOpened}
                windowWidth={windowWidth}
            />
            <Layout className={styles.contentWrapper}>
                <Breadcrumb
                    routes={items}
                    className={styles.breadcrumbs}
                    separator={<span className={styles.separator}>/</span>}
                />
                <Content
                    className={cn(
                        styles.contentStyles,
                        feedbacks.length > 0 ? null : styles.noFeedback,
                        displayedFeedbacks.length < 5 ? styles.fourFeedbacks : styles.allFeedbacks,
                    )}
                >
                    {feedbacks.length > 0 ? (
                        <>
                            <Space.Compact className={styles.containerStyles} direction='vertical'>
                                <Swiper
                                    direction={'vertical'}
                                    slidesPerView={'auto'}
                                    freeMode={true}
                                    mousewheel={true}
                                    modules={[FreeMode, Mousewheel]}
                                    className={styles.swiper}
                                >
                                    <SwiperSlide className={styles.swiperSlide}>
                                        {displayedFeedbacks.reverse().map((feedback) => (
                                            <FeedbackCard
                                                key={feedback.id}
                                                fullName={feedback.fullName}
                                                imageSrc={feedback.imageSrc}
                                                message={feedback.message}
                                                rating={feedback.rating}
                                                createdAt={feedback.createdAt}
                                            />
                                        ))}
                                    </SwiperSlide>
                                </Swiper>
                            </Space.Compact>
                        </>
                    ) : (
                        <NoFeedbacks setIsFeedbackModalOpen={setIsFeedbackModalOpen} />
                    )}
                </Content>
                {feedbacks.length > 0 ? (
                    <Row gutter={8} className={styles.buttons}>
                        <Col>
                            <Button
                                type='primary'
                                size='large'
                                className={cn(styles.button, styles.primaryButton)}
                                onClick={() => setIsFeedbackModalOpen(true)}
                                data-test-id='write-review'
                                block
                            >
                                Написать отзыв
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                type='text'
                                size='large'
                                onClick={handleShowAllFeedbacks}
                                className={cn(styles.button, styles.textButton)}
                                data-test-id='all-reviews-button'
                                block
                            >
                                {showAllFeedbacks ? 'Свернуть все отзывы' : 'Развернуть все отзывы'}
                            </Button>
                        </Col>
                    </Row>
                ) : null}
            </Layout>
            <FeedbackModal
                setIsFeedbackModalOpen={setIsFeedbackModalOpen}
                isFeedbackModalOpen={isFeedbackModalOpen}
                handleFeedback={handleFeedback}
            />
            <ResultModal
                isModalOpen={isSuccessModalOpen}
                status='success'
                title='Отзыв успешно опубликован'
                subTitle={null}
                resultClassName={styles.result}
                button={
                    <Button
                        type='primary'
                        size='large'
                        htmlType='button'
                        className={styles.button}
                        onClick={() => setIsSuccessModalOpen(false)}
                        block
                    >
                        Отлично
                    </Button>
                }
            />
            <ResultModal
                isModalOpen={isErrorModalOpen}
                status='error'
                title='Данные не сохранились'
                subTitle='Что-то пошло не так. Попробуйте ещё раз.'
                resultClassName={styles.result}
                button={
                    <Row className={styles.errorButtons} gutter={8}>
                        <Col span={12}>
                            <Button
                                type='primary'
                                size='large'
                                htmlType='button'
                                className={cn(styles.button, styles.errorButton)}
                                onClick={setFeedbackHandler}
                                data-test-id='write-review-not-saved-modal'
                                block
                            >
                                Написать отзыв
                            </Button>
                        </Col>
                        <Col span={12}>
                            <Button
                                size='large'
                                htmlType='button'
                                className={cn(styles.button, styles.errorButton)}
                                onClick={() => setIsErrorModalOpen(false)}
                                block
                            >
                                Закрыть
                            </Button>
                        </Col>
                    </Row>
                }
            />
            <ResultModal
                isModalOpen={isServerErrorModalOpen}
                status='500'
                title='Что-то пошло не так'
                subTitle='Произошла ошибка, попробуйте ещё раз.'
                resultClassName={styles.result}
                button={
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
