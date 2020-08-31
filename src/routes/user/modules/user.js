import auth from '../../../helpers/auth';
import fetch from 'isomorphic-fetch';
import objectWithProps from '../../../helpers/objectWithProps';

export const USER_P_SET_USER_DATA = 'USER_P_SET_USER_DATA';

export function setUserData (data) {
    return {
        type: USER_P_SET_USER_DATA,
        payload: data
    };
}

export function getUser (uuid) {
    return async (dispatch, getState) => {
        const token = auth.getAccessToken();
        if (token) {
            try {
                let result = await fetch(`${__API__}/api/v1.1/users?filter[uuid]=${uuid}`, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/vnd.api+json; charset=utf-8',
                        'Accept': 'application/json',
                        'access-token': token
                    }
                });
                let json = await result.json();
                if (Object.keys(json.data[0]).length) {
                    await dispatch(setUserData(objectWithProps(
                        json.data[0],
                        [
                            'firstName',
                            'lastName',
                            'mail',
                            'loginName',
                            'status',
                            'roles',
                            'subscribeNewsletters',
                            'balanceForThisPeriod',
                            'accountAddress',
                            'plannedContacts'
                        ])
                    ));
                }
            } catch (e) {
                console.log(e);
            }
        }
    };
}

export const actions = {
    getUser
};

const ACTION_HANDLERS = {
    [USER_P_SET_USER_DATA]: (state, action) => {
        return {
            ...state,
            userData: action.payload
        };
    }
};

const initialState = {
    userData: {
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
        }
    }
};

export default function userReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
