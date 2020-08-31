import { setModal } from '../../selectWrapper/modules/select';
import auth from '../../../helpers/auth';
import _without from 'lodash/without';
import _remove from 'lodash/remove';
import _get from 'lodash/get';
import fetch from 'isomorphic-fetch';
import asyncForEach from '../../../helpers/asyncForEach';
import moment from 'moment';

// DUMMY
export const DASH_DUMMY = 'DASH_DUMMY';

// ADMIN ACTION CREATORS
export function setDummy (value) {
    return {
        type: DASH_DUMMY,
        payload: value
    };
}

// Side func for saving note edit
export function saveDummy () {
    return async (dispatch, getState) => {
        const token = auth.getAccessToken();
        const csrf = auth.getCSRFToken();
        if (token && csrf) {
            const notes = await getState().dashboardState.dummy;
            try {
                let result = await fetch(`${__API__}/api/users/me`, {
                    method: 'PUT',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'access-token': token,
                        'X-CSRF-Token': csrf
                    },
                    body: JSON.stringify({ notes: notes })
                });
                let json = await result.json();
                if (Object.keys(json.data[0]).length) {
                    await dispatch(setDataSendMessageNotes('Saved!'));
                    await dispatch(setIsErrMessageNotes(false));
                    await dispatch(setAdminNotesManageStatus(false));
                }
            } catch (e) {
                console.log(e);
                await dispatch(setDataSendMessageNotes("Can't save new notes!"));
                await dispatch(setIsErrMessageNotes(true));
            }
        } else {
            await dispatch(setDataSendMessageNotes("You don't have access to save"));
            await dispatch(setIsErrMessageNotes(true));
        }
        await setTimeout(() => {
            dispatch(setDataSendMessageNotes(''));
            dispatch(setIsErrMessageNotes(false));
        }, 2000);
    };
}

export function getArticles () {
    return async (dispatch) => {
        const token = auth.getAccessToken();
        if (token) {
            try {
                let result = await fetch(`${__API__}/api/article?sort=-created&range=3`, {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/drupal.single+json; charset=utf-8',
                        'Accept': 'application/json',
                        'access-token': token
                    }
                });
                let json = await result.json();

                if (json.data.length) {
                    await dispatch(setNews(json.data));
                } else {
                    await dispatch(setNews([]));
                }
            } catch (e) {
                await dispatch(setNews([]));
                console.log(e);
            }
        } else {
            await dispatch(setNews([]));
        }
    };
}

export function deleteReqPlannedCall (deleteItemName) {
    return async (dispatch) => {
        const token = auth.getAccessToken();
        if (token && deleteItemName) {
            try {
                await fetch(`${__API__}/api/v1.0/planned_contacts/${deleteItemName}`, {
                    method: 'DELETE',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'access-token': token
                    }
                });
                await dispatch(deletePlannedCall(deleteItemName));
            } catch (e) {
                console.log(e);
            }
        }
    };
}

export const actions = {
    
};

const ACTION_HANDLERS = {
    // ADMIN_REDUCERS
    [DASH_DUMMY]: (state, action) => {
        return {
            ...state,
            dummy: action.payload
        };
    },
    
};

const initialState = {
    

};

export default function homeReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
