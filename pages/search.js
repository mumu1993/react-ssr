import React, { Component } from 'react';
import Router from 'next/router';
import { bindActionCreators } from "redux"
import withRedux from 'next-redux-wrapper'
import Link from 'next/link'

import { isPc } from '/common/utils'
import api from 'common/api'
import { formatDate } from 'common/utils';
import { PageSize } from '/common/constant'

import SearchInput from '../components/search/index.js'
import Topic from '../components/topic/index.js'
import HotTopic from '../components/hottopic/list.js'
import PullView from '../components/pullview/index.js'
import Loading from '../components/loading/index.js'
import Lazyload from 'react-lazyload'

import { searchAction } from 'store/action/search'
import { makeStore } from 'store/index'
import { queryHotTags } from 'store/action/common'
import Download from '../components/download/index.js'
import ScrollToTop from '../components/scroll-to-top/index.js'
import ImagePlaceholder from 'components/image-placeholder/index';
import PhotoCard from 'components/photo-card/index';
import Dialog from 'components/dialog/index';

//搜索标签
let tags;

class Search extends Component {
    static async getInitialProps({ req, query, store, isServer }) {
        const pc = isPc(req ? req.headers['user-agent'] : navigator.userAgent);
        const keyword = query.q,
            type = query.type;

        var promises = [];
        const searchOptions = {
            q: keyword,
            type: type,
            page: 0,
            per_page: PageSize,
        };

        //搜索
        const searchPromise = searchAction(searchOptions)(store.dispatch, store.getState);
        promises.push(searchPromise);

        //搜索关键字
        if (!tags) {
            const tagPromise = queryHotTags()(store.dispatch);
            promises.push(tagPromise);
        }

        //发送请求
        let [results, searchTags] = await Promise.all(promises);
        tags = tags || searchTags;
        return { pc, tags, keyword, currentType: type }
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            visible: false,
            gifs: [],
            current: 0,
        };
    }

    //预览大图
    preview(index) {
        if (!this.props.pc) return;
        this.setState({ visible: true, current: index });
    }

    closeDialog() {
        this.setState({ visible: false });
    }

    searchHandler(type) {
        Router.push({
            pathname: '/search',
            query: {
                type: type,
                q: this.props.keyword,
            }
        })
    }

    async loadSearch(type) {
        this.setState({ isLoading: true });
        const current = this.props[type];

        await this.props.searchAction({
            q: current.keyword,
            type: type,
            page: current.page + 1,
            per_page: PageSize,
        });

        this.setState({ isLoading: false });
    }

    componentDidMount() {
        // document title modify
        window.document.title = `搜索 - 发图`;
    }

    render() {
        const { pc, tags, currentType } = this.props;
        const { type, keyword, page, total, results, hasMore, loading } = this.props[currentType];

        //动图大图卡片展示时，图片列表
        let gifs = [];

        let searchItems = [];
        if (results && results.length > 0) {
            if (type == 'topic') {
                searchItems = results && results.map((item, i) => {
                    return (
                        pc ? (
                            <li key={`topic_${item.id}`} className="index-newest-item">
                                <Topic topic={item} pc={pc}></Topic>
                            </li>
                        ) : (
                            <li key={`topic_${item.id}_${i}`} className="index-hot-item">
                                <HotTopic hot={item} pc={pc}></HotTopic>
                            </li>
                        )
                    )
                })
            } else {
                searchItems = results && results.map((item, i) => {
                    var image = pc ? item.url_normal : item.url_medium;
                    var ratio = item.meta.height / item.meta.width;
                    var unit = pc ? 'px' : 'rem';
                    var width = pc ? 232 : 1.5;
                    var height = ratio * width;

                    //大图卡片列表
                    gifs.push({
                        id: i,
                        url: image,
                    })
                    return (
                        <li key={`gif_${item.id}_${i}`} className="search-picture-item" onClick={this.preview.bind(this, i)}>
                            <Lazyload throttle={200} height={`${height}${unit}`}>
                                <ImagePlaceholder width={`${width}${unit}`} height={`${height}${unit}`}>
                                    <img src={image} />
                                </ImagePlaceholder>
                            </Lazyload>
                        </li>
                    )
                })
            }
        }


        return (
            <div className="search-content">
                <SearchInput mode="big" pc={pc} tags={tags} keyword={keyword} currentType={currentType}></SearchInput>
                <div className="fatu-container search-navigation-outer 22">
                    <ul className="search-navigation">
                      <li onClick={this.searchHandler.bind(this, 'gif')} className={`${currentType == 'gif' ? 'search-navigation-active': ''}`}>动图</li>
                      <li onClick={this.searchHandler.bind(this, 'topic')} className={`${currentType == 'topic' ? 'search-navigation-active': ''}`}>专题</li>
                    </ul>

                    {
                        keyword && (
                            <div className="search-hint">
                                <p>包含「
                                    <em>{keyword}</em>」的
                                    {`${currentType == 'gif' ? '动图' : '专题'}`}有
                                    <em>{total}</em>条结果
                                </p>
                            </div>
                        )
                    }
                </div>

                {
                    !searchItems.length && (
                        <div className="search-empty">
                            <h3>哎哟！没有相关内容...</h3>
                            <img src="/static/images/img_common_search_empty.png" />
                        </div>
                    )
                }

                {

                    !!searchItems.length && currentType == 'gif' && (
                        <div className=" fatu-container search-picture-outer">
                        {
                            <PullView
                              styleClass="search-picture-lists"
                              statusDivStyleClass="pull_status_div"
                              onScrollToBottom={this.loadSearch.bind(this, 'gif')}
                              LoadingComponent={Loading}
                              isLoading={this.state.isLoading}
                              hasMore={this.props.gif.hasMore}
                              disable={true}
                            >
                                {searchItems}
                            </PullView>
                        }

                        {
                            !this.state.isLoading && this.props.gif.hasMore && (<button className="index-newest-more" style={{'marginTop': '0.1rem', 'bottom': 'auto'}} onClick={this.loadSearch.bind(this, 'gif')}>加载更多</button>)
                        }
                        <div className="index-newest-more-bg"></div>
                        </div>
                    )
                }

                {
                    !!searchItems.length && currentType == 'topic' && (
                        <div className="fatu-container search-topic-outer">
                        {
							<PullView
							  styleClass={this.props.pc ? 'index-newest-list search-list': 'index-hot-lists'}
							  statusDivStyleClass="pull_status_div"
							  onScrollToBottom={this.loadSearch.bind(this, 'topic')}
							  LoadingComponent={Loading}
                              isLoading={this.state.isLoading}
                              hasMore={this.props.topic.hasMore}
                              disable={!this.props.pc}
							>
								{searchItems}
							</PullView>
						}

						{
                            !pc && !this.state.isLoading && this.props.topic.hasMore && (<button className="index-newest-more" onClick={this.loadSearch.bind(this, 'topic')}>加载更多</button>)
                        }
                        {
                            !pc && this.state.isLoading && <Loading />
                        }

                        </div>
                    )
                }
                <Download pc={pc}></Download>
                <ScrollToTop />

                <Dialog visible={this.state.visible} onClose={this.closeDialog.bind(this)}>
                    <PhotoCard cards={gifs} current={this.state.current} caption="更多动图"></PhotoCard>
                </Dialog>
            </div>
        )
    }
}

//将 redux 中的 state 映射到组件的 props 上
const mapStateToProps = (state) => {
    // 根据业务逻辑，将state与组件ownProps映射到组件上
    return {
        topic: state.search.topic,
        gif: state.search.gif,
    }
}

// 将组件props中的dispath替换成当前方法
const mapDispatchToProps = (dispatch) => {
    return {
        searchAction: bindActionCreators(searchAction, dispatch),
    }
}

export default withRedux(makeStore, mapStateToProps, mapDispatchToProps)(Search)


// {
//     !!keyword && (
//         <div className="search-hint">
//           <p>包含【<em>{keyword}</em>】的专题有<em>15</em>条结果</p>
//           <p className="hide">没有相关结果</p>
//         </div>
//     )
// }
