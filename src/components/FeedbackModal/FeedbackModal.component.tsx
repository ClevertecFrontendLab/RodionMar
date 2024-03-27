import { useState } from 'react';

import { Button, Modal, Form, Input, Rate } from 'antd';

import { StarFilled, StarOutlined } from '@ant-design/icons';

import { CreateFeedback } from '@shared/types/create-feedback.type';

import styles from './index.module.scss';
import { DataTestEnum } from '@constants/data-tests.enum';

type FeedbackModalProps = {
    setIsFeedbackModalOpen: (value: boolean) => void;
    isFeedbackModalOpen: boolean;
    handleFeedback: (data: CreateFeedback) => void;
};

export const FeedbackModal = ({
    setIsFeedbackModalOpen,
    isFeedbackModalOpen,
    handleFeedback,
}: FeedbackModalProps) => {
    const [form] = Form.useForm();
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    const handleOk = () => {
        setIsFeedbackModalOpen(false);
    };

    const handleCancel = () => {
        setIsFeedbackModalOpen(false);
    };

    const handleValidate = () => {
        form.validateFields().catch((errors) => {
            errors.errorFields.length > 0 ? setIsButtonDisabled(true) : setIsButtonDisabled(false);
        });
    };

    const rateRules = [{ required: true, message: '' }];

    const onFinish = (values: CreateFeedback) => {
        const formValues = {
            rating: values.rating,
            message: values.message || '',
        };

        handleFeedback(formValues);

        setIsFeedbackModalOpen(false);
    };

    return (
        <Modal
            title='Ваш отзыв'
            centered
            open={isFeedbackModalOpen}
            className={styles.wrapper}
            wrapClassName={styles.modalWrapper}
            width={540}
            onOk={handleOk}
            onCancel={handleCancel}
            destroyOnClose={true}
            mask={false}
            zIndex={5}
            footer={[
                <Button
                    type='primary'
                    htmlType='submit'
                    size='large'
                    className={styles.button}
                    disabled={isButtonDisabled}
                    onClick={() => onFinish(form.getFieldsValue())}
                    data-test-id={DataTestEnum.NEW_REVIEW_SUBMIT_BUTTON}
                >
                    Опубликовать
                </Button>,
            ]}
        >
            <Form
                name='feedback'
                form={form}
                initialValues={{
                    remember: true,
                }}
                onValuesChange={handleValidate}
                autoComplete='off'
                className={styles.form}
                size='large'
            >
                <div className={styles.fieldsWrapper}>
                    <Form.Item name='rating' rules={rateRules} className={styles.fieldWrapper}>
                        <Rate
                            className={styles.rate}
                            character={({ value, index }) => {
                                return value !== null &&
                                    value !== undefined &&
                                    index !== undefined ? (
                                    value > index ? (
                                        <StarFilled
                                            key={`star-filled-${index}`}
                                            className={styles.starFilled}
                                        />
                                    ) : (
                                        <StarOutlined
                                            key={`star-outlined-${index}`}
                                            className={styles.starOutlined}
                                        />
                                    )
                                ) : null;
                            }}
                        />
                    </Form.Item>

                    <Form.Item name='message' className={styles.fieldWrapper}>
                        <Input.TextArea
                            placeholder='Autosize height based on content lines'
                            autoSize={true}
                            style={{ resize: 'vertical' }}
                        />
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    );
};
