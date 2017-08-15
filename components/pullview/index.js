import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import PullView from './pullview.js';

export default class PullViewWrap extends PureComponent {

    static defaultProps = {
        statusText: ['↓ 下拉刷新', '↓ 下拉刷新', '↑ 释放更新', '加载中...'], // 文字对应状态
        unit: 'px',
        isLoading: false,
        hasMore: true,
    };

    // 大部分同PullView的props
    static propTypes = {
        onScrollToBottom: PropTypes.func,
        onScrollUp: PropTypes.func,
        onScrollDown: PropTypes.func,
        onPullViewUnmount: PropTypes.func,
        onPauseStopped: PropTypes.func,
        mountScrollTop: PropTypes.number,
        toBottom: PropTypes.number,
        toStopPause: PropTypes.bool,
        pulledPauseY: PropTypes.number,
        scaleY: PropTypes.number,
        statusDivStyleClass: PropTypes.string, // 状态变更div的className
        LoadingComponent: PropTypes.func, // 加载中显示的组件
        unit: PropTypes.string,
        styleClass: PropTypes.string, // wrap的className
        style: PropTypes.string, // wrap的style
        isLoading: PropTypes.bool, //是否正在加载数据
        hasMore: PropTypes.bool, //是否还有下一页
        disable: PropTypes.bool, //是否禁用自动加载更多
    };

    constructor() {
        super(...arguments);
        this.onPulling = this.onPulling.bind(this);
        this.onStatusChange = this.onStatusChange.bind(this);
    }

    state = {
        pulledY: 0, // 下拉的距离
        status: 0 // 当前状态
    };

    // PullView状态变更逻辑
    onStatusChange(status) {
        if (this.props.disable) return;

        const { pulledPauseY } = this.props;

        switch (status) {
            case 0:
                this.setState({
                    status,
                    pulledY: 0
                });
                break;
            case 3:
                this.setState({
                    status,
                    pulledY: pulledPauseY
                });
                break;
            default:
                this.setState({
                    status
                });
                break;
        }
    }

    // PullView触发onPulling逻辑
    onPulling(pulledY) {
        !this.props.disable && this.setState({ pulledY });
    }

    render() {
        const { props, state: { pulledY, status }, onPulling, onStatusChange } = this;
        const { statusDivStyleClass, style, LoadingComponent, statusText, unit, styleClass, disable, isLoading, hasMore } = props;

        return (
            <section>
                <PullView
                  {...props}
                  disable={disable}
                  onStatusChange={onStatusChange}
                  onPulling={onPulling}
                />
                {
                    hasMore ? ( isLoading  && <LoadingComponent/> ): (
                        <div className="search-picture-hint">
                            <hr/>
                            <p>没有更多啦</p>
                            <hr/>
                        </div>
                    )
                }
            </section>
        )
    }
}


// <div
//   className={statusDivStyleClass}
//   style={{
//     transform: `translateY(${pulledY}${unit})`
//   }}>
//   {status === 3 && LoadingComponent ? <LoadingComponent/> : statusText[status]}
// </div>
