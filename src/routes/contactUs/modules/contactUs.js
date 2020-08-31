export const actions = {};
const ACTION_HANDLERS = {};

const initialState = {};

export default function contactUsReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
