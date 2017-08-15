import React, { Component } from 'react'
import { bindActionCreators } from "redux"
import withRedux from 'next-redux-wrapper'
import { composeWithDevTools } from 'redux-devtools-extension'
import Link from 'next/link'

import Search from '../components/search/index.js'
import PullView from '../components/pullview/index.js'
import Loading from '../components/loading/index.js'
import Lazyload from 'react-lazyload'

import { makeStore } from 'store/index'
import { queryTopics } from 'store/action/topic'
import { queryHots } from 'store/action/hot'
import { queryHotTags, queryCategories } from 'store/action/common'
import { queryTops } from 'store/action/top'
import styles from './css/home.scss'
import { isPc } from '/common/utils'
import { PageSize } from '/common/constant'
import Topic from '../components/topic/index.js'
import HotTopic from '../components/hottopic/list.js'
import Top from '../components/top/index.js'
import Download from '../components/download/index.js'
import Footer from '../components/footer/index.js'
import ScrollToTop from '../components/scroll-to-top/index.js'


class Index extends Component {
    // server渲染时获取数据
    static async getInitialProps({ req, query, store, isServer }) {
        const pc = isPc(req ? req.headers['user-agent'] : navigator.userAgent);
        const category_id = query.category_id;
        const pageSize = pc ? PageSize : 10

        //tags
        const tagPromise = queryHotTags()(store.dispatch);

        //categories
        const categoryPromise = queryCategories()(store.dispatch);

        // 中部专题
        const topicPromise = queryTopics({
            category_id: category_id,
            page: 1,
            per_page: pageSize,
        })(store.dispatch, store.getState);

        //右侧精选
        const hotPromise = queryHots({
            category_id: category_id,
            page: 1,
            per_page: 10,
        })(store.dispatch, store.getState);

        // 排行
        const topPromise = queryTops(category_id)(store.dispatch);

        const [tags, categories] = await Promise.all([tagPromise, categoryPromise, topicPromise, hotPromise, topPromise]);

        // const tags = await queryHotTags()(store.dispatch);
        // const categories = await queryCategories()(store.dispatch);
        const current_category = categories.find(category => category.id == category_id) || { name: '全站' };
        return { tags, pc, category_id, pageSize, current_category };
    }

    constructor(props) {
        super(props);
        this.state = { isLoading: false };
    }

    async loadTopics() {
        this.setState({ isLoading: true });

        await this.props.queryTopics({
            category_id: this.props.category_id,
            page: this.props.topic.page + 1,
            per_page: this.props.pageSize,
        });

        this.setState({ isLoading: false });
    }

    loadHots() {
        this.props.queryHots({
            category_id: this.props.category_id,
            page: this.props.hot.page + 1,
            per_page: this.props.pageSize,
        });
    }

    // client渲染时获取数据
    componentDidMount() {
        console.log('env', this.props.pc ? 'pc' : 'mobile');
        // document title modify
        window.document.title = `${this.props.current_category.name} - 发图`;
    }

    render() {
        const { pc } = this.props;
        const topics = this.props.topic.topics && this.props.topic.topics.map(topic => {
            return topic && (
                <li key={`topic_${topic.id}`} className="index-newest-item">
					<Topic topic={topic} pc={this.props.pc} showCard={true}></Topic>
				</li>
            )
        });

        const hots = this.props.hot.hots && this.props.hot.hots.map(hot => {
            return hot && (
                <li key={`hot_${hot.id}`} className="index-hot-item">
                    <HotTopic hot={hot} pc={pc}></HotTopic>
    			</li>
            )
        });

        const { category_id } = this.props;

        const hotHref = !!category_id ? `/hot?category_id=${category_id}` : '/hot';

        return (
            <main>
				<style dangerouslySetInnerHTML={{ __html: styles }} />
				<Search mode="big" tags={this.props.tags}></Search>
				<div className="fatu-container clearfix">
					<div className="index-newest">
						{
							<PullView
							  styleClass="index-newest-list"
							  statusDivStyleClass="pull_status_div"
							  onScrollToBottom={this.loadTopics.bind(this)}
							  LoadingComponent={Loading}
                              isLoading={this.state.isLoading}
                              hasMore={this.props.topic.hasMore}
                              disable={!this.props.pc}
							>
								{topics}
							</PullView>
						}

						{
                            !pc && !this.state.isLoading && this.props.topic.hasMore && (<button className="index-newest-more" onClick={this.loadTopics.bind(this)}>加载更多</button>)
                        }
                        {
                            !pc && this.state.isLoading && <Loading />
                        }
                        <div className="index-newest-more-bg"></div>
					</div>

					<div className="index-right">
						{
                            pc && (<div className="index-Downloadcode"></div>)
                        }
						<div className="index-feature">
    						  <h2 className="index-feature-headline">
                                  <a href={hotHref}>{this.props.current_category.name}精选</a>
    						  </h2>
                              <div className="index-feature-lists-outer">
    						  <ul className="clearfix index-hot-lists">
        				          {hots}
                              </ul>
                              </div>
				              <a href="/hot" className="index-feature-more">更多</a>
                            <div className="index-newest-more-bg index-feature-more-bg"></div>
						</div>
						<div className="index-hot">
        			        <h2 className="index-feature-headline index-global-headline">{this.props.current_category.name}排行榜</h2>
        			        <Top tops={this.props.top.tops} pc={this.props.pc}></Top>
    			        </div>
                        <Download pc={pc}></Download>
                        <Footer></Footer>
					</div>
				</div>
                <ScrollToTop />
			</main>
        )
    }
}

// 将组件props中的dispath替换成当前方法(queryTopics)
const mapDispatchToProps = (dispatch) => {
    return {
        queryTopics: bindActionCreators(queryTopics, dispatch),
        queryHots: bindActionCreators(queryHots, dispatch),
    }
}

//将 redux 中的 state 映射到组件的 props 上
const mapStateToProps = (state) => {
    // 根据业务逻辑，将state与组件ownProps映射到组件上
    return {
        topic: state.topic,
        hot: state.hot,
        top: state.top,
    }
}

export default withRedux(makeStore, mapStateToProps, mapDispatchToProps)(Index)

// <div className="content" style={{backgroundColor: '#eee', height: '200px'}}>首页正文内容</div>
// <ul>
//     <li>
//       <Link href='/basketball'>
//         <a>basketball</a>
//       </Link>
//     </li>
//     <li>
//       <Link href='/football'>
//         <a>football</a>
//       </Link>
//     </li>
// </ul>
