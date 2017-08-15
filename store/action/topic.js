// action
import api from 'common/api'
import { actionTypes } from '../reducer/topic.js'

// actions
export const queryTopics = ({ page, per_page, category_id }) => async(dispatch, getState) => {
    const state = getState().topic;
    if (!state.hasMore || state.page === page || state.loading) {
        return [];
    }
    // begin fetch
    dispatch({ type: actionTypes.LOADING });
    const topics = await api.queryTopics({ page, per_page, category_id });
    dispatch(queryActionCreator({ page, per_page, topics }));
    return topics;
}

export const randomTopics = () => async(dispatch) => {
    const topics = await api.randomTopics();
    return topics;
}

// action creator
const queryActionCreator = ({ page, per_page, topics }) => {
    return { type: actionTypes.QUERY, payload: { page, per_page, topics } };
}
