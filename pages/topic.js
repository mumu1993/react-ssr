import React, { Component } from 'react'
import { bindActionCreators } from "redux"
import withRedux from 'next-redux-wrapper'
import Link from 'next/link'

import Download from '../components/download/index.js'
import Footer from '../components/footer/index.js'
import TopicCard from '../components/topic-card/index.js'
import TopicItem from '../components/topic/index.js'
import Lazyload from 'react-lazyload'
import Search from '../components/search/index.js'
import ScrollToTop from '../components/scroll-to-top/index.js'

import { isPc, getOffset } from '/common/utils'
import { queryTopic, randomTopics, topicShareInfo, shareConfig } from 'common/api'
import { formatDate, toRgb } from 'common/utils';

import { makeStore } from 'store/index'

class Topic extends Component {
    // server渲染时获取数据
    static async getInitialProps({ req, query, store, isServer }) {
        const pc = isPc(req ? req.headers['user-agent'] : navigator.userAgent);
        const id = query.id || query.shareId;

        var topicPromise = queryTopic(id, !!query.shareId);
        var randomPromise = randomTopics();

        const [topic, randoms] = await Promise.all([topicPromise, randomPromise]);
        return { topic, randoms, pc }
    }

    async componentDidMount() {
        // document title modify
        window.document.title = `${this.props.topic.title} - 发图`;

        if (this.props.pc) {
            var downloadImg = document.querySelector('.index-Downloadcode');
            var offset = getOffset(downloadImg);
            var searchEle = document.querySelector('.common-search-outer.small');
            searchEle.style.right = `${offset.right}px`;
        }

        //微信分享
        var id = this.props.topic && this.props.topic.id;
        if (!id) return;
        var shareInfoPromise = topicShareInfo({ id, media: 'weixin' });
        var configPromise = shareConfig();

        const [shareInfo, config] = await Promise.all([shareInfoPromise, configPromise]);
        //分享配置
        configShare({
            topic: this.props.topic,
            shareInfo,
            config,
        })
    }

    render() {
        const { topic, randoms, pc } = this.props;
        if (!topic) return null;
        var rgb = (alpha) => toRgb(topic.sticker && topic.sticker.color, alpha);
        var maskStyle = {
            'background': `-webkit-linear-gradient(left , ${rgb(1)} , ${rgb(1)} 25% , ${rgb(0.5)} 50% , ${rgb(1)} 75% , ${rgb(1)} 100%)`
        }

        const randomItems = randoms.map((item, i) => {
            return (
                <li key={`random_${item.id}`} className={`topic-next-item ${i ==0 ? 'topic-next-item-first' : 'topic-next-item-other'}`}>
                    <TopicItem topic={item} pc={pc} showCard={true} height={`!pc && i==0 ? '2rem': ''`}></TopicItem>
                </li>
            )
        })

        const next = topic.next;

        return (
            <section>
            <header className='fatu-container-fuild common-header'>
                <div className="fatu-container clearfix header-con">
                    <Link href="/"><a className="header-logo"></a></Link>
                </div>
            </header>
            <Search mode="small" pc={pc} />
			<div className="container-full topic-fill">
				<div className="fatu-container topic-main">
                    <div className="fatu-container topic-main">
						<div className="topic-left">
							<div className="topic-nav">
							   <a href="/">首页</a>
							   <span> > </span>
                               {
                                   topic.categories && topic.categories[0]
                                   ?  <a href={`/?category_id=${topic.categories[0].id}`}>{ topic.categories[0].name}</a>
                                   : <span> 专题 </span>
                               }
							</div>
							<div className="topic-column">
								<div className="topic-column-cover" style={{'background':`${topic.sticker && topic.sticker.color || ''} url(${topic.cover && topic.cover.url_static}) center no-repeat`,'backgroundSize':'cover'}}></div>
								<p className="topic-column-mask" style={maskStyle}></p>
								<div className="topic-column-info">
									<div className="topic-column-title">
										{topic.title}
									</div>
									<div className="topic-column-con">
										<div className="topic-column-user">
											<span style={{'background':`url(${topic.user.avatar}) center no-repeat`,'backgroundSize':'cover'}}></span>
											<var>{topic.user.name}</var>
										</div>
                                        <em></em>
										<div className="topic-column-time">
											{formatDate(topic.published_at)}
										</div>
									</div>
								</div>
							</div>
                            {
                                topic.description ? (
                                    (
                                        <div className="topic-describe">
            								<hr/>
            								<p>{topic.description}</p>
            								<hr/>
            							</div>
                                    )
                                ) : (<div className="topic-describe-space"></div>)
                            }
							<TopicCard mode={topic.display} pc={pc} gifs={topic.gifs}></TopicCard>
                            <div className="topic-left-bottom">
                            </div>
						</div>
                        <div className="topic-right">
    						{
                                pc && (<div className="index-Downloadcode"></div>)
                            }
                            {
                                next && pc && (
                                    <div className="topic-common-border topic-next">
            							<h2 className="topic-head">下一篇</h2>
            							<ul className="topic-next-lists">
            								<li className="topic-next-item topic-next-item-special">
                    				          <TopicItem topic={next} pc={pc} showCard={true}></TopicItem>
                    				        </li>
            							</ul>
            						</div>
                                )
                            }

    						<div className="topic-common-border topic-look">
    							<h2 className="topic-head">更多精彩</h2>
    							<ul className="clearfix topic-next-lists">
                                    {randomItems}
    							</ul>
    						</div>
    						<Download pc={pc}></Download>
    					  </div>
					   </div>
                    </div>
				</div>
                <ScrollToTop />
                <script src='//res.wx.qq.com/open/js/jweixin-1.2.0.js'></script>
			</section>
        )
    }
}

//分享配置
function configShare({ topic, shareInfo, config }) {
    const commonConfig = {
        title: shareInfo.title,
        desc: shareInfo.description,
        link: shareInfo.url,
        imgUrl: topic.cover.url_thumbnail,
    };

    wx.config({
        debug: false,
        appId: config.appId,
        timestamp: config.timestamp,
        nonceStr: config.noncestr,
        signature: config.signature,
        jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
        ]
    });

    //分享
    wx.ready(function() {
        wx.onMenuShareTimeline(commonConfig);
        wx.onMenuShareAppMessage({...commonConfig, ... { type: 'link', dataUrl: '' } });
        wx.onMenuShareQQ(commonConfig);
        wx.onMenuShareWeibo(commonConfig);
        wx.onMenuShareQZone(commonConfig);
    });
}

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
        queryTopic: bindActionCreators(queryTopic, dispatch),
    }
}

export default withRedux(makeStore, mapStateToProps, mapDispatchToProps)(Topic)
