import { Modal, Result } from 'antd';

import cn from 'classnames';

import styles from './index.module.scss';

type TResultModalProps = {
    isModalOpen: boolean;
    status: 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500';
    title: React.ReactNode;
    subTitle: React.ReactNode | null;
    extra: React.ReactNode;
    resultClassName?: string;
    dataTestId?: string;
    closable?: boolean;
    onCancelHandler?: () => void;
};

export const ResultModal = ({
    isModalOpen,
    status,
    title,
    subTitle,
    extra,
    resultClassName,
    dataTestId,
    closable,
    onCancelHandler,
}: TResultModalProps) => {
    return (
        <Modal
            centered
            open={isModalOpen}
            className={cn(styles.modal, closable ? styles.closableModal : styles.unClosableModal)}
            wrapClassName={styles.modalWrapper}
            width={540}
            footer={null}
            data-test-id={dataTestId}
            closable={closable}
            onCancel={onCancelHandler}
            mask={false}
            zIndex={5}
        >
            <Result
                className={resultClassName}
                status={status}
                title={title}
                subTitle={subTitle}
                extra={extra}
            />
        </Modal>
    );
};
