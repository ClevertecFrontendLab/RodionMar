import { Button, Input, Form, Space, Typography } from "antd";

import styles from './index.module.scss';
import 'antd/lib/button/style/index.css';
import 'antd/lib/menu/style/index.css';
import 'antd/lib/input/style/index.css';
import 'antd/lib/checkbox/style/index.css';
import 'antd/lib/space/style/index.css';
import 'antd/lib/typography/style/index.css';

import { IChangePassword } from "../../types/change-password.interface";

const { Title } = Typography;


export const handleChangePassword = (
  response: any,
  navigate: (path: string) => void
) => {
  if (response.meta.requestStatus === "fulfilled") {
    window.localStorage.setItem("token", response.payload);
    navigate("/main");
    return true;
  } else {
    navigate("/auth/result/error-login");
  }
};

const ChangePasswordComponent = ({
  handleChangePassword
}: {
  handleChangePassword: (data: IChangePassword) => void;
}) => {
  const [form] = Form.useForm();

  const passwordRules = [
    { required: true, min: 8, pattern: /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d).{8,}$/, message: "" },
  ];

  const onFinish = (values: IChangePassword) => {
    localStorage.setItem("changePasswordData", JSON.stringify(values));

    handleChangePassword(values)
  };

  return (
    <div className={styles.formWrapper}>

      <Form
        name="signUp"
        form={form}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
        className={styles.form}
        onFinish={onFinish}
        size="large"
      >

        <Space className={styles.wrapper} size={32} direction="vertical">
          <Title className={styles.title}>
            Восстановление аккауанта
          </Title>
          <Space.Compact className={styles.fieldsWrapper} direction="vertical" >
            <Form.Item
              name="password"
              rules={passwordRules}
              help="Пароль не менее 8 символов, с заглавной буквой и цифрой"
              className={styles.fieldWrapper}
            >
              <Input.Password 
                placeholder="Пароль" 
                className={styles.field} 
                data-test-id='change-password'
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Пароли не совпадают"));
                  },
                }),
              ]}
              className={styles.fieldWrapper}
            >
              <Input.Password 
                placeholder="Повторите пароль" 
                className={styles.field} 
                data-test-id='change-confirm-password'
              />
            </Form.Item>
          </Space.Compact>

          <Form.Item>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              className={styles.button}
              data-test-id='change-submit-button'
              block
            >
              Сохранить
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </div>
  )
}

export default ChangePasswordComponent;