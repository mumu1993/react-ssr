import { store } from './inital.js';

import { queryTopics } from 'store/action/topic'
import { actionTypes } from 'store/reducer/topic.js'

//topic query
test('topic query', async() => {
    const page = 1,
        per_page = 20;

    const topics = await queryTopics({
        category_id: '',
        page: page,
        per_page: per_page,
    })(store.dispatch, store.getState);

    const action = {
        type: actionTypes.QUERY,
        payload: { page, per_page, topics }
    };

    const actions = store.getActions()
    expect(actions[1]).toEqual(action)
});
