// action
import { PageSize } from 'common/constant'
import api from 'common/api'
import { actionTypes } from '../reducer/search.js'

// actions
export const searchAction = ({ page, per_page, type, q, force }) => async(dispatch, getState) => {
    const state = getState().search[type];
    if (!!page && (!state.hasMore || state.page === page || state.loading)) {
        return [];
    }
    if (!page) page = 1;
    // begin fetch
    dispatch({ type: actionTypes.LOADING });
    const result = await api.search({ page, per_page, type, q }, {
        //从响应回调中获取完整响应报文
        callback: (response) => {
            return {
                data: response.data,
                headers: response.headers,
            }
        }
    });

    dispatch({
        type: actionTypes.QUERY,
        payload: { page, per_page, type, q, result }
    });
    return result;
}
