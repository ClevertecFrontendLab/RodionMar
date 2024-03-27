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
import { ModalAlert } from '@components/ModalAlert';
import { GetResponse } from '@shared/types/getResponse.type';
import { BadgeComponent } from '@components/Badge';
import { TrainingName } from '@shared/types/training-name.type';
import { TrainingListModal } from '@components/TrainingsListModal';
import { TrainingResponse } from '@shared/types/training-response.type';
import { TrainingRequest } from '@shared/types/training-request.type';
import { DateFormatEnum } from '../../constants/date-formats.enum';
import { fetchTariffList } from '@pages/settings/store/settings.actions';
import { DataTestEnum } from '@constants/data-tests.enum';

export const CalendarPage = () => {
    const [isSiderOpened, setIsSidebarOpened] = useState(false);
    const [isTrainingListModalOpened, setIsTrainingListModalOpened] = useState(false);
    const [value, setValue] = useState<Moment>(moment);
    const [selectedValue, setSelectedValue] = useState<Moment>();
    const [selectedCellTrainings, setSelectedCellTrainings] = useState<TrainingResponse[]>([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isServerErrorModalOpen, setIsServerErrorModalOpen] = useState(false);
    const [isSaveDataErrorModalOpen, setIsSaveDataErrorModalOpen] = useState(false);
    const [mobileTrainingListCoordinate, setmobileTrainingListCoordinate] = useState<number>();
    const [prevTrainings, setPrevTrainings] = useState<TrainingResponse[]>([]);
    const [selectedMonth, setSelectedMonth] = useState(moment().startOf('month').month());
    const dispatch = useAppDispatch();
    const trainings = useAppSelector(TrainingsSelector);
    const trainingsCatalog = useAppSelector(TrainingsCatalogSelector);
    const fetchPending = useSelector(TrainingPendingSelector);

    useEffect(() => {
        setPrevTrainings(trainings);
    }, [trainings]);

    const handleResponseTrainingsCatalog = useCallback(
        (response: GetResponse) => {
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

        const responseData: GetResponse = {
            meta: response.meta,
            payload: response.payload,
        };

        handleResponseTrainingsCatalog(responseData);
    }, [dispatch, handleResponseTrainingsCatalog]);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);

        handleTrainingsCatalog();

        return () => window.removeEventListener('resize', handleResize);
    }, [handleTrainingsCatalog]);

    useEffect(() => {
        handleTrainingsCatalog();
    }, [handleTrainingsCatalog]);

    const formattedDateForQuerySelector = selectedValue
        ? selectedValue.format(DateFormatEnum.QUERY_SELECTOR)
        : undefined;
    const formattedDateTitle = selectedValue ? selectedValue.format(DateFormatEnum.TITLE) : '';

    const calendarCell: HTMLElement | null = document.querySelector(
        `[title="${formattedDateForQuerySelector}"]`,
    );
    useEffect(() => {
        const calendarCellCoordinates = calendarCell?.getBoundingClientRect();

        if (calendarCellCoordinates) {
            setmobileTrainingListCoordinate(
                calendarCellCoordinates?.y - 8 + calendarCellCoordinates?.height,
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
            const listData: TrainingResponse[] = [];

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
        if (selectedValue && isTrainingListModalOpened && prevTrainings !== trainings) {
            onSelect(selectedValue);
            handleSetTrainingListModal();
        }
    }, [
        trainings,
        prevTrainings,
        selectedValue,
        isTrainingListModalOpened,
        onSelect,
        handleSetTrainingListModal,
    ]);

    const onPanelChange = (newDate: Moment) => {
        const newMonth = newDate.month();
        setSelectedMonth(newMonth);
    };

    const getListData = (value: Moment) => {
        const listData: { name: TrainingName }[] = [];
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

    const cellClickHandler = (
        date: Moment,
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        onSelect(date);
        handleSetTrainingListModal();
        event.stopPropagation();
    };

    const mobileCellClickHandler = (date: Moment) => {
        onSelect(date);
        selectedMonth === date.month() ? handleSetTrainingListModal() : null;
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
                onClick={(event) => cellClickHandler(date, event)}
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
                onClick={() => mobileCellClickHandler(date)}
            >
                {dayOfMonth}
            </div>
        );
    };

    const handleResponseTraining = (
        response: Pick<GetResponse, 'meta'> & { payload: TrainingResponse | string },
    ) => {
        if (response.meta.requestStatus === 'fulfilled') {
            dispatch(fetchTrainings());
            return true;
        } else {
            setIsTrainingListModalOpened(false);
            setIsSaveDataErrorModalOpen(true);
        }
    };

    const handleCreateTraining = async (data: TrainingRequest) => {
        const response = await dispatch(createTraining(data));

        const reponseData = {
            meta: response.meta,
            payload: response.payload as TrainingResponse | string,
        };

        handleResponseTraining(reponseData);
    };

    const handleUpdateTraining = async (data: TrainingRequest) => {
        const response = await dispatch(updateTraining(data));

        const reponseData = {
            meta: response.meta,
            payload: response.payload as TrainingResponse | string,
        };

        handleResponseTraining(reponseData);
    };

    const serverErrorModalCloseHandler = () => {
        dispatch(clearErrors());
        setIsServerErrorModalOpen(false);
    };

    const serverErrorModalButtonHandler = () => {
        dispatch(clearErrors());
        handleTrainingsCatalog();
        setIsServerErrorModalOpen(false);
    };

    const saveDataErrorModalHandler = () => {
        dispatch(clearErrors());
        setIsSaveDataErrorModalOpen(false);
    };

    const handleClickSettingsButton = async () => {
        const response = await dispatch(fetchTariffList());
        if (response) history.push(AppRouteEnum.SETTINGS, { fromServer: true });
    };

    return (
        <Layout className={styles.mainLayout}>
            {fetchPending !== undefined && fetchPending === true && <LottieLoader />}
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
                                        <a onClick={() => history.push(AppRouteEnum.BASIC_MAIN)}>
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
                                    onClick={handleClickSettingsButton}
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
            <ModalAlert
                dataTestId={DataTestEnum.MODAL_NO_REVIEW}
                isModalOpen={isServerErrorModalOpen}
                type='info'
                message='При открытии данных произошла ошибка'
                description='Попробуйте ещё раз.'
                icon={<CloseCircleOutlined />}
                onCloseHandler={serverErrorModalCloseHandler}
                button={
                    <Button
                        data-test-id={DataTestEnum.MODAL_ERROR_USER_TRAINING_BUTTON}
                        type='primary'
                        size='large'
                        htmlType='button'
                        className={styles.button}
                        onClick={serverErrorModalButtonHandler}
                    >
                        Главная
                    </Button>
                }
            />
            <ModalAlert
                isModalOpen={isSaveDataErrorModalOpen}
                type='error'
                message='При сохранении данных произошла ошибка'
                description='Придётся попробовать ещё раз'
                icon={<CloseCircleOutlined />}
                closable={false}
                onCloseHandler={saveDataErrorModalHandler}
                button={
                    <Button
                        data-test-id={DataTestEnum.MODAL_ERROR_USER_TRAINING_BUTTON}
                        type='primary'
                        size='large'
                        htmlType='button'
                        className={styles.button}
                        onClick={saveDataErrorModalHandler}
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
                    isTrainingListModalOpened && windowWidth > 480
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
