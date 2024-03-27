import { ProfileRequest } from './profile-request.type';

export type ProfileResponse = Omit<ProfileRequest, 'password'> & {
    tariff: {
        tariffId: string;
        expired: string;
    };
};
