import { store } from './inital.js';

import { actionTypes } from 'store/reducer/common.js'
import { queryHotTags } from 'store/action/common'


//hottag query
test('hottag query', async() => {
    const tags = await queryHotTags()(store.dispatch);
    const action = {
        type: actionTypes.QUERY_TAG,
        payload: tags
    };

    const actions = store.getActions()
    expect(actions[0]).toEqual(action)
});
