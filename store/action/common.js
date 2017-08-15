// action
import api from 'common/api'
import reducers from '../reducer/common.js'
import { actionTypes, initState } from '../reducer/common.js'

// actions
export const queryCategories = () => async dispatch => {
    var categories = await api.queryCategories();
    categories = categories && categories.map(item => ({
        id: item.id,
        name: item.name,
        icon: item.icon || '/static/images/ico_desktop_nav_catology_default.png',
        banner: item.banner || '/static/images/img_desktop_cato_feature_default.png',
        app_banner: item.app_banner || '/static/images/img_mobile_cato_feature_default.png',
    }))
    dispatch({
        type: actionTypes.QUERY_CATEGORY,
        payload: categories,
    });
    return categories;
}

export const queryHotTags = () => async dispatch => {
    const tags = await api.queryHotTags({
        per_page: 9
    });
    dispatch({
        type: actionTypes.QUERY_TAG,
        payload: tags,
    });
    return tags;
}
