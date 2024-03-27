import { Exercise } from './exersice.type';

export type CreateTraining = {
    name: string;
    date: string;
    exercises: Exercise[];
    isImplementation?: boolean;
    parameters?: {
        repeat: boolean;
        period: number;
        jointTraining: boolean;
        participants: string[];
    };
};
