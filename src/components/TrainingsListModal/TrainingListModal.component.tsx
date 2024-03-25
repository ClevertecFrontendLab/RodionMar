import { Card, Modal, Button, Empty, Space, Row, Col, PageHeader, Select, Typography } from 'antd';

import { BadgeComponent } from '@components/Badge';

import cn from 'classnames';

import styles from './index.module.scss';
import { TTrainingResponse } from '@shared/types/training-response.type';
import { EditOutlined, PlusOutlined, ArrowLeftOutlined, CloseOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useState } from 'react';
import { TTrainingCatalogItem } from '@shared/types/training-catalog-item.type';
import { TTrainingName } from '@shared/types/training-name.type';
import { CalendarDrawerComponent } from '@components/CalendarDrawer';
import { TTrainingRequest } from '@shared/types/training-request.type';
import { DrawerNameEnum } from '@constants/drawer-name.type';
import moment from 'moment';

const { Text } = Typography;

type TTrainingListModalProps = {
    isModalOpen: boolean;
    setIsModalOpened: (value: boolean) => void;
    date: string;
    listOfTrainings?: TTrainingResponse[];
    getContainer: HTMLElement;
    modalClassname?: string;
    trainingsCatalog: TTrainingCatalogItem[];
    handleCreateTraining: (data: TTrainingRequest) => void;
    handleUpdateTraining: (data: TTrainingRequest) => void;
    mobileTrainingListCoordinate: number | undefined;
    transitionStep: 0 | null;
    isSaveDataErrorModalOpen: boolean;
};

type TSelectOption = {
    value: string;
    label: string;
};

export const TrainingListModal = ({
    isModalOpen,
    setIsModalOpened,
    date,
    listOfTrainings = [],
    getContainer,
    modalClassname,
    trainingsCatalog,
    handleCreateTraining,
    handleUpdateTraining,
    mobileTrainingListCoordinate,
    transitionStep,
    isSaveDataErrorModalOpen,
}: TTrainingListModalProps) => {
    const [step, setStep] = useState<1 | 2>(1);
    const [closable, setClosable] = useState(true);
    const [selectedOption, setSelectedOption] = useState<TTrainingName | null>(null);
    const [selectOptions, setSelectOptions] = useState<TSelectOption[]>([]);
    const [isDrawerOpened, setIsDrawerOpened] = useState(false);
    const [drawerType, setDrawerType] = useState<DrawerNameEnum>(DrawerNameEnum.CREATE);
    const [requestTrainingObject, setRequestTrainingObject] = useState<TTrainingRequest | null>(
        null,
    );
    const [updateTraining, setUpdateTraining] = useState<TTrainingRequest | null>(null);

    const isPastDate = (dateString: string): boolean => {
        const selectedDate = moment.utc(dateString, 'YYYY-MM-DD');
        const currentDate = moment.utc();
        return selectedDate.isBefore(currentDate);
    };

    const handleSetStep = (step: 1 | 2) => {
        setStep(step);
        if (step === 1) {
            setClosable(true);
        } else {
            setClosable(false);
        }
    };
    const handleSetClosable = (value: boolean) => {
        setClosable(value);
    };
    const handleSetSelectedOption = (value: TTrainingName) => {
        setSelectedOption(value);
    };

    useEffect(() => {
        if (transitionStep) setStep(transitionStep);
        if (!isModalOpen || isSaveDataErrorModalOpen) {
            handleSetStep(1);
            handleSetClosable(true);
            setIsDrawerOpened(false);
            setSelectedOption(null);
            setRequestTrainingObject(null);
            setUpdateTraining(null);
        }
    }, [isModalOpen, transitionStep, isSaveDataErrorModalOpen]);

    const handleSelectOptions = useCallback(
        (addOption: TSelectOption | null = null, isFuture = true) => {
            let filteredOptions: TTrainingCatalogItem[] | TTrainingResponse[] = [];

            if (isFuture) {
                filteredOptions = trainingsCatalog.filter(
                    (catalogItem) =>
                        !listOfTrainings.some((training) => training.name === catalogItem.name),
                );
            } else {
                filteredOptions = listOfTrainings.filter((training) => !training.isImplementation);
            }

            const options = filteredOptions.map((option) => ({
                value: option.name,
                label: option.name,
            }));

            if (addOption && !options.some((option) => option.value === addOption.value)) {
                options.push(addOption);
            }

            setSelectOptions(options);
        },
        [trainingsCatalog, listOfTrainings],
    );

    useEffect(() => {
        handleSelectOptions();
    }, [trainingsCatalog, listOfTrainings, handleSelectOptions]);

    const createTrainingHandler = () => {
        handleSetStep(2);
        setRequestTrainingObject(null);
        handleSelectOptions();
        setSelectedOption(null);
    };

    const addExerciseHandler = () => {
        setIsDrawerOpened(true);
        setDrawerType(DrawerNameEnum.CREATE);
    };

    const saveHandler = () => {
        requestTrainingObject && requestTrainingObject.name === selectedOption
            ? handleCreateTraining(requestTrainingObject)
            : null;
        updateTraining && updateTraining.name === selectedOption
            ? handleUpdateTraining(updateTraining)
            : null;
    };

    const updateTrainingHandler = (training: TTrainingResponse) => {
        if (training.isImplementation) {
            setSelectedOption(training.name);
            setUpdateTraining(training);
            setDrawerType(DrawerNameEnum.VIEW);
            setIsDrawerOpened(true);
            handleSelectOptions(null, false);
            return;
        } else {
            const newSelectedOption = training.name;
            setUpdateTraining(training);
            setSelectedOption(newSelectedOption);
            const shouldHandleSelectOptions = !!isPastDate(date);
            handleSetStep(2);
            handleSelectOptions(
                shouldHandleSelectOptions
                    ? {
                          value: newSelectedOption,
                          label: newSelectedOption,
                      }
                    : null,
                !shouldHandleSelectOptions,
            );
        }
    };

    const updateExerciseHandler = () => {
        setIsDrawerOpened(true);
        setDrawerType(DrawerNameEnum.UPDATE);
    };

    return (
        <>
            <Modal
                open={isModalOpen}
                className={styles.modal}
                wrapClassName={cn(styles.modalWrapper, modalClassname)}
                getContainer={getContainer}
                style={{
                    top: mobileTrainingListCoordinate,
                }}
                footer={null}
                onCancel={() => {
                    setIsModalOpened(false);
                    handleSetStep(1);
                }}
                closeIcon={<CloseOutlined data-test-id='modal-create-training-button-close' />}
                closable={closable}
                mask={false}
                data-test-id={step === 1 ? 'modal-create-training' : 'modal-create-exercise'}
                destroyOnClose
            >
                <Card
                    actions={[
                        step === 1 ? (
                            <Button
                                type='primary'
                                size='large'
                                htmlType='button'
                                className={styles.button}
                                block
                                disabled={
                                    listOfTrainings.length >= 5 ? true : false || isPastDate(date)
                                }
                                onClick={createTrainingHandler}
                            >
                                Создать тренировку
                            </Button>
                        ) : (
                            <Space direction='vertical' className={styles.buttonContainer}>
                                <Button
                                    type='default'
                                    size='middle'
                                    htmlType='button'
                                    className={styles.button}
                                    block
                                    disabled={!selectedOption}
                                    onClick={addExerciseHandler}
                                >
                                    Добавить упражнения
                                </Button>
                                <Button
                                    type='link'
                                    size='middle'
                                    htmlType='button'
                                    className={styles.button}
                                    block
                                    disabled={
                                        !(
                                            (!!requestTrainingObject?.exercises.length &&
                                                requestTrainingObject?.name === selectedOption) ||
                                            (!!updateTraining &&
                                                updateTraining.name === selectedOption)
                                        )
                                    }
                                    onClick={saveHandler}
                                >
                                    {isPastDate(date) ? 'Сохранить изменения' : 'Сохранить'}
                                </Button>
                            </Space>
                        ),
                    ]}
                >
                    {step === 1 ? (
                        <Card.Meta
                            className={styles.cardMeta}
                            title={`Тренировки на ${date}`}
                            description={
                                listOfTrainings.length === 0 ? 'Нет активных тренировок' : null
                            }
                        />
                    ) : (
                        <PageHeader
                            onBack={() => {
                                handleSetStep(1);
                                setSelectOptions([]);
                            }}
                            backIcon={
                                <ArrowLeftOutlined data-test-id='modal-exercise-training-button-close' />
                            }
                            extra={
                                <Select
                                    placeholder={
                                        <Text className={styles.selectPlaceholder}>
                                            Выбор типа тренировки
                                        </Text>
                                    }
                                    options={selectOptions}
                                    style={{ width: '100%' }}
                                    onSelect={(option) => {
                                        handleSetSelectedOption(option);
                                        setRequestTrainingObject(null);
                                        if (isDrawerOpened) setIsDrawerOpened(false);
                                    }}
                                    defaultValue={selectedOption}
                                    data-test-id='modal-create-exercise-select'
                                />
                            }
                            className={styles.pageHeader}
                        />
                    )}
                    {step === 1 ? (
                        listOfTrainings.length > 0 ? (
                            <Space
                                direction='vertical'
                                className={cn(styles.itemsContainer, styles.badgesContainer)}
                            >
                                {listOfTrainings.map((training, index) => (
                                    <Button
                                        key={training._id}
                                        type='text'
                                        className={styles.badgeButton}
                                        onClick={() => updateTrainingHandler(training)}
                                        data-test-id={`modal-update-training-edit-button${index}`}
                                        disabled={training.isImplementation}
                                        block
                                    >
                                        <Row
                                            className={cn(
                                                styles.itemContainer,
                                                styles.badgeContainer,
                                                training.isImplementation
                                                    ? styles.disabledRow
                                                    : null,
                                            )}
                                            justify='space-between'
                                        >
                                            <Col>
                                                <BadgeComponent
                                                    name={training.name}
                                                    className={styles.disabledText}
                                                />
                                            </Col>
                                            <Col>
                                                <EditOutlined />
                                            </Col>
                                        </Row>
                                    </Button>
                                ))}
                            </Space>
                        ) : (
                            <Empty
                                className={styles.empty}
                                description={false}
                                image='../../../empty-image.svg'
                                imageStyle={{ height: 32, width: 32 }}
                            />
                        )
                    ) : (
                        <Space
                            direction='vertical'
                            size={12}
                            className={cn(styles.itemsContainer, styles.exercisesContainer)}
                        >
                            {updateTraining &&
                            selectedOption === updateTraining.name &&
                            updateTraining.exercises.length > 0 ? (
                                updateTraining.exercises.map((exercise, id) => (
                                    <Row
                                        key={id}
                                        className={cn(
                                            styles.itemContainer,
                                            styles.exerciseContainer,
                                        )}
                                        justify='space-between'
                                        onClick={updateExerciseHandler}
                                        data-test-id={`modal-update-training-edit-button${id}`}
                                    >
                                        <Col>
                                            <Text className={styles.exercise}>{exercise.name}</Text>
                                        </Col>
                                        <Col>
                                            <EditOutlined />
                                        </Col>
                                    </Row>
                                ))
                            ) : requestTrainingObject &&
                              requestTrainingObject.name === selectedOption &&
                              requestTrainingObject?.exercises.length > 0 ? (
                                requestTrainingObject.exercises.map((exercise, id) => (
                                    <Row
                                        key={id}
                                        className={cn(
                                            styles.itemContainer,
                                            styles.exerciseContainer,
                                        )}
                                        justify='space-between'
                                        onClick={updateExerciseHandler}
                                        data-test-id={`modal-update-training-edit-button${id}`}
                                    >
                                        <Col>
                                            <Text className={styles.exercise}>{exercise.name}</Text>
                                        </Col>
                                        <Col>
                                            <EditOutlined />
                                        </Col>
                                    </Row>
                                ))
                            ) : (
                                <Empty
                                    className={styles.empty}
                                    description={false}
                                    image='../../../empty-image.svg'
                                    imageStyle={{ height: 32, width: 32 }}
                                />
                            )}
                        </Space>
                    )}
                </Card>
            </Modal>
            {selectedOption ? (
                <>
                    {[DrawerNameEnum.CREATE, DrawerNameEnum.UPDATE, DrawerNameEnum.VIEW].map(
                        (mapedDrawerType, index) => (
                            <CalendarDrawerComponent
                                key={index}
                                type={drawerType && mapedDrawerType}
                                isOpened={drawerType === mapedDrawerType && isDrawerOpened}
                                setIsOpened={setIsDrawerOpened}
                                title={
                                    <Row
                                        gutter={drawerType === DrawerNameEnum.VIEW ? 0 : 12}
                                        align='middle'
                                    >
                                        <Col>
                                            {drawerType === DrawerNameEnum.CREATE ? (
                                                <PlusOutlined />
                                            ) : drawerType === DrawerNameEnum.UPDATE ? (
                                                <EditOutlined />
                                            ) : null}
                                        </Col>
                                        <Col>
                                            <Text className={styles.drawerTitle}>
                                                {drawerType === DrawerNameEnum.CREATE
                                                    ? 'Добавление упражнений'
                                                    : drawerType === DrawerNameEnum.UPDATE
                                                    ? 'Редактирование'
                                                    : 'Просмотр упражнений'}
                                            </Text>
                                        </Col>
                                    </Row>
                                }
                                selectedOption={selectedOption}
                                date={date}
                                setRequestTrainingObject={setRequestTrainingObject}
                                requestTrainingObject={requestTrainingObject}
                                updateTraining={updateTraining}
                                setUpdateTraining={setUpdateTraining}
                                isPastDate={isPastDate}
                            />
                        ),
                    )}
                </>
            ) : null}
        </>
    );
};
