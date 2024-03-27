import { useState } from 'react';

import { Button, Checkbox, Input, Menu, MenuProps, Space, Typography, Form, Image } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';

import { Auth } from '@shared/types/auth.type';
import { CheckEmail } from '@shared/types/check-email.type';

import styles from './index.module.scss';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { DataTestEnum } from '@constants/data-tests.enum';

type MenuItem = Required<MenuProps>['items'][number];
type FinishValues = {
    email: string;
    forgotPassword: boolean | undefined;
    password: string;
    remember: boolean;
};

const { Link, Text } = Typography;

export const SignInComponent = ({
    handleRedirectToSignUp,
    handleRedirectToForgetPassword,
    handleSignIn,
    handleGoogleAuth,
}: {
    handleRedirectToSignUp: () => void;
    handleRedirectToForgetPassword: (data: CheckEmail) => void;
    handleSignIn: (data: Auth) => void;
    handleGoogleAuth: () => void;
}) => {
    const [form] = Form.useForm();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

    const menuItems: MenuItem[] = [
        {
            label: <Link className={styles.menuLabel}>Вход</Link>,
            key: '1',
        },
        {
            label: (
                <Link onClick={handleRedirectToSignUp} className={styles.menuLabel}>
                    Регистрация
                </Link>
            ),
            key: '2',
        },
    ];

    const emailRules = [
        {
            required: true,
            pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            message: '',
        },
    ];

    const passwordRules = [
        {
            required: true,
            min: 8,
            pattern: /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d).{8,}$/,
            message: '',
        },
    ];

    const onFinish = (values: FinishValues) => {
        if (localStorage.getItem('profile')) {
            localStorage.removeItem('profile');
        }
        localStorage.setItem('profile', JSON.stringify(values));

        const formValues = {
            email: values.email,
            password: values.password,
        };

        handleSignIn(formValues);
    };

    const handleValidate = () => {
        form.validateFields().catch(() => {
            const emailErrors = form.getFieldError('email');
            setIsButtonDisabled(!!emailErrors.length);
        });
    };

    const handleClickForgetPassword = () => {
        const email = form.getFieldValue('email');

        if (!email) {
            setIsButtonDisabled(true);
            return true;
        }

        const data = {
            email: email,
        };

        handleRedirectToForgetPassword(data);
    };

    const handleCheckboxChange = (e: CheckboxChangeEvent) => {
        setIsCheckboxChecked(e.target.checked);
        form.setFieldValue('remember', e.target.checked);
    };

    return (
        <div className={styles.formWrapper}>
            <Image
                src='../../../logo--opened.svg'
                alt='logo'
                preview={false}
                className={styles.logo}
            />

            <Form
                name='signIn'
                form={form}
                initialValues={{
                    remember: isCheckboxChecked,
                }}
                onValuesChange={handleValidate}
                autoComplete='off'
                className={styles.form}
                onFinish={onFinish}
                size='large'
            >
                <Menu
                    defaultSelectedKeys={['1']}
                    mode='horizontal'
                    items={menuItems}
                    className={styles.menu}
                />

                <div className={styles.fieldsWrapper}>
                    <Form.Item name='email' rules={emailRules} className={styles.fieldWrapper}>
                        <Input
                            addonBefore={<Text className={styles.fieldAddon}>e-mail:</Text>}
                            className={styles.field}
                            data-test-id={DataTestEnum.LOGIN_EMAIL}
                        />
                    </Form.Item>

                    <Form.Item
                        name='password'
                        rules={passwordRules}
                        className={styles.fieldWrapper}
                    >
                        <Input.Password
                            placeholder='Пароль'
                            className={styles.field}
                            data-test-id={DataTestEnum.LOGIN_PASSWORD}
                        />
                    </Form.Item>
                </div>

                <Space.Compact direction='horizontal' className={styles.spaceContainer}>
                    <Form.Item name='remember' className={styles.fieldWrapper}>
                        <Checkbox
                            data-test-id={DataTestEnum.LOGIN_REMEMBER}
                            checked={isCheckboxChecked}
                            onChange={handleCheckboxChange}
                        >
                            Запомнить меня
                        </Checkbox>
                    </Form.Item>
                    <Form.Item name='forgotPassword' className={styles.fieldWrapper}>
                        <Button
                            type='link'
                            onClick={handleClickForgetPassword}
                            data-test-id={DataTestEnum.LOGIN_FORGOT_BUTTON}
                            className={styles.forgotButton}
                            disabled={isButtonDisabled}
                        >
                            Забыли пароль?
                        </Button>
                    </Form.Item>
                </Space.Compact>

                <div className={styles.buttonWrapper}>
                    <Form.Item className={styles.fieldWrapper}>
                        <Button
                            type='primary'
                            size='large'
                            htmlType='submit'
                            className={styles.authButton}
                            data-test-id={DataTestEnum.LOGIN_SUBMIT_BUTTON}
                        >
                            Войти
                        </Button>
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 24 }}>
                        <Button
                            htmlType='button'
                            size='large'
                            className={styles.authButton}
                            icon={<GooglePlusOutlined className={styles.authIcon} />}
                            onClick={handleGoogleAuth}
                        >
                            Войти через Google
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};
