import { store } from './inital.js';

import { searchAction } from 'store/action/search'
import { actionTypes } from 'store/reducer/search.js'

//search query
test('search query', async() => {
    const page = 1,
        q = "",
        type = 'topic',
        per_page = 20;

    const result = await searchAction({ page, per_page, q, type })(store.dispatch, store.getState);

    const action = {
        type: actionTypes.QUERY,
        payload: { page, per_page, q, type, result }
    };

    const actions = store.getActions()
    expect(actions[1]).toEqual(action)
});
