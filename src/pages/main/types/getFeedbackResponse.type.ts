import { TGetFeedback } from '@shared/get-feedback.type';

export type TGetFeedbackResponse = {
    meta: {
        requestStatus: string;
    };
    payload: {
        status: number;
        data: TGetFeedback[];
    };
};
