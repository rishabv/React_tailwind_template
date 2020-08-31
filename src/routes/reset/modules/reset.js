import fetch from 'isomorphic-fetch';
import auth from '../../../helpers/auth';

export const RESET_P_SET_ERR_LOGIN_MESSAGE = 'RESET_P_SET_ERR_LOGIN_MESSAGE';
export const RESET_P_SET_LOGIN_SPINNER_STATUS = 'RESET_P_SET_LOGIN_SPINNER_STATUS';

export function setErrLoginMessage (value) {
    return {
        type: RESET_P_SET_ERR_LOGIN_MESSAGE,
        payload: value
    };
}
export function setLoginSpinnerStatus (value) {
    return {
        type: RESET_P_SET_LOGIN_SPINNER_STATUS,
        payload: value
    };
}

export function changePassword (data) {
    return async (dispatch) => {
        await dispatch(setErrLoginMessage(''));
        await dispatch(setLoginSpinnerStatus(true));
        const token = `Basic ${btoa(`${data.userName}:${data.loginPassword}`)}`;
        try {
            let result = await fetch(`${__API__}/api/login-token`, {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json',
                    'Authorization': token
                }
            });

            let jsonLoginToken = await result.json();

            let resultCSRF = await fetch(`${__API__}/api/session/token`, {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json',
                    'Authorization': token
                }
            });

            let jsonCSRF = await resultCSRF.json();
            if (jsonLoginToken.status === 401) {
                await dispatch(setLoginSpinnerStatus(false));
                dispatch(setErrLoginMessage(
                    `Sorry, unrecognized username or password`)
                );
            } else if (jsonLoginToken.access_token && jsonCSRF['X-CSRF-Token']) {
                await dispatch(setLoginSpinnerStatus(false));
                await auth.setTokens(jsonLoginToken.access_token, jsonLoginToken.refresh_token, jsonCSRF['X-CSRF-Token']);
                await data.history.push('/');
            }
        } catch (e) {
            await dispatch(setLoginSpinnerStatus(false));
            dispatch(setErrLoginMessage('Something went wrong!!!'));
            console.log(e);
        }
    };
}

export const actions = {
    changePassword,
    setErrLoginMessage
};

const initialState = {
    authToken : '',
    errLoginMessage: '',
    logInSpinner: false
};

const ACTION_HANDLERS = {
    [RESET_P_SET_ERR_LOGIN_MESSAGE]: (state, action) => {
        return {
            ...state,
            errLoginMessage: action.payload
        };
    },
    [RESET_P_SET_LOGIN_SPINNER_STATUS]: (state, action) => {
        return {
            ...state,
            logInSpinner: action.payload
        };
    }
};

export default function resetReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
