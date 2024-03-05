export type TSignInResponse = {
    meta: {
        requestStatus: string;
    };
    payload: {
        accessToken: string;
    };
    type?: string;
};
