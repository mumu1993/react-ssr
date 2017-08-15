import React, { PureComponent } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import cls from 'classnames'

import styles from './index.scss'

class Search extends PureComponent {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        mode: PropTypes.oneOf(['small', 'big']),
        pc: PropTypes.bool,
        tags: PropTypes.array,
        keyword: PropTypes.string,
        currentType: PropTypes.string,
    }

    static defaultProps = {
        //大搜索框时才展示热门搜索标签
        mode: 'samll',
        pc: true,
        tags: [],
        keyword: '',
        currentType: 'gif',
    }

    // 回车执行搜索
    keyDownHandler(e) {
        if (e.keyCode == 13) {
            this.searchHandler();
        }
    }

    componentDidMount() {
        this.keyword.value = this.props.keyword || '';
    }

    searchHandler(keyword) {
        keyword = keyword || this.keyword.value || '',
            // Router.push({
            //     pathname: '/search',
            //     query: {
            //         type: this.props.currentType,
            //         q: keyword || this.keyword.value,
            //     }
            // })

            window.location.href = `/search?type=${this.props.currentType}&q=${keyword}`;
    }

    render() {
        const className = cls({
            'container-fuild': true,
            'common-search-outer': true,
            'big': this.props.mode === 'big',
            'small': this.props.mode === 'small',
        })

        const tags = this.props.mode === 'big' && this.props.tags && this.props.tags.map(tag => {
            return (
                <li key={tag.id} onClick={this.searchHandler.bind(this, tag.name)}>{tag.name}</li>
            )
        })

        return (
            <section className={className}>
				<style dangerouslySetInnerHTML={{ __html: styles }} />
				<div className="fatu-container common-search">
					<div className="common-search-center">
						<div className="common-search-import">
						  	<input type="text" ref={(keyword) => this.keyword = keyword} onKeyDown={this.keyDownHandler.bind(this)} placeholder="搜索你感兴趣的内容..." />
						  	<a href="javascript:void(0)" onClick={this.searchHandler.bind(this, '')}><span>搜索</span></a>
						</div>
                        {
                            this.props.mode === 'big' && (
                                <div className="clearfix common-search-hot">
        							<h4>热门搜索：</h4>
                                    <ul>{tags}</ul>
        						</div>
                            )
                        }
				  	</div>
				</div>
			</section>
        )
    }
}

//将 redux 中的 state 映射到组件的 props 上
const mapStateToProps = (state) => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // addCount: bindActionCreators(addCount, dispatch),
        // startClock: bindActionCreators(startClock, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
    // export default withRedux(initStore, null, mapDispatchToProps)(Search)
