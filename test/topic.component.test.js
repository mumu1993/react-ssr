import toJson from 'enzyme-to-json';
import { render } from 'enzyme';

import { store } from './inital.js';
import { queryTopics } from 'store/action/topic'
import { actionTypes } from 'store/reducer/topic.js'

import Topic from 'components/topic/index.js';

//topic component test
test('topic component', async() => {
    //query topics
    const page = 1,
        per_page = 20;

    const results = await queryTopics({
        category_id: '',
        page: page,
        per_page: per_page,
    })(store.dispatch, store.getState);

    var topics = results.map(topic => (
        <li key={`topic_${topic.id}`}><Topic topic={topic} pc={true} showCard={true}></Topic></li>
    ));

    const wrapper = render(
        <ul>
          {topics}
        </ul>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
})
