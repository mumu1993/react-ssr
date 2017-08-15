import initState from '../initalState';

const prefix = 'TOPIC'

export const actionTypes = {
    QUERY: `${prefix}.QUERY`,
    LOADING: `${prefix}.LOADING`,
}

// reducer
export default (state = initState.topic, { type, payload }) => {
    switch (type) {
        case actionTypes.QUERY:
            const topics = state.topics && state.topics.concat(payload.topics);
            //是否还有下一页
            var hasMore = state.hasMore;
            if (payload.topics && payload.topics.length < payload.per_page) {
                hasMore = false;
            }
            // console.log('topics', topics.length);
            return Object.assign({}, state, {
                page: payload.page,
                pageSize: payload.per_page,
                topics,
                hasMore,
                loading: false,
            })
        case actionTypes.LOADING:
            return Object.assign({}, {...state, loading: true })
        default:
            return state
    }
}
