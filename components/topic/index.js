import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Lazyload from 'components/react-lazyload/index';
import { formatDate } from 'common/utils';

import PhotoCard from 'components/photo-card/index';
import Dialog from 'components/dialog/index';
import ImagePlaceholder from 'components/image-placeholder/index';

export default class Topic extends PureComponent {
    static propTypes = {
        topic: PropTypes.object,
        pc: PropTypes.bool,
        //点击图片，是否可弹出大图卡片
        showCard: PropTypes.bool,
    }

    static defaultProps = {
        topic: null,
        pc: true,
        showCard: false,
    }

    constructor(props) {
        super(props);
        this.topic = props.topic;
        this.state = { visible: false, current: 0 };
    }

    //预览大图
    preview(index) {
        if (!this.props.pc || !this.props.showCard) return;
        this.setState({ visible: true, current: index });
    }

    closeDialog() {
        this.setState({ visible: false });
    }

    activeGif(index, active) {
        // var gifs = [...this.state.gifs];
        // gifs[index] && (gifs[index].current = active ? gifs[index].url : gifs[index].url_thumbnail);
        // this.setState({ gifs });
    }

    hoverHandler(el, current, gif) {
        if (!el) return;
        if (!!el.attachEvent) {
            el.attachEvent('mouseenter', function(e) {
                el.src = gif;
                el.nextSibling.className = '';
            })

            // el.attachEvent('mouseleave', function(e) {
            //     el.src = current;
            // })
        } else {
            el.addEventListener('mouseenter', function(e) {
                el.src = gif;
                el.nextSibling.className = '';
            })

            // el.addEventListener('mouseleave', function(e) {
            //     el.src = current;
            // })
        }

    }

    render() {
        const height = this.props.height || '0.9rem';
        const width = this.props.width || 'auto';

        return (
            <section style={{'overflow': 'hidden'}}>
                {
                    !this.props.pc && (
                        <Lazyload throttle={200} height={height} width="1.48rem">
                            <ImagePlaceholder height={height} width={width}><a className="newest-cover-a" href={`/topic?id=${this.topic.id}`} style={{'background': `url(${this.topic.cover.url_static}) center no-repeat`, 'backgroundSize': 'cover'}}></a></ImagePlaceholder>
                        </Lazyload>
                    )
                }
                <a target="_blank" href={`/topic?id=${this.topic.id}`}>
                    <h3 className="newest-title">{this.topic.title}</h3>
                </a>

                <div className="clearfix newset-info">
                    {
                        this.topic.sticker && this.topic.sticker.name &&
                        (
                            <p className="newset-culumn" style={{'background': this.topic.sticker.color}}>
                                {this.topic.sticker.name}
                            </p>
                        )
                    }
                    {
                        this.topic.categories && this.topic.categories[0] && this.topic.categories[0].name &&
                        (
                            <a target="_blank" href={`/?category_id=${this.topic.categories[0].id}`} className="newset-classify" >
                                <span style={{'background': `url(${this.topic.categories[0].sub_icon || '/static/images/ico_common_catplogy_default.png'}) center no-repeat`, 'backgroundSize': 'cover'}}></span>
                                {this.topic.categories[0].name}
                            </a>
                        )
                    }
                    <p className="clearfix newset-author">
                        <span style={{'background': `url(${this.topic.user && this.topic.user.avatar}) center no-repeat`, 'backgroundSize': 'cover'}}></span>
                        {this.topic.user && this.topic.user.name}
                    </p>
                    <p className="newset-time"><em>{formatDate(this.topic.published_at)}</em></p>
                </div>
                <div className="newest-images">
                    <ul className="newest-images-lists">
                    {
                        this.props.pc && this.topic.gifs && this.topic.gifs.map((gif, i) => (
                            <li key={`gif:${this.topic.id}:${i}`} onClick={this.preview.bind(this, i)}>
                                <Lazyload throttle={200} height={120} offset={10}>
                                    <ImagePlaceholder><img src={gif.url_grid}/></ImagePlaceholder>
                                </Lazyload>
                            </li>
                        ))
                    }
                    </ul>
                    {
                        this.topic.gifs && this.topic.gifs.length >= 4 && (<a className="newest-images-more" target="_blank" href={`/topic?id=${this.topic.id}`}>更多</a>)
                    }

                    </div>

                    <Dialog visible={this.state.visible} onClose={this.closeDialog.bind(this)}>
                        <PhotoCard cards={this.topic.gifs.map(item => ({id: item.id, url: item.url_normal}))} current={this.state.current} caption="更多专题内的动图"></PhotoCard>
                    </Dialog>
            </section>
        )
    }
}

// <li key={gif.current} onMouseEnter={this.activeGif.bind(this, i, true)} onMouseLeave={this.activeGif.bind(this, i, false)}>
//     <Lazyload throttle={200} height={300}>
//         <img src={gif.current}/>
//     </Lazyload>
//     <span className="newest-gif"></span>
// </li>

// ref={el => this.hoverHandler(el, gif.url_static, gif.url_grid)}
// <span className={`${i !== 5 ? 'newest-gif': ''}`}></span>
