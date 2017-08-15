import React, { PureComponent } from 'react';

import Lazyload from 'react-lazyload';
import ImagePlaceholder from 'components/image-placeholder/index';

export default class Header extends PureComponent {
    constructor(props) {
        super(props);
        this.hot = props.hot || {};
    }

    render() {
        return (
            <section>
                <Lazyload throttle={200} height={102} offset={120}>
                    <div className="index-feature-cover" style={{'background': `url(${this.hot.cover.url}) center no-repeat`, 'backgroundSize': 'cover'}}>
                        {
                            this.hot.sticker && this.hot.sticker.name &&
                            (
                                <p className="newset-culumn index-feature-culumn" style={{'background': this.hot.sticker.color}}>
                                    {this.hot.sticker && this.hot.sticker.name}
                                </p>
                            )
                        }
                    </div>
                </Lazyload>
                <h3 className="index-feature-title">
                  <a href={`/topic?id=${this.hot.id}`} target="_blank">{this.hot.title}</a>
                </h3>
                <div className="index-feature-info">
                    <Lazyload throttle={200} height={120} offset={120} placeholder={<ImagePlaceholder/>}>
                        <p className="newset-classify">
                            <span style={{'background': `url(${this.hot.categories[0] && this.hot.categories[0].sub_icon || '/static/images/ico_common_catplogy_default.png'}) center no-repeat`, 'backgroundSize': 'cover'}}></span>
                            {this.hot.categories && this.hot.categories[0] && this.hot.categories[0].name}
                        </p>
                    </Lazyload>
                    <p className="newset-author">
                        <span style={{'background': `url(${this.hot.user.avatar}) center no-repeat`, 'backgroundSize': 'cover'}}></span>
                        {this.hot.user && this.hot.user.name}
                    </p>
                </div>
            </section>
        )
    }
}
