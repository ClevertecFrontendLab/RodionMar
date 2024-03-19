import { Badge } from 'antd';

import { TTrainingName } from '@shared/types/training-name.type';

import cn from 'classnames';

import styles from './index.module.scss';

const colors: Record<TTrainingName, string> = {
    Ноги: '#ff4d4f',
    Силовая: '#FADB14',
    Руки: '#13C2C2',
    Грудь: '#52C41A',
    Спина: '#FA8C16',
    Кардио: '#EB2F96',
};

type TCustomBadgeProps = {
    name: TTrainingName;
    className?: string;
};

export const BadgeComponent = ({ name, className }: TCustomBadgeProps) => {
    switch (name) {
        case 'Ноги':
        case 'Силовая':
        case 'Руки':
        case 'Грудь':
        case 'Спина':
        case 'Кардио':
            return (
                <Badge className={cn(styles.badge, className)} color={colors[name]} text={name} />
            );
        default:
            return null;
    }
};
