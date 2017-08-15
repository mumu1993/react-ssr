import toJson from 'enzyme-to-json';
import { render, shallow } from 'enzyme';

import { store } from './inital.js';
import { queryTopics } from 'store/action/topic'
import { actionTypes } from 'store/reducer/topic.js'
import { queryTopic } from 'common/api'

import TopicCard from 'components/topic-card/index.js';


//topic-card component test
test('topic card component', async() => {
    //query topics
    const page = 1,
        per_page = 20;

    const topics = await queryTopics({
        category_id: '',
        page: page,
        per_page: per_page,
    })(store.dispatch, store.getState);

    //target topic
    const topicId = topics[0].id;

    //query topic
    const topic = await queryTopic(topicId);

    const wrapper = shallow(
        <TopicCard mode={topic.display} pc={true} gifs={topic.gifs}></TopicCard>
    )

    expect(wrapper.find('.topic-content-story').children()).toHaveLength(topic.gifs.length)

    //simulate click
    var img = wrapper.find('.topic-content-story section img').first();
    img.simulate('click');

    var cardContainer = wrapper.find('.photo-card-container');
    expect(cardContainer.root.length).toBe(1);
});
