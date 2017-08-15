// action
import { PageSize } from 'common/constant'
import api from 'common/api'
import { actionTypes } from '../reducer/hot.js'

// actions
export const queryHots = ({ page, per_page, category_id }) => async(dispatch, getState) => {
    const state = getState().hot;
    if (!state.hasMore || state.page === page || state.loading) {
        return [];
    }
    // begin fetch
    dispatch({ type: actionTypes.LOADING });
    const hots = await api.queryHots({ page, per_page, category_id });
    dispatch({
        type: actionTypes.QUERY,
        payload: { page, per_page, hots }
    });
    return hots;
}
