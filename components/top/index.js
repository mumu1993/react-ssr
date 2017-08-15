import React, { PureComponent } from 'react';

import Lazyload from 'components/react-lazyload/index';
import ImagePlaceholder from 'components/image-placeholder/index';
import randomColor from '../image-placeholder/random-color.js'

export default class Header extends PureComponent {
    render() {
        return (
            <ul className="index-hot-lists">
                {
                    this.props.tops && this.props.tops.map((top, i) => {
                        if(i < 2){
                            return (
                                <a key={`top_${top.id}`} href={`/topic?id=${top.id}`} target="_blank">
                                    <li className="index-hot-active">
                                      <Lazyload throttle={200} height={120} offset={200} placeholder={<ImagePlaceholder pc={this.props.pc} width="auto" height="210px"/>}>
                                          <div className="index-hot-cover" style={{'background': `url(${top.cover.url}) center no-repeat`, 'backgroundSize': 'cover'}}>
                                            <p className="index-hot-ranking"><span>{i+1}</span></p>
                                          </div>
                                      </Lazyload>
                                      <div className="index-hot-info">
                                        <h3 className="index-hot-title">{top.title}</h3>
                                        <p className="newset-author index-hot-author">
                                            <span style={{'background': `url(${top.user.avatar}) center no-repeat`, 'backgroundSize': 'cover'}}></span>
                                            {top.user && top.user.name}
                                        </p>
                                      </div>
                                    </li>
                                </a>
                            )
                        }else {
                            return (
                                <li className="index-hot-item" key={`top_${top.id}`}>
                                  <Lazyload throttle={200} height={72} offset={200} width="120">
                                    <a className="index-hot-cover-a" href={`/topic?id=${top.id}`} target="_blank">
                                      <div className="index-hot-cover" style={{'background': `${randomColor()} url(${top.cover.url}) center no-repeat`, 'backgroundSize': 'cover'}}>
                                        <p className="index-hot-ranking"><span>{i+1}</span></p>
                                      </div>
                                    </a>
                                  </Lazyload>

                                  <div className="index-hot-info">
                                    <h3 className="index-hot-title"><a href={`/topic?id=${top.id}`} target="_blank">{top.title}</a></h3>
                                    {
                                        top.sticker &&
                                        (
                                            <p className="newset-culumn index-hot-culumn" style={{'background': top.sticker.color}}>
                                                {top.sticker.name}
                                            </p>
                                        )
                                    }
                                     <p className="newset-author index-hot-author">
                                        <span style={{'background': `url(${top.user.avatar}) center no-repeat`, 'backgroundSize': 'cover'}}></span>
                                        {top.user && top.user.name}
                                    </p>
                                  </div>
                                </li>
                            )
                        }
                    })
                }
            </ul>
        )
    }
}
