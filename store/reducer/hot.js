import initState from '../initalState';

const prefix = 'HOT'

export const actionTypes = {
    QUERY: `${prefix}.QUERY`,
    LOADING: `${prefix}.LOADING`,
}

// reducer
export default (state = initState.hot, { type, payload }) => {
    switch (type) {
        case actionTypes.QUERY:
            const hots = state.hots && state.hots.concat(payload.hots);
            //是否还有下一页
            var hasMore = state.hasMore;
            if (payload.hots && payload.hots.length < payload.per_page) {
                hasMore = false;
            }

            return Object.assign({}, state, {
                page: payload.page,
                pageSize: payload.per_page,
                hots,
                hasMore,
                loading: false,
            })
        case actionTypes.LOADING:
            return Object.assign({}, {...state, loading: true })
        default:
            return state
    }
}
