const PROFILE_PREFIX = 'profile';

export enum ProfileThunkPrefix {
    FETCH_PROFILE = `${PROFILE_PREFIX}/fetchProfile`,
    UPDATE_PROFILE = `${PROFILE_PREFIX}/updateProfile`,
    UPLOAD_IMAGE = `${PROFILE_PREFIX}/uploadImage`,
}
