import { TProfileRequest } from './profile-request.type';

export type TProfileResponse = Omit<TProfileRequest, 'password'> & {
    tariff: {
        tariffId: string;
        expired: string;
    };
};
