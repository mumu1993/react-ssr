//inital state
const initState = {
    categories: [],
    tags: [],
}

export const actionTypes = {
    QUERY_CATEGORY: 'QUERY_CATEGORY',
    QUERY_TAG: 'QUERY_TAG',
}

// reducer
export default (state = initState, { type, payload }) => {
    switch (type) {
        case actionTypes.QUERY_CATEGORY:
            return Object.assign({}, state, {
                categories: payload,
            })
        case actionTypes.QUERY_TAG:
            return Object.assign({}, state, {
                tags: payload,
            })
        default:
            return state
    }
}
