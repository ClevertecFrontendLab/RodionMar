import { Exercise } from './exersice.type';

export type CreateTraining = {
    name: string;
    date: string;
    isImplementation?: boolean;
    parameters?: {
        repeat: boolean;
        period: number;
        jointTraining: boolean;
        participants: string[];
    };
    exercises: Exercise[];
};
