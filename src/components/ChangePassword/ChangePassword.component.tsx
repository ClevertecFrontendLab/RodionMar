import { Button, Input, Form, Space, Typography } from 'antd';

import styles from './index.module.scss';

import { ChangePassword } from '@shared/types/change-password.type';
import { DataTestEnum } from '@constants/data-tests.enum';

const { Title } = Typography;

type ChangePasswordProps = {
    handleChangePassword: (data: ChangePassword) => void;
}

export const ChangePasswordComponent = ({
    handleChangePassword,
}: ChangePasswordProps) => {
    const [form] = Form.useForm();

    const passwordRules = [
        {
            required: true,
            min: 8,
            pattern: /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d).{8,}$/,
            message: '',
        },
    ];

    const onFinish = (values: ChangePassword) => {
        localStorage.setItem('changePasswordData', JSON.stringify(values));

        handleChangePassword(values);
    };

    return (
        <div className={styles.formWrapper}>
            <Form
                name='signUp'
                form={form}
                initialValues={{
                    remember: true,
                }}
                autoComplete='off'
                className={styles.form}
                onFinish={onFinish}
                size='large'
            >
                <Space className={styles.wrapper} size={32} direction='vertical'>
                    <Title className={styles.title}>Восстановление аккауанта</Title>
                    <Space.Compact className={styles.fieldsWrapper} direction='vertical'>
                        <Form.Item
                            name='password'
                            rules={passwordRules}
                            help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                            className={styles.fieldWrapper}
                        >
                            <Input.Password
                                placeholder='Пароль'
                                className={styles.field}
                                data-test-id={DataTestEnum.CHANGE_PASSWORD}
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
                            className={styles.fieldWrapper}
                        >
                            <Input.Password
                                placeholder='Повторите пароль'
                                className={styles.field}
                                data-test-id={DataTestEnum.CHANGE_CONFIRM_PASSWORD}
                            />
                        </Form.Item>
                    </Space.Compact>

                    <Form.Item className={styles.fieldWrapper}>
                        <Button
                            type='primary'
                            size='large'
                            htmlType='submit'
                            className={styles.button}
                            data-test-id={DataTestEnum.CHANGE_SUBMIT_BUTTON}
                            block
                        >
                            Сохранить
                        </Button>
                    </Form.Item>
                </Space>
            </Form>
        </div>
    );
};
