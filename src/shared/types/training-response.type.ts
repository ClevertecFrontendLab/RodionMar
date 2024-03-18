import { TTrainingName } from '@shared/types/training-name.type';
import { TExercise } from '@shared/types/exersice.type';
import { TParameters } from '@pages/calendar/types/parameters.type';

export type TTrainingResponse = {
    _id: string;
    name: TTrainingName;
    date: string;
    isImplementation: boolean;
    userId: string;
    parameters: TParameters;
    exercises: TExercise[];
};
