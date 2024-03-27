export type CheckEmailResponse = {
    meta: {
        requestStatus: string;
    };
    payload: {
        email: string;
        status: number;
        message: string;
    };
};
