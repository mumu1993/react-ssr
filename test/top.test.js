import { store } from './inital.js';

import { actionTypes } from 'store/reducer/top.js'
import { queryTops } from 'store/action/top'


//top query
test('top query', async() => {
    const category_id = '';
    const tops = await queryTops(category_id)(store.dispatch);
    const action = {
        type: actionTypes.QUERY,
        payload: tops
    };

    const actions = store.getActions()
    expect(actions[0]).toEqual(action)
});
