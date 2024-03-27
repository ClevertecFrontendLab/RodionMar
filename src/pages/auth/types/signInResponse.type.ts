export type SignInResponse = {
    meta: {
        requestStatus: string;
    };
    payload: {
        accessToken: string;
    };
    type?: string;
};
