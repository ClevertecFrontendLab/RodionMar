import { TrainingNameEnum } from '@constants/training-name.enum';

export type TTrainingName =
    | TrainingNameEnum.LEGS
    | TrainingNameEnum.STRENGTH
    | TrainingNameEnum.ARMS
    | TrainingNameEnum.CHEST
    | TrainingNameEnum.BACK
    | TrainingNameEnum.CARDIO;
