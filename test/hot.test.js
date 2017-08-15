import { store } from './inital.js';

import { queryHots } from 'store/action/hot'
import { actionTypes } from 'store/reducer/hot.js'

//hot query
test('hot query', async() => {
    const page = 1,
        per_page = 20;

    const hots = await queryHots({
        category_id: '',
        page: page,
        per_page: per_page,
    })(store.dispatch, store.getState);

    const action = {
        type: actionTypes.QUERY,
        payload: { page, per_page, hots }
    };

    const actions = store.getActions()
    expect(actions[1]).toEqual(action)
});
