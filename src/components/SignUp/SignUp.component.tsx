import { useEffect, useState } from 'react';

import { Button, Input, Menu, MenuProps, Typography, Form, Image } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';

import { TAuth } from '@shared/types/auth.type';

import styles from './index.module.scss';

type MenuItem = Required<MenuProps>['items'][number];
type TFinishValues = {
    email: string;
    confirmPassword: string;
    password: string;
};

const { Link, Text } = Typography;

export const SignUpComponent = ({
    handleSignUp,
    handleRedirectToSignIn,
}: {
    handleRedirectToSignIn: () => void;
    handleSignUp: (data: TAuth) => void;
}) => {
    const [form] = Form.useForm();
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    const menuItems: MenuItem[] = [
        {
            label: (
                <Link onClick={handleRedirectToSignIn} className={styles.menuLabel}>
                    Вход
                </Link>
            ),
            key: '1',
        },
        {
            label: <Link className={styles.menuLabel}>Регистрация</Link>,
            key: '2',
        },
    ];

    const emailRules = [
        { required: true, pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: '' },
    ];

    const passwordRules = [
        {
            required: true,
            min: 8,
            pattern: /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d).{8,}$/,
            message: '',
        },
    ];

    const onFinish = (values: TFinishValues) => {
        sessionStorage.setItem('signUpData', JSON.stringify(values));

        const formValues = {
            email: values.email,
            password: values.password,
        };

        handleSignUp(formValues);
    };

    const handleValidate = () => {
        form.validateFields().catch((errors) => {
            errors.errorFields.length > 0 ? setIsButtonDisabled(true) : setIsButtonDisabled(false);
        });
    };

    useEffect(() => {
        const storedData = JSON.parse(sessionStorage.getItem('signUpData') || '{}');
        sessionStorage.setItem('signUpData', JSON.stringify(storedData));
    }, []);

    return (
        <div className={styles.formWrapper}>
            <Image
                src='../../../logo--opened.svg'
                alt='logo'
                preview={false}
                className={styles.logo}
            />

            <Form
                name='signUp'
                form={form}
                initialValues={{
                    remember: true,
                }}
                onValuesChange={handleValidate}
                autoComplete='off'
                className={styles.form}
                onFinish={onFinish}
                size='large'
            >
                <Menu
                    defaultSelectedKeys={['2']}
                    mode='horizontal'
                    items={menuItems}
                    className={styles.menu}
                />

                <div className={styles.fieldsWrapper}>
                    <Form.Item name='email' rules={emailRules} className={styles.fieldWrapper}>
                        <Input
                            addonBefore={<Text className={styles.fieldAddon}>e-mail:</Text>}
                            className={styles.field}
                            data-test-id='registration-email'
                        />
                    </Form.Item>

                    <Form.Item
                        name='password'
                        rules={passwordRules}
                        help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                        className={styles.password}
                    >
                        <Input.Password
                            placeholder='Пароль'
                            className={styles.field}
                            data-test-id='registration-password'
                        />
                    </Form.Item>
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
                            data-test-id='registration-confirm-password'
                        />
                    </Form.Item>
                </div>

                <div className={styles.buttonWrapper}>
                    <Form.Item className={styles.fieldWrapper}>
                        <Button
                            type='primary'
                            size='large'
                            htmlType='submit'
                            className={styles.authButton}
                            disabled={isButtonDisabled}
                            data-test-id='registration-submit-button'
                        >
                            Войти
                        </Button>
                    </Form.Item>

                    <Form.Item className={styles.fieldWrapper}>
                        <Button
                            htmlType='submit'
                            size='large'
                            className={styles.authButton}
                            icon={<GooglePlusOutlined className={styles.authIcon} />}
                        >
                            Регистрация через Google
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};
