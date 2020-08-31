import fetch from 'isomorphic-fetch';

export const FORGOT_P_SET_ERR_LOGIN_MESSAGE = 'FORGOT_P_SET_ERR_LOGIN_MESSAGE';
export const FORGOT_P_SET_LOGIN_SPINNER_STATUS = 'FORGOT_P_SET_LOGIN_SPINNER_STATUS';

export function setErrLoginMessage (value) {
    return {
        type: FORGOT_P_SET_ERR_LOGIN_MESSAGE,
        payload: value
    };
}
export function setLoginSpinnerStatus (value) {
    return {
        type: FORGOT_P_SET_LOGIN_SPINNER_STATUS,
        payload: value
    };
}

export function sendVerificationCode (data) {
    return async (dispatch) => {
        console.log("m here");
        //return false;
        //await dispatch(setErrLoginMessage(''));
        //await dispatch(setLoginSpinnerStatus(true));
        //const username = data.userName;
        try {
            let result = await fetch(`${__API__}/api/v1.0/verificationcode`, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data).replace(/\s*\u0022\s*/g, '"')
            });

            let json = await result.json();
            console.log(json);
            /*if (json.status === 401) {
                await dispatch(setLoginSpinnerStatus(false));
                dispatch(setErrLoginMessage(
                    `Sorry, unrecognized username`)
                );
            } else if (json) {
                await dispatch(setLoginSpinnerStatus(false));
                console.log('Verification Sent');
                dispatch(setErrLoginMessage(
                    `Verification code sent to your email.`)
                );
            }*/
        } catch (e) {
          /*  await dispatch(setLoginSpinnerStatus(false));
            dispatch(setErrLoginMessage('Something went wrong!!!'));
            console.log(e); */
        }
    };
}

export const actions = {
    sendVerificationCode,
    setErrLoginMessage
};

const initialState = {
    errLoginMessage: '',
    logInSpinner: false
};

const ACTION_HANDLERS = {
    [FORGOT_P_SET_ERR_LOGIN_MESSAGE]: (state, action) => {
        return {
            ...state,
            errLoginMessage: action.payload
        };
    },
    [FORGOT_P_SET_LOGIN_SPINNER_STATUS]: (state, action) => {
        return {
            ...state,
            logInSpinner: action.payload
        };
    }
};

export default function forgotReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
