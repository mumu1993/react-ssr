import React, { Component } from 'react';
import { bindActionCreators } from "redux"
import withRedux from 'next-redux-wrapper'
import { composeWithDevTools } from 'redux-devtools-extension'
import Link from 'next/link'

import { isPc, getOffset } from '/common/utils'
import api from 'common/api'
import { formatDate } from 'common/utils';
import { PageSize } from '/common/constant'

import PullView from '../components/pullview/index.js'
import Loading from '../components/loading/index.js'
import Lazyload from 'react-lazyload'
import Topic from '../components/topic/index.js'
import Search from '../components/search/index.js'

import { queryHots } from 'store/action/hot'
import { makeStore } from 'store/index'
import { queryCategories } from 'store/action/common'
import Download from '../components/download/index.js'
import ScrollToTop from '../components/scroll-to-top/index.js'

class Hot extends Component {
    static async getInitialProps({ req, query, store, isServer }) {
        // console.log('browser', process.browser);
        const pc = isPc(req ? req.headers['user-agent'] : navigator.userAgent);
        const pageSize = pc ? PageSize : 10
        const id = query.id;
        const category_id = query.category_id;

        //查询全站精选
        var hots = await queryHots({
            category_id: category_id,
            page: 1,
            per_page: pageSize,
        })(store.dispatch, store.getState);

        var categories = await queryCategories()(store.dispatch);
        categories.unshift({
            id: 0,
            name: '全站',
        })
        return { pc, categories, category_id, pageSize }
    }

    constructor(props) {
        super(props);
        this.state = { isLoading: false };
    }

    async loadHots() {
        this.setState({ isLoading: true });

        await this.props.queryHots({
            category_id: this.props.category_id,
            page: this.props.hot.page + 1,
            per_page: this.props.pageSize,
        });

        this.setState({ isLoading: false });
    }

    componentDidMount() {
        // document title modify
        var category = !this.props.category_id ?
            '全站' :
            this.props.categories.find(item => item.id == this.props.category_id).name;
        window.document.title = `${category}精选 - 发图`;

        if (this.props.pc) {
            var target = document.querySelector('.fatu-container');
            var offset = getOffset(target);
            var searchEle = document.querySelector('.common-search-outer.small');
            searchEle && (searchEle.style.right = `${offset.right}px`);
        }
    }

    render() {
        const { categories, category_id, pc } = this.props;
        const currentCategory = categories.find(item => item.id == category_id) || {};
        var banner = pc ? currentCategory.banner : currentCategory.app_banner;
        if (!category_id) {
            banner = '/static/images/img_desktop_features_all_banner.png';
        }

        const computeUrl = (id) => {
            return !id ? '/hot' : `/hot?category_id=${id}`;
        }

        const computeClass = (id) => {
            return !category_id ? (!id ? 'feature-navigation-active' : '') : (id == category_id ? `feature-navigation-active` : '');
        }

        const hots = this.props.hot.hots;
        const hotItems = hots && hots.map(hot => {
            return (
                <li key={`hot_${hot.id}`} className="feature-item">
					<Topic topic={hot} pc={pc} showCard={true}></Topic>
				</li>
            )
        })
        return (
            <div className="feature-top-outer">
                <Search pc={pc} mode="small"></Search>
				<div className="fatu-container feature-top" style={{'background':`url(${banner}) center no-repeat`,'backgroundSize':'cover'}}>
				</div>
				<ul className="fatu-container feature-navigation">
					{
						categories && categories.map(item => (
							<li key={`category_${item.id}`} className={computeClass(item.id)}>
							  <a href={computeUrl(item.id)} style={{'color': '#000'}}>{item.name}</a>
							</li>
						))
					}
				</ul>
				<div className="fatu-container feature-list-outer">
					{
						<PullView
						  styleClass="feature-list"
						  statusDivStyleClass="pull_status_div"
						  onScrollToBottom={this.loadHots.bind(this)}
						  LoadingComponent={Loading}
                          isLoading={this.state.isLoading}
                          hasMore={this.props.hot.hasMore}
						  disable={!this.props.pc}
						>
							{hotItems}
						</PullView>
					}

                    {
                        !pc && !this.state.isLoading && this.props.hot.hasMore && (<div><button className="index-newest-more" onClick={this.loadHots.bind(this)}>加载更多</button><div className="index-newest-more-bg"></div></div>)
                    }

				</div>
                <Download pc={pc}></Download>
                <ScrollToTop />
			</div>

        )
    }
}

// <ul className="newest-images-lists">
// 	<li><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1497965071509&di=0c6816907ce0af521e0b7fd5292e5cde&imgtype=0&src=http%3A%2F%2Fupload.cankaoxiaoxi.com%2F2017%2F0615%2F1497496890819.png" alt="1"/></li>
// </ul>

//将 redux 中的 state 映射到组件的 props 上
const mapStateToProps = (state) => {
    // 根据业务逻辑，将state与组件ownProps映射到组件上
    return {
        hot: state.hot,
    }
}

// 将组件props中的dispath替换成当前方法(queryTopics)
const mapDispatchToProps = (dispatch) => {
    return {
        queryHots: bindActionCreators(queryHots, dispatch),
    }
}

export default withRedux(makeStore, mapStateToProps, mapDispatchToProps)(Hot)
