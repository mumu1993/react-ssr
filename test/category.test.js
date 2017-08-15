import { store } from './inital.js';

import { actionTypes } from 'store/reducer/common.js'
import { queryCategories } from 'store/action/common'


//category query
test('category query', async() => {
    const categories = await queryCategories()(store.dispatch);
    const action = {
        type: actionTypes.QUERY_CATEGORY,
        payload: categories
    };

    const actions = store.getActions()
    expect(actions[0]).toEqual(action)
});
