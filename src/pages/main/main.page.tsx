import { useEffect, useState } from 'react';
import { AppDispatch, history } from '@redux/configure-store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeedbacks } from '@pages/feedbacks/store/feedback.actions';
import { FeedbackPendingSelector } from '@pages/feedbacks/store/feedback.selector';

import { Layout, Row, Col, Typography, Space } from 'antd';

import HeaderComponent from '@components/Header';
import ActionCard from '@components/ActionCard';
import FooterComponent from '@components/Footer';
import SiderComponent from '@components/Sider';
import LottieLoader from '@components/LottieLoader/LottieLoader';

import styles from "./index.module.scss";

import { cards } from './const';


const { Content } = Layout;
const { Title } = Typography;

export const handleResponseFeedbacks = (
    response: any,
) => {
    if (response.payload.status === 200) {
        history.push("/feedbacks", { fromServer: true });
        return true;
    } else {
        switch (response.payload.status) {
            case 403:
                localStorage.removeItem("token");
                history.push("/auth");
                break;
            default:
                history.push("/feedbacks", { fromServer: true });
                break;
        }
    }
};

const MainPage = () => {
    const [isSiderOpened, setIsSidebarOpened] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const dispatch = useDispatch<AppDispatch>();
    const fetchPending = useSelector(FeedbackPendingSelector);


    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleFeedbacks = async () => {
        const response = await dispatch(fetchFeedbacks());
        handleResponseFeedbacks(response);
    };

    return (
        <Layout className={styles.mainLayout}>
            {fetchPending !== undefined && fetchPending === true && (
                <LottieLoader data-test-id='loader' />
            )}
            <SiderComponent isSiderOpened={isSiderOpened} setIsSidebarOpened={setIsSidebarOpened} windowWidth={windowWidth} />
            <Layout className={styles.contentWrapper}>
                <HeaderComponent isSiderOpened={isSiderOpened} windowWidth={windowWidth} />
                <Content className={styles.contentStyles}>
                    <Space.Compact className={styles.containerStyles} direction="vertical">
                        <Row>
                            <Col className={styles.possibilitiesTextStyles} span={24}>
                                {"С CleverFit ты сможешь: — планировать свои тренировки на календаре, выбирая тип и уровень нагрузки; — отслеживать свои достижения в разделе статистики, сравнивая свои результаты с нормами и рекордами; — создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы о тренировках; — выполнять расписанные тренировки для разных частей тела, следуя подробным инструкциям и советам профессиональных тренеров.".split('—').map((str, idx) => <span key={idx}> {idx != 0 ? '—' : ''} {str} <br /> </span>)}
                            </Col>
                        </Row>
                        <Row className={styles.helperWrapperStyles}>
                            <Col span={24}>
                                <Title level={4} className={styles.helperTitleStyles}>
                                    CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!
                                </Title>
                            </Col>
                            <Row className={styles.cardWrapperStyles} gutter={16}>
                                {cards.map((card, index) => (
                                    <Col span={8} className={styles.card} key={index}>
                                        <ActionCard key={index} title={card.title} buttonText={card.buttonText} buttonIcon={card.buttonIcon} />
                                    </Col>
                                ))}
                            </Row>
                        </Row>
                    </Space.Compact>
                </Content>
                <FooterComponent handleResponseFeedbacks={handleFeedbacks} />
            </Layout>
        </Layout>
    );
};

export default MainPage;