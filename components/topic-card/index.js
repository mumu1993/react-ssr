import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Lazyload from 'react-lazyload';
import ImagePlaceholder from 'components/image-placeholder/index';
import PhotoCard from 'components/photo-card/index';
import Dialog from 'components/dialog/index';
import randomColor from '../image-placeholder/random-color.js'

export default class TopicCard extends PureComponent {
    static propTypes = {
        gifs: PropTypes.array,
        mode: PropTypes.string,
        pc: PropTypes.bool,
    }

    static defaultProps = {
        gifs: [],
        mode: 'story',
        pc: true,
    }

    constructor(props) {
        super(props);
        this.state = { visible: false, current: 0 };
    }

    //预览大图
    preview(index) {
        if (!this.props.pc) return;
        this.setState({ visible: true, current: index });
    }

    closeDialog() {
        this.setState({ visible: false });
    }

    render() {
        const { gifs, mode, pc } = this.props;
        //弹出框可见状态
        const { visible, current } = this.state;
        return (
            <section>
            {
                mode == 'story' || pc
                ? (
                    <div className="topic-content-story">
                    {
                        gifs.map((gif, i) => {
                            var ratio = gif.meta.height / gif.meta.width;
                            var unit = pc ? 'px' : 'rem';
                            var width = pc ? 400 : '100%';
                            var height = pc ? ratio * width : '2';

                            return (
                                <section key={gif.id}>
                                    <Lazyload throttle={200} height={gif.meta.height} offset={200}>
                                        <ImagePlaceholder width="100%" height={`${height}${unit}`}><img src={gif.url_normal} onClick={this.preview.bind(this, i)}/></ImagePlaceholder>
                                    </Lazyload>
                                    <p>{gif.description}</p>
                                    { i !== (gifs.length - 1) && <hr/>}
                                </section>
                            )
                        })
                    }
                    </div>
                )
                : (
                    <div className="topic-content-face">
                        <ul className="topic-content-face-lists">
                        {
                            gifs.map((gif, i) => {
                                return (
                                    <li key={gif.id} style={{'background':`url(${gif.url_normal}) center no-repeat`,'backgroundSize':'cover'}} onClick={this.preview.bind(this, i)}>
                                    </li>
                                )
                            })
                        }
                        </ul>
                    </div>
                )
            }
            <Dialog visible={visible} onClose={this.closeDialog.bind(this)}>
                <PhotoCard cards={gifs.map(item => ({id: item.id, url: item.url_normal}))} current={current} caption="更多专题内的动图"></PhotoCard>
            </Dialog>
            </section>
        )
    }
}
