//列表布局方式
import React, { PureComponent } from 'react';

import Lazyload from 'components/react-lazyload/index';
import ImagePlaceholder from 'components/image-placeholder/index';
import randomColor from '../image-placeholder/random-color.js'

export default class Header extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { hot, pc } = this.props;
        const width = pc ? 120 : '1.2rem';
        return (
            <section>
                <Lazyload throttle={200} height={72} offset={200} width={width}>
                  <a className="index-hot-cover-a" href={`/topic?id=${hot.id}`} target="_blank">
                    <div className="index-hot-cover" style={{'background': `${randomColor()} url(${hot.cover.url}) center no-repeat`, 'backgroundSize': 'cover'}}>
                    </div>
                  </a>
                </Lazyload>
                <div className="index-hot-info">
                  <h3 className="index-hot-title"><a href={`/topic?id=${hot.id}`} target="_blank">{hot.title}</a></h3>
                  {
                      hot.sticker &&
                      (
                          <p className="newset-culumn index-hot-culumn" style={{'background': hot.sticker.color}}>
                              {hot.sticker.name}
                          </p>
                      )
                  }
                  <p className="newset-author index-hot-author">
                      <span style={{'background': `url(${hot.user.avatar}) center no-repeat`, 'backgroundSize': 'cover'}}></span>
                      {hot.user && hot.user.name}
                  </p>
                </div>
            </section>
        )
    }
}
