import { Modal, Result } from 'antd';

import styles from './index.module.scss';

type TResultModalProps = {
    isModalOpen: boolean;
    status: 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500';
    title: string;
    subTitle: React.ReactNode | null;
    button: React.ReactNode;
    resultClassName?: string;
    dataTestId?: string;
};

export const ResultModal = ({
    isModalOpen,
    status,
    title,
    subTitle,
    button,
    resultClassName,
    dataTestId,
}: TResultModalProps) => {
    return (
        <Modal
            centered
            open={isModalOpen}
            className={styles.wrapper}
            wrapClassName={styles.modalWrapper}
            width={540}
            footer={null}
            data-test-id={dataTestId}
        >
            <Result
                className={resultClassName}
                status={status}
                title={title}
                subTitle={subTitle}
                extra={button}
            />
        </Modal>
    );
};
