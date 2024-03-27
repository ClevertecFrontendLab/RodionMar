import { TrainingNameEnum } from '@constants/training-name.enum';

export type TrainingName =
    | TrainingNameEnum.LEGS
    | TrainingNameEnum.STRENGTH
    | TrainingNameEnum.ARMS
    | TrainingNameEnum.CHEST
    | TrainingNameEnum.BACK
    | TrainingNameEnum.CARDIO;
