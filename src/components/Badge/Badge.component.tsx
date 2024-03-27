import { Badge } from 'antd';

import { TrainingName } from '@shared/types/training-name.type';

import cn from 'classnames';

import styles from './index.module.scss';
import { TrainingNameEnum } from '@constants/training-name.enum';

const colors: Record<TrainingName, string> = {
    Ноги: '#ff4d4f',
    Силовая: '#FADB14',
    Руки: '#13C2C2',
    Грудь: '#52C41A',
    Спина: '#FA8C16',
    Кардио: '#EB2F96',
};

type CustomBadgeProps = {
    name: TrainingName;
    className?: string;
};

export const BadgeComponent = ({ name, className }: CustomBadgeProps) => {
    switch (name) {
        case TrainingNameEnum.LEGS:
        case TrainingNameEnum.STRENGTH:
        case TrainingNameEnum.ARMS:
        case TrainingNameEnum.CHEST:
        case TrainingNameEnum.BACK:
        case TrainingNameEnum.CARDIO:
            return (
                <Badge className={cn(styles.badge, className)} color={colors[name]} text={name} />
            );
        default:
            return null;
    }
};
