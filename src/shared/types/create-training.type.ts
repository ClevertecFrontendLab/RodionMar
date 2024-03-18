import { TExercise } from './exersice.type';

export type TCreateTraining = {
    name: string;
    date: string;
    isImplementation?: boolean;
    parameters?: {
        repeat: boolean;
        period: number;
        jointTraining: boolean;
        participants: string[];
    };
    exercises: TExercise[];
};
