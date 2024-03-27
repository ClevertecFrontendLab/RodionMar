import { Exercise } from './exersice.type';
import { TrainingParameters } from './training-parameters.type';

export type TrainingRequest = {
    _id?: string;
    name: string;
    date: string;
    isImplementation?: boolean;
    parameters?: TrainingParameters;
    exercises: Omit<Exercise[], '_id'>;
};
