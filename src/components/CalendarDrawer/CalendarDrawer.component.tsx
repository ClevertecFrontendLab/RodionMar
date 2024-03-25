import {
    Button,
    Checkbox,
    Col,
    Drawer,
    Form,
    Input,
    InputNumber,
    Row,
    Space,
    Typography,
} from 'antd';
import styles from './index.module.scss';
import { BadgeComponent } from '@components/Badge';
import { TTrainingName } from '@shared/types/training-name.type';
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { TExercise } from '@shared/types/exersice.type';
import cn from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { TTrainingRequest } from '@shared/types/training-request.type';
import { DrawerNameEnum } from '@constants/drawer-name.type';
import { ExerciseEnum } from './exercise.enum';
import moment from 'moment';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

type TCalendarDrawerComponentProps = {
    type: DrawerNameEnum;
    isOpened: boolean;
    setIsOpened: (value: boolean) => void;
    title: React.ReactNode;
    selectedOption: TTrainingName;
    date: string;
    setRequestTrainingObject: (value: TTrainingRequest) => void;
    requestTrainingObject: TTrainingRequest | null;
    setUpdateTraining: (value: TTrainingRequest) => void;
    updateTraining: TTrainingRequest | null;
    isPastDate: (dateString: string) => boolean;
};

type TFormValues = Record<string, string | number>;

const { Text } = Typography;

export const CalendarDrawerComponent = ({
    type,
    isOpened,
    setIsOpened,
    title,
    selectedOption,
    date,
    setRequestTrainingObject,
    requestTrainingObject,
    setUpdateTraining,
    updateTraining,
    isPastDate,
}: TCalendarDrawerComponentProps) => {
    const [form] = Form.useForm();
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [formHeight, setFormHeight] = useState(0);
    const [selectedExercises, setSelectedExercises] = useState<number[]>([]);
    const [exercises, setExercises] = useState<TExercise[]>([]);

    useEffect(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (isOpened) {
            const formElement = document.getElementsByClassName('ant-form')[0] as HTMLElement;

            if (formElement) {
                const formElementHeight = formElement.getBoundingClientRect().height;
                setFormHeight(formElementHeight);
            }
        }
    }, [isOpened]);

    const createExerciseObjects = (formValues: TFormValues): TExercise[] => {
        const updatedExercises: TExercise[] = [...exercises];

        Object.entries(formValues).forEach(([key, value]) => {
            const [type, indexStr] = key.split('-');
            const index = parseInt(indexStr);

            let exercise = updatedExercises[index];

            if (!exercise) {
                exercise = {
                    name: '',
                    approaches: 1,
                    weight: 0,
                    replays: 1,
                };
                updatedExercises[index] = exercise;
            }

            const name = String(value);
            const existingExercise = updatedExercises.find(
                (exercise) => exercise.name.trim() === name.trim(),
            );

            switch (type) {
                case ExerciseEnum.NAME:
                    if (existingExercise) return;
                    exercise.name = name;
                    break;
                case ExerciseEnum.APPROACHES:
                    exercise.approaches = value as number;
                    break;
                case ExerciseEnum.WEIGHT:
                    exercise.weight = value as number;
                    break;
                case ExerciseEnum.REPLAYS:
                    exercise.replays = value as number;
                    break;
                default:
                    break;
            }
        });

        const filteredExercises = updatedExercises.filter(
            (exercise) =>
                exercise.name.trim() !== '' &&
                exercise.name !== undefined &&
                exercise.name !== 'undefined',
        );

        return filteredExercises;
    };

    const formatDate = (dateString: string): string => {
        const [year, month, day] = dateString.split('.');
        return moment.utc(`${year}-${month}-${day}`).toISOString();
    };

    const handleCloseDrawer = () => {
        const formValues = form.getFieldsValue();
        const formattedDate = formatDate(date);
        const exerciseObjects = createExerciseObjects(formValues);
        const isPast = isPastDate(date);

        if (exerciseObjects && type !== DrawerNameEnum.VIEW) {
            if (requestTrainingObject) {
                const updatedExercises = requestTrainingObject.exercises.filter((_, index) => {
                    return (
                        !selectedExercises.includes(index) &&
                        !exerciseObjects.some((_, indexOfExercise) => index === indexOfExercise)
                    );
                });
                const setUpdatedExercises = [
                    ...updatedExercises,
                    ...exerciseObjects.filter(
                        (newExercise) =>
                            !updatedExercises.some(
                                (existingExercise) => existingExercise.name === newExercise.name,
                            ),
                    ),
                ];

                setRequestTrainingObject({
                    name: selectedOption,
                    date: formattedDate,
                    exercises: [...setUpdatedExercises],
                });
            } else if (updateTraining && updateTraining.name === selectedOption) {
                const updatedExercises = updateTraining.exercises.filter((_, index) => {
                    return (
                        !selectedExercises.includes(index) &&
                        !exerciseObjects.some((_, indexOfExercise) => index === indexOfExercise)
                    );
                });

                const setUpdatedExercises = [
                    ...updatedExercises,
                    ...exerciseObjects.filter(
                        (newExercise) =>
                            !updatedExercises.some(
                                (existingExercise) => existingExercise.name === newExercise.name,
                            ),
                    ),
                ];

                setUpdateTraining({
                    _id: updateTraining._id,
                    name: selectedOption,
                    date: formattedDate,
                    isImplementation: isPast,
                    exercises: [...setUpdatedExercises],
                });
            } else {
                setRequestTrainingObject({
                    name: selectedOption,
                    date: formattedDate,
                    exercises: exerciseObjects,
                });
            }
        }
        setSelectedExercises([]);
    };

    useEffect(() => {
        const updatedExercises: TExercise[] = [];

        const trainingObject =
            updateTraining?.name === selectedOption ? updateTraining : requestTrainingObject;

        if (trainingObject) {
            trainingObject.exercises?.forEach((exercise) => {
                updatedExercises.push({
                    name: exercise.name || '',
                    approaches: exercise.approaches || 1,
                    weight: exercise.weight || 0,
                    replays: exercise.replays || 1,
                });
            });
        }

        setExercises(updatedExercises);
    }, [updateTraining, requestTrainingObject, selectedOption]);

    const handleDeleteExercise = () => {
        const formValues = form.getFieldsValue();
        const updatedExercises = createExerciseObjects(formValues).filter(
            (_, index) => !selectedExercises.includes(index),
        );
        const newFormValues: Record<string, string | number> = {};

        updatedExercises.forEach((exercise, index) => {
            newFormValues[`name-${index}`] = exercise.name;
            newFormValues[`approaches-${index}`] = exercise.approaches;
            newFormValues[`weight-${index}`] = exercise.weight;
            newFormValues[`replays-${index}`] = exercise.replays;
        });

        form.setFieldsValue(newFormValues);
        setSelectedExercises([]);
        setExercises(updatedExercises);
    };

    const handleAddExercise = useCallback(() => {
        setExercises((prevExercises) => {
            const newExercise: TExercise = {
                name: '',
                approaches: 1,
                weight: 0,
                replays: 1,
            };
            return [...prevExercises, newExercise];
        });
    }, []);

    useEffect(() => {
        if (
            (!updateTraining || !updateTraining.exercises.length) &&
            (!requestTrainingObject || !requestTrainingObject.exercises.length)
        ) {
            handleAddExercise();
        }
    }, [updateTraining, requestTrainingObject, handleAddExercise]);

    const reverseDate = (dateString: string): string => {
        const [day, month, year] = dateString.split('.');
        return `${year}.${month}.${day}`;
    };

    const changeCheckboxHandler = (event: CheckboxChangeEvent, index: number) => {
        const checkedIndex = typeof index === 'number' ? index : parseInt(index, 10);
        const updatedSelectedExercises = event.target.checked
            ? [...selectedExercises, checkedIndex]
            : selectedExercises.filter((i) => i !== checkedIndex);
        setSelectedExercises(updatedSelectedExercises);
    };

    return (
        <Drawer
            data-test-id='modal-drawer-right'
            open={isOpened}
            title={
                <>
                    {title}
                    <Row justify='space-between' className={styles.exerciseInfo}>
                        <Col>
                            <BadgeComponent name={selectedOption} />
                        </Col>
                        <Col>
                            <Text>{reverseDate(date)}</Text>
                        </Col>
                    </Row>
                </>
            }
            destroyOnClose
            mask={false}
            closable
            headerStyle={{ flexDirection: 'row-reverse' }}
            onClose={() => {
                setIsOpened(false);
                handleCloseDrawer();
            }}
            className={cn(
                styles.drawer,
                windowHeight < formHeight + 205 + (windowWidth < 481 ? 85 : 0)
                    ? styles.bodyFullHeight
                    : styles.bodyAutoHeight,
            )}
            width={408}
            placement={windowWidth > 480 ? 'right' : 'bottom'}
            closeIcon={<CloseOutlined data-test-id='modal-drawer-right-button-close' />}
            footer={
                type !== DrawerNameEnum.VIEW ? (
                    <Row>
                        <Col span={type === DrawerNameEnum.UPDATE ? 12 : 24}>
                            <Button
                                type='link'
                                size='large'
                                htmlType='button'
                                className={cn(styles.button, styles.plusButton)}
                                block
                                icon={<PlusOutlined />}
                                onClick={handleAddExercise}
                            >
                                Добавить ещё
                            </Button>
                        </Col>
                        {type === DrawerNameEnum.UPDATE ? (
                            <Col span={12}>
                                <Button
                                    type='text'
                                    size='large'
                                    htmlType='button'
                                    className={styles.button}
                                    block
                                    icon={<MinusOutlined />}
                                    onClick={handleDeleteExercise}
                                    disabled={!selectedExercises.length}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        ) : null}
                    </Row>
                ) : null
            }
        >
            <Form form={form} className={styles.form}>
                {exercises.length > 0 ? (
                    exercises.map((exercise, index) => (
                        <Space
                            key={index}
                            direction='vertical'
                            className={styles.functionalWrapper}
                        >
                            <Form.Item
                                initialValue={exercise.name}
                                name={`name-${index}`}
                                className={styles.inputFormItem}
                            >
                                <Input
                                    data-test-id={`modal-drawer-right-input-exercise${index}`}
                                    placeholder='Упражнение'
                                    size='small'
                                    addonAfter={
                                        type === DrawerNameEnum.UPDATE ? (
                                            <Checkbox
                                                checked={selectedExercises.includes(index)}
                                                onChange={(event) =>
                                                    changeCheckboxHandler(event, index)
                                                }
                                                data-test-id={`modal-drawer-right-checkbox-exercise${index}`}
                                            />
                                        ) : null
                                    }
                                />
                            </Form.Item>

                            <Row className={styles.rowWrapper} justify='space-between'>
                                <Col className={styles.colText}>
                                    <Text>Подходы</Text>
                                </Col>
                                <Col className={styles.colWrapper}>
                                    <Row className={styles.rowTextWrapper}>
                                        <Col className={styles.colText}>
                                            <Text>Вес, кг</Text>
                                        </Col>
                                        <Col className={styles.colText}>
                                            <Text>Количество</Text>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className={styles.rowWrapper} justify='space-between'>
                                <Col className={styles.colInput}>
                                    <Col>
                                        <Form.Item
                                            initialValue={exercise.approaches}
                                            name={`approaches-${index}`}
                                            className={styles.inputFormItem}
                                        >
                                            <InputNumber
                                                min={1}
                                                size='small'
                                                addonBefore='+'
                                                placeholder='1'
                                                name={`approaches-${index}`}
                                                data-test-id={`modal-drawer-right-input-approach${index}`}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Col>
                                <Col className={styles.colWrapper}>
                                    <Row className={styles.colInputWrapper}>
                                        <Col>
                                            <Form.Item
                                                initialValue={exercise.weight}
                                                name={`weight-${index}`}
                                                className={styles.inputFormItem}
                                            >
                                                <InputNumber
                                                    min={0}
                                                    size='small'
                                                    placeholder='0'
                                                    name={`weight-${index}`}
                                                    data-test-id={`modal-drawer-right-input-weight${index}`}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col>
                                            <Text className={styles.xInputSymbol}>x</Text>
                                        </Col>
                                        <Col>
                                            <Form.Item
                                                initialValue={exercise.replays}
                                                name={`replays-${index}`}
                                                className={styles.inputFormItem}
                                            >
                                                <InputNumber
                                                    min={1}
                                                    size='small'
                                                    placeholder='1'
                                                    name={`replays-${index}`}
                                                    data-test-id={`modal-drawer-right-input-quantity${index}`}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Space>
                    ))
                ) : (
                    <Space direction='vertical' className={styles.functionalWrapper}>
                        <Form.Item initialValue='' name={`name-0`} className={styles.inputFormItem}>
                            <Input
                                data-test-id={`modal-drawer-right-input-exercise0`}
                                placeholder='Упражнение'
                                size='small'
                                addonAfter={
                                    type === DrawerNameEnum.UPDATE ? (
                                        <Checkbox
                                            checked={!!selectedExercises.length}
                                            onChange={(e) => {
                                                const checkedIndex = 0;
                                                const updatedSelectedExercises = e.target.checked
                                                    ? [...selectedExercises, checkedIndex]
                                                    : selectedExercises.filter(
                                                          (i) => i !== checkedIndex,
                                                      );
                                                setSelectedExercises(updatedSelectedExercises);
                                            }}
                                            data-test-id={`modal-drawer-right-checkbox-exercise0`}
                                        />
                                    ) : null
                                }
                            />
                        </Form.Item>

                        <Row className={styles.rowWrapper} justify='space-between'>
                            <Col className={styles.colText}>
                                <Text>Подходы</Text>
                            </Col>
                            <Col className={styles.colWrapper}>
                                <Row className={styles.rowTextWrapper}>
                                    <Col className={styles.colText}>
                                        <Text>Вес, кг</Text>
                                    </Col>
                                    <Col className={styles.colText}>
                                        <Text>Количество</Text>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className={styles.rowWrapper} justify='space-between'>
                            <Col className={styles.colInput}>
                                <Col>
                                    <Form.Item
                                        initialValue={1}
                                        name={`approaches-0`}
                                        className={styles.inputFormItem}
                                    >
                                        <InputNumber
                                            min={1}
                                            size='small'
                                            addonBefore='+'
                                            placeholder='1'
                                            data-test-id={`modal-drawer-right-input-approach0`}
                                        />
                                    </Form.Item>
                                </Col>
                            </Col>
                            <Col className={styles.colWrapper}>
                                <Row className={styles.colInputWrapper}>
                                    <Col>
                                        <Form.Item
                                            initialValue={0}
                                            name={`weight-0`}
                                            className={styles.inputFormItem}
                                        >
                                            <InputNumber
                                                min={0}
                                                size='small'
                                                placeholder='0'
                                                data-test-id={`modal-drawer-right-input-weight0`}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col>
                                        <Text className={styles.xInputSymbol}>x</Text>
                                    </Col>
                                    <Col>
                                        <Form.Item
                                            initialValue={1}
                                            name={`replays-0`}
                                            className={styles.inputFormItem}
                                        >
                                            <InputNumber
                                                min={1}
                                                size='small'
                                                placeholder='1'
                                                data-test-id={`modal-drawer-right-input-quantity0`}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Space>
                )}
            </Form>
        </Drawer>
    );
};
