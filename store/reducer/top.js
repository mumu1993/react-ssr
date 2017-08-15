//inital state
import initState from '../initalState';

const prefix = 'TOP'

export const actionTypes = {
    QUERY: `${prefix}.QUERY`,
}


// reducer
export default (state = initState.top, { type, payload }) => {
    switch (type) {
        case actionTypes.QUERY:
            return Object.assign({}, state, {
                tops: payload,
            })
        default:
            return state
    }
}
