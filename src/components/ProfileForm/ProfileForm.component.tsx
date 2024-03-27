import { useEffect, useState } from 'react';

import { Button, Input, Typography, Form, Row, Col, DatePicker, Upload } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';

import { ProfileResponse } from '@shared/types/profile-response.type';

import styles from './index.module.scss';
import { APIRouteEnum } from '@constants/api-routes.enum';
import { ProfileEndpointEnum } from '@pages/profile/constants/profile-endpoints.enum';
import cn from 'classnames';
import { DateFormatEnum } from '@constants/date-formats.enum';
import { ProfileRequest } from '@shared/types/profile-request.type';
import moment from 'moment';
import React from 'react';
import { DataTestEnum } from '@constants/data-tests.enum';

type FinishValues = {
    confirmPassword?: string;
    birthday?: string;
    email: string;
    firstName?: string;
    lastName?: string;
    password: string;
    imgSrc?: { file: UploadFile };
};

enum FileStatusRnum {
    UPLOADING = 'uploading',
    REMOVED = 'removed',
    DONE = 'done',
    ERROR = 'error',
}

const { Text } = Typography;

const IMAGES_URL = 'https://training-api.clevertec.ru';

export const ProfileFormComponent = ({
    profile,
    setIsErrorModalOpened,
    handleSaveChanges,
    windowWidth,
}: {
    profile: ProfileResponse | null;
    setIsErrorModalOpened: (value: boolean) => void;
    handleSaveChanges: (value: ProfileRequest) => void;
    windowWidth: number;
}) => {
    const [form] = Form.useForm();
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [uploadButtonText, setUploadButtonText] = useState<string>('Загрузить фото профиля');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [passwordChanged, setPasswordChanged] = useState<boolean>(false);

    useEffect(() => {
        if (profile && profile.imgSrc) {
            setFileList([
                {
                    uid: '-1',
                    name: '',
                    status: FileStatusRnum.DONE,
                    url: profile.imgSrc,
                },
            ]);
        }
    }, [profile, setFileList]);

    const emailRules = [
        { required: true, pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: '' },
    ];

    const passwordRules = [
        {
            required: passwordChanged,
            min: 8,
            pattern: /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d).{8,}$/,
            message: '',
        },
    ];

    const onFinish = (values: FinishValues) => {
        const finishValues = {
            birthday: moment.utc(values.birthday).toISOString(),
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            password: values.password,
            imgSrc:
                values.imgSrc && typeof values.imgSrc !== 'string'
                    ? IMAGES_URL +
                      (values.imgSrc.file.response ? values.imgSrc.file.response.url : '')
                    : values.imgSrc,
        };
        form.resetFields(['password', 'confirmPassword']);
        setPasswordChanged(false);
        handleSaveChanges(finishValues);
        setIsButtonDisabled(true);
    };

    const handleFieldaChange = () => {
        setIsButtonDisabled(false);
        form.validateFields().catch(() => {
            const emailErrors = form.getFieldError('email');
            setIsButtonDisabled(!!emailErrors.length);
        });
    };

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        switch (info.file.status) {
            case FileStatusRnum.UPLOADING:
                setFileList(info.fileList);
                setUploadButtonText('Загружаем');
                break;
            case FileStatusRnum.REMOVED:
                setFileList(info.fileList);
                setUploadButtonText('Загрузить фото профиля');
                break;
            case FileStatusRnum.DONE:
                setFileList(info.fileList);
                setUploadButtonText('Загрузить фото профиля');
                setIsButtonDisabled(false);
                break;
            case FileStatusRnum.ERROR:
                setFileList([
                    {
                        uid: '-1',
                        name: 'image.png',
                        status: FileStatusRnum.ERROR,
                    },
                ]);
                setIsButtonDisabled(true);
                if (info.file.error?.status === 409) {
                    setIsErrorModalOpened(true);
                }
        }
    };

    const uploadButton = (
        <div data-test-id={DataTestEnum.PROFILE_AVATAR}>
            <PlusOutlined />
            <div className={styles.uploadButtonText}>{uploadButtonText}</div>
        </div>
    );

    const mobileUploadButton = <Button icon={<UploadOutlined />}>Загрузить</Button>;

    const showUploadList = {
        showRemoveIcon: true,
        showPreviewIcon: windowWidth > 360 ? true : false,
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordChanged(!!e.target.value);
    };

    return (
        <Form
            name='file'
            form={form}
            onValuesChange={handleFieldaChange}
            autoComplete='off'
            className={styles.form}
            onFinish={onFinish}
            size='large'
        >
            <Text className={styles.formText}>Личная информация</Text>
            <Row className={styles.userInfo}>
                <Col
                    className={cn(
                        styles.uploadCol,
                        fileList.length === 0 ? styles.uploadColWithoutImage : '',
                    )}
                >
                    <Form.Item
                        name='imgSrc'
                        labelCol={{ offset: 0 }}
                        label={
                            windowWidth < 361 && fileList.length === 0 ? (
                                <Text className={styles.mobileUploadLabel}>
                                    Загрузить фото профиля:
                                </Text>
                            ) : null
                        }
                        initialValue={profile ? profile.imgSrc : null}
                        className={styles.fieldWrapper}
                    >
                        <Upload
                            name='file'
                            headers={{
                                Authorization: `Bearer ${localStorage.getItem('token')}`,
                            }}
                            action={`${APIRouteEnum.BASE_URL}${ProfileEndpointEnum.UPLOAD_IMAGE}`}
                            listType={windowWidth > 360 ? 'picture-card' : 'picture'}
                            showUploadList={showUploadList}
                            onChange={handleChange}
                            maxCount={1}
                            fileList={fileList}
                            itemRender={(originNode) => {
                                return React.cloneElement(originNode, {
                                    'data-test-id': 'profile-avatar',
                                });
                            }}
                        >
                            {fileList.length > 0
                                ? null
                                : windowWidth > 360
                                ? uploadButton
                                : mobileUploadButton}
                        </Upload>
                    </Form.Item>
                </Col>

                <Col>
                    <Row className={styles.userInfoFields}>
                        <Col span={24}>
                            <Form.Item
                                name='firstName'
                                initialValue={profile ? profile.firstName : null}
                                className={styles.fieldWrapper}
                            >
                                <Input
                                    placeholder='Имя'
                                    className={styles.field}
                                    data-test-id={DataTestEnum.PROFILE_NAME}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name='lastName'
                                initialValue={profile ? profile.lastName : null}
                                className={styles.fieldWrapper}
                            >
                                <Input
                                    placeholder='Фамилия'
                                    className={styles.field}
                                    data-test-id={DataTestEnum.PROFILE_SURNAME}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item name='birthday' className={styles.fieldWrapper}>
                                <DatePicker
                                    placeholder='Дата рождения'
                                    style={{ width: '100%' }}
                                    format={DateFormatEnum.DATE_PICKER}
                                    data-test-id={DataTestEnum.PROFILE_BIRTHDAY}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Text className={cn(styles.formText, styles.privatyText)}>
                Приватность и авторизация
            </Text>
            <Row className={cn(styles.fieldsWrapper, styles.privatyInfo)}>
                <Col span={24} className={cn(styles.fieldWrapper, styles.email)}>
                    <Form.Item
                        name='email'
                        initialValue={profile ? profile.email : null}
                        rules={emailRules}
                    >
                        <Input
                            addonBefore={<Text className={styles.fieldAddon}>e-mail:</Text>}
                            className={styles.field}
                            data-test-id={DataTestEnum.PROFILE_EMAIL}
                        />
                    </Form.Item>
                </Col>
                <Col span={24} className={styles.fieldWrapper}>
                    <Form.Item
                        name='password'
                        rules={passwordRules}
                        help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                    >
                        <Input.Password
                            placeholder='Пароль'
                            className={styles.field}
                            onChange={handlePasswordChange}
                            data-test-id={DataTestEnum.PROFILE_PASSWORD}
                        />
                    </Form.Item>
                </Col>
                <Col span={24} className={cn(styles.fieldWrapper, styles.confirmPassword)}>
                    <Form.Item
                        name='confirmPassword'
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Пароли не совпадают'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            placeholder='Повторите пароль'
                            className={styles.field}
                            data-test-id={DataTestEnum.PROFILE_REPEAT_PASSWORD}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item className={styles.fieldWrapper}>
                <Button
                    type='primary'
                    size='large'
                    htmlType='submit'
                    className={styles.saveButton}
                    disabled={isButtonDisabled}
                    data-test-id={DataTestEnum.PROFILE_SUBMIT}
                >
                    Сохранить изменения
                </Button>
            </Form.Item>
        </Form>
    );
};
