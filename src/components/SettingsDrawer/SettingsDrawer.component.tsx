import { Button, Col, Drawer, Form, Radio, Row, Space, Typography } from 'antd';
import styles from './index.module.scss';
import { CheckCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { TTarifRequest } from '@shared/types/tarif-request.type';
import { TTarifListPeriod } from '@shared/types/tarif-list-period.type';
import { SettingsFeatureItem } from '@components/SettingsFeatureItem';
import { ProfileSelector } from '@pages/profile/store/profile.selector';
import { useSelector } from 'react-redux';
import { DataTestEnum } from '@constants/data-tests.enum';

type TSettingsDrawerComponentProps = {
    isOpened: boolean;
    setIsOpened: (value: boolean) => void;
    chooseAndPayHandler: (data: TTarifRequest) => void;
    tarifTransferData: { _id: string; periods: TTarifListPeriod[] };
    formatDate: (dateString: string) => string;
};

const { Text } = Typography;

export const SettingsDrawerComponent = ({
    isOpened,
    setIsOpened,
    chooseAndPayHandler,
    tarifTransferData,
    formatDate,
}: TSettingsDrawerComponentProps) => {
    const [form] = Form.useForm();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isChooseAndPayButtonDisabled, setIsChooseAndPayButtonDisabled] = useState(true);
    const [days, setDays] = useState<TTarifRequest>();
    const profile = useSelector(ProfileSelector);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const closeDrawerHandler = () => {
        setIsOpened(false);
        setIsChooseAndPayButtonDisabled(true);
    };

    const handleChooseAndPayButton = () => {
        if (days) chooseAndPayHandler(days);
        closeDrawerHandler();
    };

    const handleRadioChange = (days: number) => {
        setIsChooseAndPayButtonDisabled(false);

        const data = {
            tariffId: tarifTransferData._id,
            days: days,
        };

        setDays(data);
    };

    const featureItemsData = [
        { title: 'Статистика за месяц', includeInFree: true, includeInPro: true },
        { title: 'Статистика за всё время', includeInFree: false, includeInPro: true },
        { title: 'Совместные тренировки', includeInFree: true, includeInPro: true },
        { title: 'Участие в марафонах', includeInFree: false, includeInPro: true },
        { title: 'Приложение iOS', includeInFree: false, includeInPro: true },
        { title: 'Приложение Android', includeInFree: false, includeInPro: true },
        { title: 'Индивидуальный Chat GPT', includeInFree: false, includeInPro: true },
    ];

    const featureList = featureItemsData.map((item, index) => (
        <SettingsFeatureItem
            key={index}
            title={item.title}
            includeInFree={item.includeInFree}
            includeInPro={item.includeInPro}
        />
    ));

    return (
        <Drawer
            open={isOpened}
            title='Сравнить тарифы'
            destroyOnClose
            mask={false}
            closable
            headerStyle={{ flexDirection: 'row-reverse' }}
            onClose={closeDrawerHandler}
            className={styles.drawer}
            width={408}
            placement={windowWidth > 480 ? 'right' : 'bottom'}
            closeIcon={<CloseOutlined />}
            zIndex={9}
            data-test-id={DataTestEnum.TARIFF_SIDER}
            footer={
                profile?.tariff ? null : (
                    <Button
                        type='primary'
                        size='large'
                        htmlType='button'
                        className={styles.button}
                        block
                        onClick={handleChooseAndPayButton}
                        disabled={isChooseAndPayButtonDisabled}
                        data-test-id={DataTestEnum.TARIFF_SUBMIT}
                    >
                        Выбрать и оплатить
                    </Button>
                )
            }
        >
            {profile?.tariff ? (
                <Row className={styles.proTarifLabel}>
                    <Col span={24}>Ваш PRO tarif {formatDate(profile.tariff.expired)}</Col>
                </Row>
            ) : null}
            <Row className={styles.contentWrapper}>
                <Row justify='end' className={styles.tarifsWrapper}>
                    <Col>FREE</Col>
                    <Col>
                        PRO
                        {profile?.tariff ? <CheckCircleOutlined /> : null}
                    </Col>
                </Row>
                <Space
                    direction='vertical'
                    size={windowWidth > 480 ? 'middle' : 'small'}
                    className={styles.featureList}
                >
                    {featureList}
                </Space>
                {!profile?.tariff ? (
                    <Row>
                        <Form form={form} className={styles.form} layout='vertical'>
                            <Row className={styles.tarifCostsTitle}>
                                <Col>
                                    <Text>Стоимость тарифа</Text>
                                </Col>
                            </Row>
                            <Form.Item name='tarif-costs' className={styles.formItem}>
                                <Row
                                    justify='space-between'
                                    data-test-id={DataTestEnum.TARIFF_COST}
                                >
                                    <Col>
                                        <Space
                                            direction='vertical'
                                            size={windowWidth > 480 ? 16 : 4}
                                            className={styles.periodTextSpace}
                                        >
                                            {tarifTransferData.periods.map((period, id) => (
                                                <Row key={`period_${id}`}>
                                                    <Col span={24} className={styles.periodTextCol}>
                                                        {period.text}
                                                    </Col>
                                                </Row>
                                            ))}
                                        </Space>
                                    </Col>

                                    <Col>
                                        <Row className={styles.costRow}>
                                            <Col>
                                                <Space
                                                    direction='vertical'
                                                    size={windowWidth > 480 ? 16 : 4}
                                                >
                                                    {tarifTransferData.periods.map((period, id) => (
                                                        <Row key={`cost${id}`}>
                                                            <Col
                                                                span={24}
                                                                className={styles.costCol}
                                                            >
                                                                {period.cost
                                                                    .toString()
                                                                    .replace('.', ',')}{' '}
                                                                $
                                                            </Col>
                                                        </Row>
                                                    ))}
                                                </Space>
                                            </Col>
                                            <Col>
                                                <Space direction='vertical'>
                                                    <Radio.Group className={styles.radioGroup}>
                                                        {tarifTransferData.periods.map(
                                                            (period, id) => (
                                                                <Row key={`radio_${id}`}>
                                                                    <Col
                                                                        span={24}
                                                                        className={styles.radioCol}
                                                                    >
                                                                        <Radio
                                                                            value={period.days}
                                                                            onChange={() =>
                                                                                handleRadioChange(
                                                                                    period.days,
                                                                                )
                                                                            }
                                                                            data-test-id={`tariff-${period.cost}`}
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            ),
                                                        )}
                                                    </Radio.Group>
                                                </Space>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Form>
                    </Row>
                ) : null}
            </Row>
        </Drawer>
    );
};
