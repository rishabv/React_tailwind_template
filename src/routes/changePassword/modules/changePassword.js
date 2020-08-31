import fetch from 'isomorphic-fetch';
import auth from '../../../helpers/auth';

export const CHANGE_PASSWORD_P_SET_ERR_LOGIN_MESSAGE = 'CHANGE_PASSWORD_P_SET_ERR_LOGIN_MESSAGE';
export const CHANGE_PASSWORD_P_SET_LOGIN_SPINNER_STATUS = 'CHANGE_PASSWORD_P_SET_LOGIN_SPINNER_STATUS';
export const CHANGE_PASSWORD_P_SET_SUCCESS_MESSAGE = 'CHANGE_PASSWORD_P_SET_SUCCESS_MESSAGE';

export function setErrChangePasswordMessage (value) {
    return {
        type: CHANGE_PASSWORD_P_SET_ERR_LOGIN_MESSAGE,
        payload: value
    };
}
export function setChangePasswordSpinnerStatus (value) {
    return {
        type: CHANGE_PASSWORD_P_SET_LOGIN_SPINNER_STATUS,
        payload: value
    };
}
export function setSuccessChangePasswordMessage (value) {
    return {
        type: CHANGE_PASSWORD_P_SET_SUCCESS_MESSAGE,
        payload: value
    };
}
export function changePassword (data,history) {
    return async (dispatch) => {
        await dispatch(setErrChangePasswordMessage(''));
        await dispatch(setChangePasswordSpinnerStatus(true));
        const token = auth.getAccessToken();
        try {
            /*delete data.hasError;
            delete data.isErr;
            delete data.msg;
            delete data.pageLoad;
            delete data.spin;*/
            console.log(data);
            let result = await fetch(`${__API__}/api/v1.0/change_password`, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json',
                    'access-token': token
                },
                body: JSON.stringify({...data}).replace(/\s*\u0022\s*/g, '"')
            });

            let json = await result.json();
            console.log(json);
            if(json.success === true) {
                dispatch(setSuccessChangePasswordMessage('Password changed successfully.'));
            }
            await dispatch(setChangePasswordSpinnerStatus(false));
        } catch (e) {
            await dispatch(setChangePasswordSpinnerStatus(false));
            dispatch(setErrChangePasswordMessage('Something went wrong!!!'));
            console.log(e);
        }
    };
}

export const actions = {
    changePassword,
    setErrChangePasswordMessage
};

const initialState = {
    authToken : '',
    errChangePasswordMessage: '',
    successChangePasswordMessage: '',
    changePasswordSpinner: false
};

const ACTION_HANDLERS = {
    [CHANGE_PASSWORD_P_SET_SUCCESS_MESSAGE]: (state, action) => {
        return {
            ...state,
            successChangePasswordMessage: action.payload
        };
    },
    [CHANGE_PASSWORD_P_SET_ERR_LOGIN_MESSAGE]: (state, action) => {
        return {
            ...state,
            errChangePasswordMessage: action.payload
        };
    },
    [CHANGE_PASSWORD_P_SET_LOGIN_SPINNER_STATUS]: (state, action) => {
        return {
            ...state,
            changePasswordSpinner: action.payload
        };
    }
};

export default function changePasswordReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
