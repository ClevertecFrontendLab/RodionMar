import { Alert, Modal, Typography } from 'antd';
import styles from './index.module.scss';
import { CloseOutlined } from '@ant-design/icons';
import cn from 'classnames';
import { DataTestEnum } from '@constants/data-tests.enum';

type ModalAlertProps = {
    isModalOpen: boolean;
    type: 'success' | 'error' | 'info' | 'warning';
    message: React.ReactNode;
    description: React.ReactNode | null;
    button: React.ReactNode;
    icon: React.ReactNode;
    resultClassName?: string;
    onCloseHandler?: () => void;
    closable?: boolean;
    dataTestId?: string;
    className?: string;
};

const { Text } = Typography;

export const ModalAlert = ({
    isModalOpen,
    type,
    message,
    description,
    button,
    onCloseHandler,
    icon,
    closable = true,
    dataTestId,
    className,
}: ModalAlertProps) => (
    <Modal
        open={isModalOpen}
        className={cn(styles.modal, className)}
        wrapClassName={styles.modalWrapper}
        mask={false}
        footer={button}
        closable={closable}
        zIndex={11}
        data-test-id={dataTestId}
    >
        <Alert
            className={styles.alert}
            type={type}
            message={
                <Text data-test-id={DataTestEnum.MODAL_ERROR_USER_TRAINING_TITLE}>{message}</Text>
            }
            description={
                <Text data-test-id={DataTestEnum.MODAL_ERROR_USER_TRAINING_SUBTITLE}>
                    {description}
                </Text>
            }
            icon={icon}
            showIcon
            closeIcon={
                <CloseOutlined data-test-id={DataTestEnum.MODAL_ERROR_USER_TRAINING_BUTTON_CLOSE} />
            }
            closable={closable}
            onClose={onCloseHandler}
        />
    </Modal>
);
