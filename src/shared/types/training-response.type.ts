import { TrainingName } from '@shared/types/training-name.type';
import { Exercise } from '@shared/types/exersice.type';
import { TrainingParameters } from './training-parameters.type';

export type TrainingResponse = {
    _id: string;
    name: TrainingName;
    date: string;
    isImplementation: boolean;
    userId: string;
    parameters: TrainingParameters;
    exercises: Exercise[];
};
