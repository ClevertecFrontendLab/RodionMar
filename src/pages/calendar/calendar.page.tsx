import { useSelector } from 'react-redux';
import { history, useAppDispatch, useAppSelector } from '@redux/configure-store';
import { calendarLocale } from './calendar.locale';
import cn from 'classnames';

import { SiderComponent } from '@components/Sider';
import { LottieLoader } from '@components/LottieLoader';

import { Layout, Row, Col, Typography, Breadcrumb, Button, Calendar, Space } from 'antd';

const { Content } = Layout;
const { Text } = Typography;

import styles from './index.module.scss';
import { AppRouteEnum } from '@constants/app-routes.enum';
import {
    TrainingPendingSelector,
    TrainingsCatalogSelector,
    TrainingsSelector,
} from './store/training.selector';
import { useCallback, useEffect, useState } from 'react';
import { CloseCircleOutlined, SettingOutlined } from '@ant-design/icons';

import moment, { Moment } from 'moment';
import {
    createTraining,
    fetchTrainings,
    fetchTrainingsCatalog,
    updateTraining,
} from './store/training.actions';
import { clearErrors } from './store/training.slice';
import { CalendarAlert } from '@components/CalendarAlert';
import { TGetResponse } from '@shared/types/getResponse.type';
import { BadgeComponent } from '@components/Badge';
import { TTrainingName } from '@shared/types/training-name.type';
import { TrainingListModal } from '@components/TrainingsListModal';
import { TTrainingResponse } from '@shared/types/training-response.type';
import { TTrainingRequest } from '@shared/types/training-request.type';

export const CalendarPage = () => {
    const [isSiderOpened, setIsSidebarOpened] = useState(false);
    const [isTrainingListModalOpened, setIsTrainingListModalOpened] = useState(false);
    const [value, setValue] = useState<Moment>(moment);
    const [selectedValue, setSelectedValue] = useState<Moment>();
    const [selectedCellTrainings, setSelectedCellTrainings] = useState<TTrainingResponse[]>([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isServerErrorModalOpen, setIsServerErrorModalOpen] = useState(false);
    const [isSaveDataErrorModalOpen, setIsSaveDataErrorModalOpen] = useState(false);
    const [mobileTrainingListCoordinate, setmobileTrainingListCoordinate] = useState<number>();
    const [selectedMonth, setSelectedMonth] = useState(moment().startOf('month').month());
    const dispatch = useAppDispatch();
    const trainings = useAppSelector(TrainingsSelector);
    const trainingsCatalog = useAppSelector(TrainingsCatalogSelector);
    const fetchPending = useSelector(TrainingPendingSelector);

    const handleResponseTrainingsCatalog = useCallback(
        (response: TGetResponse) => {
            if (response.meta.requestStatus === 'fulfilled') {
                return true;
            } else {
                setIsServerErrorModalOpen(true);
            }
        },
        [setIsServerErrorModalOpen],
    );

    const handleTrainingsCatalog = useCallback(async () => {
        const response = await dispatch(fetchTrainingsCatalog());

        const responseData: TGetResponse = {
            meta: response.meta,
            payload: response.payload,
        };

        handleResponseTrainingsCatalog(responseData);
    }, [dispatch, handleResponseTrainingsCatalog]);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        handleTrainingsCatalog();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleTrainingsCatalog]);

    useEffect(() => {
        handleTrainingsCatalog();
    }, [handleTrainingsCatalog]);

    const formattedDateForQuerySelector = selectedValue
        ? selectedValue.format('YYYY-MM-DD')
        : undefined;
    const formattedDateTitle = selectedValue ? selectedValue.format('YYYY.MM.DD') : '';

    const calendarCell: HTMLElement | null = document.querySelector(
        `[title="${formattedDateForQuerySelector}"]`,
    );
    useEffect(() => {
        const calendarCellCoordinates = calendarCell?.getBoundingClientRect();
        if (calendarCellCoordinates) {
            setmobileTrainingListCoordinate(
                calendarCellCoordinates?.y + calendarCellCoordinates?.height,
            );
        }
    }, [calendarCell]);

    const handleSetTrainingListModal = useCallback(() => {
        if (isTrainingListModalOpened) {
            setIsTrainingListModalOpened(false);
            setTimeout(() => {
                setIsTrainingListModalOpened(true);
            }, 0);
        } else {
            setIsTrainingListModalOpened(true);
        }
    }, [isTrainingListModalOpened, setIsTrainingListModalOpened]);

    const onSelect = useCallback(
        (newValue: Moment) => {
            const listData: TTrainingResponse[] = [];

            trainings.forEach((training) => {
                const trainingDate = moment(training.date);
                if (newValue.isSame(trainingDate, 'day')) {
                    listData.push(training);
                }
            });
            setSelectedCellTrainings(listData);

            setSelectedValue(newValue);
        },
        [trainings, setSelectedCellTrainings, setSelectedValue],
    );

    useEffect(() => {
        if (selectedValue && isTrainingListModalOpened) {
            onSelect(selectedValue);
            handleSetTrainingListModal();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trainings]);

    const onPanelChange = (newDate: Moment) => {
        const newMonth = newDate.month();
        setSelectedMonth(newMonth);
    };

    const getListData = (value: Moment) => {
        const listData: { name: TTrainingName }[] = [];
        trainings.forEach((training) => {
            const trainingDate = moment(training.date);
            if (value.isSame(trainingDate, 'day')) {
                listData.push({
                    name: training.name,
                });
            }
        });
        return listData;
    };

    const dateFullCellRender = (date: Moment) => {
        const listData = getListData(date);
        const dayOfMonth = date.date();
        const hasTraining = trainings.some((trainings) =>
            moment(trainings.date).isSame(date, 'day'),
        );
        return windowWidth > 481 ? (
            <div
                className='ant-picker-cell-inner ant-picker-calendar-date'
                onClick={(e) => {
                    onSelect(date);
                    handleSetTrainingListModal();
                    e.stopPropagation();
                }}
            >
                <div className='ant-picker-calendar-date-value'>{dayOfMonth}</div>
                <div className={'ant-picker-calendar-date-content'}>
                    <Row>
                        <Space.Compact direction='vertical'>
                            {listData.map((item, index) => (
                                <BadgeComponent key={index} name={item.name} />
                            ))}
                        </Space.Compact>
                    </Row>
                </div>
            </div>
        ) : (
            <div
                className={cn(styles.day, hasTraining ? styles.dayWithTraining : null)}
                onClick={() => {
                    onSelect(date);
                    selectedMonth === date.month() ? handleSetTrainingListModal() : null;
                }}
            >
                {dayOfMonth}
            </div>
        );
    };

    const handleResponseTraining = (
        response: Pick<TGetResponse, 'meta'> & { payload: TTrainingResponse | string },
    ) => {
        if (response.meta.requestStatus === 'fulfilled') {
            dispatch(fetchTrainings());
            return true;
        } else {
            setIsTrainingListModalOpened(false);
            setIsSaveDataErrorModalOpen(true);
        }
    };

    const handleCreateTraining = async (data: TTrainingRequest) => {
        const response = await dispatch(createTraining(data));

        const reponseData = {
            meta: response.meta,
            payload: response.payload as TTrainingResponse | string,
        };

        handleResponseTraining(reponseData);
    };

    const handleUpdateTraining = async (data: TTrainingRequest) => {
        const response = await dispatch(updateTraining(data));

        const reponseData = {
            meta: response.meta,
            payload: response.payload as TTrainingResponse | string,
        };

        handleResponseTraining(reponseData);
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
                activeMenuItemKey='1'
            />
            <Layout className={styles.contentWrapper}>
                <Content className={cn(styles.contentStyles)}>
                    <Row className={styles.headWrapper}>
                        <Row>
                            <Col>
                                <Breadcrumb className={styles.breadcrumbs}>
                                    <Breadcrumb.Item>
                                        <a
                                            onClick={() => {
                                                history.push(AppRouteEnum.BASIC_MAIN);
                                            }}
                                        >
                                            Главная
                                        </a>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>Календарь</Breadcrumb.Item>
                                </Breadcrumb>
                            </Col>
                        </Row>
                        <Row justify='end'>
                            <Col>
                                <Button
                                    className={styles.settingButtonStyles}
                                    type='text'
                                    icon={<SettingOutlined className={styles.settingIconStyles} />}
                                    size='large'
                                >
                                    <Text className={styles.settingTextStyles}>Настройки</Text>
                                </Button>
                            </Col>
                        </Row>
                    </Row>

                    <Calendar
                        value={value}
                        onPanelChange={onPanelChange}
                        locale={calendarLocale}
                        className={cn(styles.calendar)}
                        fullscreen={windowWidth < 481 ? false : true}
                        dateFullCellRender={dateFullCellRender}
                        onChange={(date) => setValue(date)}
                    />
                </Content>
            </Layout>
            <CalendarAlert
                dataTestId='modal-no-review'
                isModalOpen={isServerErrorModalOpen}
                type='info'
                message='При открытии данных произошла ошибка'
                description='Попробуйте ещё раз.'
                icon={<CloseCircleOutlined />}
                onCloseHandler={() => {
                    dispatch(clearErrors());
                    setIsServerErrorModalOpen(false);
                }}
                button={
                    <Button
                        data-test-id='modal-error-user-training-button'
                        type='primary'
                        size='large'
                        htmlType='button'
                        className={styles.button}
                        onClick={() => {
                            dispatch(clearErrors());
                            handleTrainingsCatalog();
                            setIsServerErrorModalOpen(false);
                        }}
                    >
                        Главная
                    </Button>
                }
            />
            <CalendarAlert
                isModalOpen={isSaveDataErrorModalOpen}
                type='error'
                message='При сохранении данных произошла ошибка'
                description='Придётся попробовать ещё раз'
                icon={<CloseCircleOutlined />}
                closable={false}
                onCloseHandler={() => {
                    dispatch(clearErrors());
                    setIsSaveDataErrorModalOpen(false);
                }}
                button={
                    <Button
                        data-test-id='modal-error-user-training-button'
                        type='primary'
                        size='large'
                        htmlType='button'
                        className={styles.button}
                        onClick={() => {
                            dispatch(clearErrors());
                            setIsSaveDataErrorModalOpen(false);
                            handleSetTrainingListModal();
                        }}
                    >
                        Закрыть
                    </Button>
                }
            />
            <TrainingListModal
                date={formattedDateTitle}
                setIsModalOpened={setIsTrainingListModalOpened}
                isModalOpen={isTrainingListModalOpened}
                getContainer={
                    windowWidth > 480
                        ? calendarCell
                            ? calendarCell
                            : document.body
                        : document.body
                }
                modalClassname={styles.modalWrapper}
                listOfTrainings={selectedCellTrainings}
                trainingsCatalog={trainingsCatalog}
                handleCreateTraining={handleCreateTraining}
                handleUpdateTraining={handleUpdateTraining}
                mobileTrainingListCoordinate={windowWidth < 481 ? mobileTrainingListCoordinate : 0}
                transitionStep={isSaveDataErrorModalOpen ? 0 : null}
                isSaveDataErrorModalOpen={isSaveDataErrorModalOpen}
            />
        </Layout>
    );
};
