import { Exercise } from './exersice.type';
import { TrainingParameters } from './training-parameters.type';

export type TrainingRequest = {
    name: string;
    date: string;
    exercises: Omit<Exercise[], '_id'>;
    _id?: string;
    isImplementation?: boolean;
    parameters?: TrainingParameters;
};
