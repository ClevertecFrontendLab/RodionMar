import { TExercise } from './exersice.type';
import { TParameters } from '../../pages/calendar/types/parameters.type';

export type TTrainingRequest = {
    _id?: string;
    name: string;
    date: string;
    isImplementation?: boolean;
    parameters?: TParameters;
    exercises: Omit<TExercise[], '_id'>;
};
