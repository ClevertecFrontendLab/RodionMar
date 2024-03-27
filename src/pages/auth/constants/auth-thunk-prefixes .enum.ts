import { AUTH_PREFIX } from "./auth-prefix";

export enum AuthThunkPrefix {
    FETCH_SIGN_IN = `${AUTH_PREFIX}/fetchSignIn`,
    FETCH_SIGN_UP = `${AUTH_PREFIX}/fetchSignUp`,
    FETCH_CHECK_EMAIL = `${AUTH_PREFIX}/fetchCheckEmail`,
    FETCH_CONFIRM_EMAIL = `${AUTH_PREFIX}/fetchConfirmEmail`,
    FETCH_CHANGE_PASSWORD = `${AUTH_PREFIX}/fetchChangePassword`,
    FETCH_GOOGLE_AUTH = `${AUTH_PREFIX}/fetchGoogleAuth`,
}
