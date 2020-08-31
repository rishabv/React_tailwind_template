import auth from '../../../helpers/auth';
import fetch from 'isomorphic-fetch';
import objectWithProps from '../../../helpers/objectWithProps';

export const ACCOUNT_P_SET_ACCOUNT_INFO = 'ACCOUNT_P_SET_ACCOUNT_INFO';
export const ACCOUNT_P_SET_FIRST_NAME = 'ACCOUNT_P_SET_FIRST_NAME';
export const ACCOUNT_P_SET_LAST_NAME = 'ACCOUNT_P_SET_LAST_NAME';
export const ACCOUNT_P_SET_LOGIN_NAME = 'ACCOUNT_P_SET_LOGIN_NAME';
export const ACCOUNT_P_SET_USER_EMAIL = 'ACCOUNT_P_SET_USER_EMAIL';
export const ACCOUNT_P_SET_SUBSCRIBE_NEWSLETTERS = 'ACCOUNT_P_SET_SUBSCRIBE_NEWSLETTERS';
export const ACCOUNT_P_SET_STREET = 'BUSINESS_INFO_P_SET_STREET';
export const ACCOUNT_P_SET_COUNTRY_NAME = 'BUSINESS_INFO_P_SET_COUNTRY_NAME';
export const ACCOUNT_P_SET_POSTAL_CODE = 'BUSINESS_INFO_P_SET_POSTAL_CODE';
export const ACCOUNT_P_SEND_DATA_MESSAGE = 'ACCOUNT_P_SEND_DATA_MESSAGE';
export const ACCOUNT_P_SET_IS_ERR_MESSAGE = 'ACCOUNT_P_SET_IS_ERR_MESSAGE';
export const ACCOUNT_P_SET_IS_ADMIN = 'ACCOUNT_P_SET_IS_ADMIN';
export const ACCOUNT_P_SET_MEMBER_STATUS = 'ACCOUNT_P_SET_USER_STATUS';

export function setAccountInfo (data) {
    return {
        type: ACCOUNT_P_SET_ACCOUNT_INFO,
        payload: data
    };
}
export function setFirstName (value) {
    return {
        type: ACCOUNT_P_SET_FIRST_NAME,
        payload: value
    };
}
export function setLastName (value) {
    return {
        type: ACCOUNT_P_SET_LAST_NAME,
        payload: value
    };
}
export function setLoginName (value) {
    return {
        type: ACCOUNT_P_SET_LOGIN_NAME,
        payload: value
    };
}
export function setUserEmail (value) {
    return {
        type: ACCOUNT_P_SET_USER_EMAIL,
        payload: value
    };
}
export function setSubscribeNewsletters (status) {
    return {
        type: ACCOUNT_P_SET_SUBSCRIBE_NEWSLETTERS,
        payload: status
    };
}
export function setStreet (value) {
    return {
        type: ACCOUNT_P_SET_STREET,
        payload: value
    };
}
export function setCountryName (value) {
    return {
        type: ACCOUNT_P_SET_COUNTRY_NAME,
        payload: value
    };
}
export function setPostalCode (value) {
    return {
        type: ACCOUNT_P_SET_POSTAL_CODE,
        payload: value
    };
}
// SEND DATA RES MESSAGE ACTION CREATORS
export function setSendMessage (value) {
    return {
        type: ACCOUNT_P_SEND_DATA_MESSAGE,
        payload: value
    };
}
export function setIsErrMessage (value) {
    return {
        type: ACCOUNT_P_SET_IS_ERR_MESSAGE,
        payload: value
    };
}
//
export function setIsAdmin (value) {
    return {
        type: ACCOUNT_P_SET_IS_ADMIN,
        payload: value
    };
}
export function setMemberStatus (value) {
    return {
        type: ACCOUNT_P_SET_MEMBER_STATUS,
        payload: value
    };
}

export function sendChangedAccountSettings () {
    return async (dispatch, getState) => {
        const token = auth.getAccessToken();
        const csrf = auth.getCSRFToken();
        if (token && csrf) {
            const state = await getState().accountState.accountInfo;
            const data = await objectWithProps(state,
                [
                    'firstName',
                    'lastName',
                    'mail',
                    'loginName',
                    'subscribeNewsletters'
                ]
            );
            data.accountAddress = {
                countryName: state.accountAddress.countryName,
                street: state.accountAddress.street,
                postalCode: state.accountAddress.postalCode
            };
            try {
                let result = await fetch(`${__API__}/api/v1.1/users/me`, {
                    method: 'PUT',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'access-token': token,
                        'X-CSRF-Token': csrf
                    },
                    body: JSON.stringify(data).replace(/\s*\u0022\s*/g, '"')
                });
                let json = await result.json();
                console.log("user");
                console.log(json);

                if (Object.keys(json.data[0]).length) {
                    await dispatch(setSendMessage('Details saved!'));
                    await dispatch(setIsErrMessage(false));
                }
            } catch (e) {
                console.log(e);
                await dispatch(setSendMessage("Can't save new details"));
                await dispatch(setIsErrMessage(true));
            }
        } else {
            await dispatch(setSendMessage("You don't have access to save"));
            await dispatch(setIsErrMessage(true));
        }
        await setTimeout(() => {
            dispatch(setSendMessage(''));
            dispatch(setIsErrMessage(false));
        }, 2000);
    };
}

export const actions = {
    setFirstName,
    setLastName,
    setLoginName,
    setUserEmail,
    setSubscribeNewsletters,
    setStreet,
    setCountryName,
    setPostalCode,
    sendChangedAccountSettings
};

const ACTION_HANDLERS = {
    [ACCOUNT_P_SET_ACCOUNT_INFO]: (state, action) => {
        return {
            ...state,
            accountInfo: action.payload
        };
    },
    [ACCOUNT_P_SET_FIRST_NAME]: (state, action) => {
        return {
            ...state,
            accountInfo: {
                ...state.accountInfo,
                firstName: action.payload
            }
        };
    },
    [ACCOUNT_P_SET_LAST_NAME]: (state, action) => {
        return {
            ...state,
            accountInfo: {
                ...state.accountInfo,
                lastName: action.payload
            }
        };
    },
    [ACCOUNT_P_SET_LOGIN_NAME]: (state, action) => {
        return {
            ...state,
            accountInfo: {
                ...state.accountInfo,
                loginName: action.payload
            }
        };
    },
    [ACCOUNT_P_SET_USER_EMAIL]: (state, action) => {
        return {
            ...state,
            accountInfo: {
                ...state.accountInfo,
                mail: action.payload
            }
        };
    },
    [ACCOUNT_P_SET_SUBSCRIBE_NEWSLETTERS]: (state, action) => {
        return {
            ...state,
            accountInfo: {
                ...state.accountInfo,
                subscribeNewsletters: action.payload
            }
        };
    },
    [ACCOUNT_P_SET_STREET]: (state, action) => {
        return {
            ...state,
            accountInfo: {
                ...state.accountInfo,
                accountAddress: {
                    ...state.accountInfo.accountAddress,
                    street: action.payload
                }
            }
        };
    },
    [ACCOUNT_P_SET_COUNTRY_NAME]: (state, action) => {
        return {
            ...state,
            accountInfo: {
                ...state.accountInfo,
                accountAddress: {
                    ...state.accountInfo.accountAddress,
                    countryName: action.payload
                }
            }
        };
    },
    [ACCOUNT_P_SET_POSTAL_CODE]: (state, action) => {
        return {
            ...state,
            accountInfo: {
                ...state.accountInfo,
                accountAddress: {
                    ...state.accountInfo.accountAddress,
                    postalCode: action.payload
                }
            }
        };
    },
    // SAVE MESSAGES REDUCERS
    [ACCOUNT_P_SEND_DATA_MESSAGE]: (state, action) => {
        return {
            ...state,
            sendMessage: action.payload
        };
    },
    [ACCOUNT_P_SET_IS_ERR_MESSAGE]: (state, action) => {
        return {
            ...state,
            isErrMessage: action.payload
        };
    },
    //
    [ACCOUNT_P_SET_IS_ADMIN]: (state, action) => {
        return {
            ...state,
            isAdmin: action.payload
        };
    },
    [ACCOUNT_P_SET_MEMBER_STATUS]: (state, action) => {
        let status = '';
        if (action.payload === '99' || action.payload === '1A') {
            status = 'non-upgraded';
        } else if (action.payload === '3C') {
            status = 'upgraded';
        }
        return {
            ...state,
            memberStatus: status
        };
    }
};

const initialState = {
    accountInfo: {
        firstName: '',
        lastName: '',
        mail: '',
        loginName: '',
        status: '',
        subscribeNewsletters: false,
        roles: [],
        balanceForThisPeriod: 0,
        accountAddress: {
            street: null,
            countryName: null,
            postalCode: null
        },
        upgradeAction: {}
    },
    isAdmin: false,
    memberStatus: false,
    sendMessage: '',
    isErrMessage: false
};

export default function accountReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
