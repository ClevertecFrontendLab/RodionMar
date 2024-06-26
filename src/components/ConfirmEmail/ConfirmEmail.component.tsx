import { useState } from 'react';

import { Space, Typography, Image } from 'antd';

import cn from 'classnames';

import VerificationInput from 'react-verification-input';

import { ConfirmEmail } from '@shared/types/confirm-email.type';

import styles from './index.module.scss';

const { Title, Text } = Typography;

type ConfirmEmailProps = {
    handleConfirmEmail: (data: ConfirmEmail) => void;
    status?: 'execute' | 'error';
};

export const ConfirmEmailComponent = ({
    handleConfirmEmail,
    status = 'execute',
}: ConfirmEmailProps) => {
    const [verificationValue, setVerificationValue] = useState('');

    const confirmEmailData = localStorage.getItem('checkEmailData') || '';

    const onCompleteHandler = (value: string) => {
        const data = {
            email: confirmEmailData,
            code: value,
        };

        handleConfirmEmail(data);

        setVerificationValue('');

        return '';
    };

    let iconSrc = '';
    switch (status) {
        case 'error':
            iconSrc = '../../../Error.svg';
            break;
        case 'execute':
            iconSrc = '../../../Execute.svg';
            break;
    }

    return (
        <Space className={styles.wrapper} direction='vertical' size='large' align='center'>
            <Image src={iconSrc} alt='result icon' preview={false} className={styles.resultIcon} />
            <Space.Compact className={styles.textWrapper}>
                <Title className={styles.title}>
                    {status === 'execute' ? (
                        <>
                            Введите код
                            <br />
                            для восстановления аккаунта
                        </>
                    ) : (
                        'Неверный код. Введите код для восстановления аккауанта'
                    )}
                </Title>
                <Text className={styles.description}>
                    Мы отправили вам на e-mail {<b>{confirmEmailData}</b>}
                    <br />
                    шестизначный код. Введите его в поле ниже.
                </Text>
            </Space.Compact>
            <VerificationInput
                onComplete={onCompleteHandler}
                onChange={(value) => setVerificationValue(value)}
                value={verificationValue}
                placeholder={''}
                classNames={{
                    container: styles.codeContainer,
                    characterInactive: styles.characterInactive,
                    character: cn(
                        styles.character,
                        status === 'error' ? styles.errorCharacter : null,
                    ),
                }}
                inputProps={{
                    'data-test-id': 'verification-input',
                }}
            />
            <Text className={cn(styles.description, styles.lastDesription)}>
                Не пришло письмо? Проверьте папку Спам.
            </Text>
        </Space>
    );
};
