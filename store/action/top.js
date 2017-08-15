// action
import api from 'common/api'
import { actionTypes } from '../reducer/top.js'

// actions
export const queryTops = (category_id) => async(dispatch) => {
    // begin fetch
    const tops = await api.queryTops({
        per_page: 10,
        category_id: category_id,
    });
    dispatch({
        type: actionTypes.QUERY,
        payload: tops
    });
    return tops;
}
