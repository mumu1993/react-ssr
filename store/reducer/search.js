import initState from '../initalState';

const prefix = 'SEARCH'

export const actionTypes = {
    QUERY: `${prefix}.QUERY`,
    LOADING: `${prefix}.LOADING`,
}

// reducer
export default (state = initState.search, { type, payload }) => {

    switch (type) {
        case actionTypes.QUERY:
            var data = payload.result.data;
            var total = +(payload.result.headers['x-total']);

            var results = payload.page == 1 ? data : state[payload.type].results && state[payload.type].results.concat(data);
            //是否还有下一页
            var hasMore = state[payload.type].hasMore;
            if (data && data.length < payload.per_page) {
                hasMore = false;
            }

            return Object.assign({}, state, {
                [payload.type]: {
                    page: payload.page,
                    pageSize: payload.per_page,
                    total: total,
                    keyword: payload.q,
                    type: payload.type,
                    results,
                    hasMore,
                    loading: false,
                }
            })
        case actionTypes.LOADING:
            return Object.assign({}, {...state, loading: true })
        default:
            return state
    }
}
