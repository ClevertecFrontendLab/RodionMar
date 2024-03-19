import { Alert, Modal, Typography } from 'antd';
import styles from './index.module.scss';
import { CloseOutlined } from '@ant-design/icons';

type TCalendarAlertProps = {
    isModalOpen: boolean;
    type: 'success' | 'error' | 'info' | 'warning';
    message: React.ReactNode;
    description: React.ReactNode | null;
    button: React.ReactNode;
    resultClassName?: string;
    onCloseHandler?: () => void;
    icon: React.ReactNode;
    closable?: boolean;
    dataTestId?: string;
};

const { Text } = Typography;

export const CalendarAlert = ({
    isModalOpen,
    type,
    message,
    description,
    button,
    onCloseHandler,
    icon,
    closable = true,
    dataTestId,
}: TCalendarAlertProps) => (
    <Modal
        open={isModalOpen}
        className={styles.modal}
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
            message={<Text data-test-id='modal-error-user-training-title'>{message}</Text>}
            description={
                <Text data-test-id='modal-error-user-training-subtitle'>{description}</Text>
            }
            icon={icon}
            showIcon
            closeIcon={<CloseOutlined data-test-id='modal-error-user-training-button-close' />}
            closable={closable}
            onClose={onCloseHandler}
        />
    </Modal>
);
