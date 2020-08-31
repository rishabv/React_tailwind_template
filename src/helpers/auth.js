import moment from 'moment/moment';

const ACCESS_TOKEN = 'ACCESS_TOKEN';
const REFRESH_TOKEN = 'REFRESH_TOKEN';
const X_CSRF_TOKEN = 'X-CSRF-Token';
const DATE_LOGIN = 'DATE_LOGIN';

const ACCESS_TOKEN_ADMIN = 'ACCESS_TOKEN_ADMIN';
const REFRESH_TOKEN_ADMIN = 'REFRESH_TOKEN_ADMIN';
const X_CSRF_TOKEN_ADMIN = 'X-CSRF-Token_ADMIN';
const DATE_LOGIN_ADMIN = 'DATE_LOGIN_ADMIN';

export default {
    getAccessToken () {
        return localStorage.getItem(ACCESS_TOKEN);
    },
    getCSRFToken () {
        return localStorage.getItem(X_CSRF_TOKEN);
    },
    getRefreshoken () {
        return localStorage.getItem(REFRESH_TOKEN);
    },
    getDateLogin () {
        return localStorage.getItem(DATE_LOGIN);
    },
    getAdminAccessToken () {
        return localStorage.getItem(ACCESS_TOKEN_ADMIN);
    },
    getAdminCSRFToken () {
        return localStorage.getItem(X_CSRF_TOKEN_ADMIN);
    },
    getAdminRefreshoken () {
        return localStorage.getItem(REFRESH_TOKEN_ADMIN);
    },
    getAdminDateLogin () {
        return localStorage.getItem(DATE_LOGIN_ADMIN);
    },
    setAdminTokens(access,refresh,csrf) {
      localStorage.setItem(ACCESS_TOKEN_ADMIN, access);
      localStorage.setItem(REFRESH_TOKEN_ADMIN, refresh);
      localStorage.setItem(X_CSRF_TOKEN_ADMIN, csrf);
      localStorage.setItem(DATE_LOGIN_ADMIN, moment(new Date()).format());
    },
    setTokens (access, refresh, csrf) {
        localStorage.setItem(ACCESS_TOKEN, access);
        localStorage.setItem(REFRESH_TOKEN, refresh);
        localStorage.setItem(X_CSRF_TOKEN, csrf);
        localStorage.setItem(DATE_LOGIN, moment(new Date()).format());
    },
    removeAccessToken () {
        localStorage.removeItem(ACCESS_TOKEN);
    },
    removeRefreshToken () {
        localStorage.removeItem(REFRESH_TOKEN);
    },
    removeCSRFToken () {
        localStorage.removeItem(X_CSRF_TOKEN);
    },
    removeDateLogin () {
        localStorage.removeItem(DATE_LOGIN);
    },
    async resetLoginStore () {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        localStorage.removeItem(X_CSRF_TOKEN);
        localStorage.removeItem(DATE_LOGIN);
        localStorage.removeItem(ACCESS_TOKEN_ADMIN);
        localStorage.removeItem(REFRESH_TOKEN_ADMIN);
        localStorage.removeItem(X_CSRF_TOKEN_ADMIN);
        localStorage.removeItem(DATE_LOGIN_ADMIN);
        localStorage.removeItem('persist:lsd');
    },
    async resetAdminLoginStore () {
        localStorage.removeItem(ACCESS_TOKEN_ADMIN);
        localStorage.removeItem(REFRESH_TOKEN_ADMIN);
        localStorage.removeItem(X_CSRF_TOKEN_ADMIN);
        localStorage.removeItem(DATE_LOGIN_ADMIN);
    },
    get isAuthenticated () {
        try {
            return !!this.getAccessToken();
        } catch (e) {
            console.log(e);
            return false;
        }
    }
};
