import { AUTH_PREFIX } from "./auth-prefix";

export enum AuthEndpointEnum {
    AUTH_LOGIN = `/${AUTH_PREFIX}/login`,
    AUTH_REGISTRATION = `/${AUTH_PREFIX}/registration`,
    AUTH_CHECK_EMAIL = `/${AUTH_PREFIX}/check-email`,
    AUTH_CONFIRM_EMAIL = `/${AUTH_PREFIX}/confirm-email`,
    AUTH_CHANGE_PASSWORD = `/${AUTH_PREFIX}/change-password`,
    AUTH_GOOGLE = `/${AUTH_PREFIX}/google`,
}
