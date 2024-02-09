// ==================== Ant Design ====================
import { Layout, Row, Col, Typography, Space } from 'antd';

// ==================== Components ====================
import HeaderComponent from '@components/Header';
import ActionCard from '@components/ActionCard';
import FooterComponent from '@components/Footer';
import SiderComponent from '@components/Sider';

// ==================== Styles ====================
import styles from "./index.module.scss";

// ==================== Static data ====================
import { cards } from './const';


const { Content } = Layout;
const { Title } = Typography;


export const MainPage = () => {
    return (
        <Layout className={styles.mainLayout}>
            <SiderComponent />
            <Layout className={styles.contentWrapper}>
                <HeaderComponent />
                <Content className={styles.contentStyles}>
                    <Space.Compact className={styles.containerStyles} direction="vertical">
                        <Row>
                            <Col className={styles.possibilitiesTextStyles}>
                                {"С CleverFit ты сможешь: — планировать свои тренировки на календаре, выбирая тип и уровень нагрузки; — отслеживать свои достижения в разделе статистики, сравнивая свои результаты с нормами и рекордами; — создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы о тренировках; — выполнять расписанные тренировки для разных частей тела, следуя подробным инструкциям и советам профессиональных тренеров.".split('—').map((str, idx) => <span key={idx}> {idx != 0 ? '—' : ''} {str} <br /> </span>)}
                            </Col>
                        </Row>
                        <Row className={styles.helperWrapperStyles}>
                            <Col>
                                <Title level={4} className={styles.helperTitleStyles}>
                                    CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!
                                </Title>
                            </Col>
                            <Space.Compact className={styles.cardWrapperStyles}>
                                {cards.map((card, index) => (
                                    <ActionCard key={index} title={card.title} buttonText={card.buttonText} buttonIcon={card.buttonIcon} />
                                ))}
                            </Space.Compact>
                        </Row>
                    </Space.Compact>
                </Content>
                <FooterComponent />
            </Layout>
        </Layout>
    );
};