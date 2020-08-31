// import { push } from 'react-router-redux';

export const TEST_404_HOME = 'TEST_404_HOME';

export function set404Error (value) {
    return {
        type: TEST_404_HOME,
        payload: value
    };
}

export const actions = {
    set404Error
};

const ACTION_HANDLERS = {
    [TEST_404_HOME]: (state, action) => {
        return {
            ...state,
            errorCode: action.payload.code,
            error: action.payload
        };
    }
};
const initialState = { errorCode: '', error: {} };

export default function error404Reducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
