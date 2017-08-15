import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './index.scss'
import randomColor from '../image-placeholder/random-color.js'

export default class PhotoCard extends PureComponent {
    static propTypes = {
        cards: PropTypes.array,
        caption: PropTypes.string,
        current: PropTypes.number,
    }

    static defaultProps = {
        cards: [],
        caption: '',
        current: 0,
    }

    constructor(props) {
        super(props);
        this.state = {
            current: this.props.current || 0,
            currentImage: '',
        };
    }

    //显示上一张图片
    showPre() {
        !!this.state.current && this.setState({ current: this.state.current - 1 });
        this._loadImage();
    }

    //显示下一张图片
    showNext() {
        this.state.current < (this.props.cards.length - 1) && this.setState({ current: this.state.current + 1 })
        this._loadImage();
    }

    //显示当前图片
    showCurrent(i) {
        this.setState({ current: i });
        this._loadImage();
    }

    componentDidMount() {
        this._loadImage();
    }

    _loadImage() {
        var image = document.createElement('img'),
            src = this.props.cards[this.state.current].url;
        image.src = src;
        image.onload = () => {
            // this.refs.photo && (this.refs.photo.style.backgroundColor = 'transparent');
            this.setState({
                currentImage: src
            })
        };
    }

    render() {
        const { cards, caption } = this.props;
        const { current, currentImage } = this.state;

        const activeCls = (current_category) => {
            return current_category == this.props.category_id ? 'header-active' : '';
        }

        // const offset = -200 * Math.min((cards.length - 3), current);
        let offset = 0;
        if (current > 0 && current < (cards.length - 1)) {
            offset = -205 * (current - 1);
        } else if (current == (cards.length - 1)) {
            offset = -205 * (current - 2);
        }

        var src = cards[current].url;
        var background = {
            'backgroundColor': currentImage ? 'transparent' : randomColor(),
            'backgroundImage': `url(${currentImage})`,
            'backgroundPosition': 'center center',
            'backgroundSize': 'contain',
            'backgroundRepeat': 'no-repeat',
        }

        return (
            <section className="photo-card-container">
                <style dangerouslySetInnerHTML={{ __html: styles }} />
                <div className="photo-card-show">
                    <div className="photo-card-big"
                        style={background}>
                    </div>
                    <figcaption>{caption}</figcaption>
                </div>
                <section className="photo-list">
                    <span className={`nav nav-left ${current==0 ? 'disabled' : ''}`} onClick={this.showPre.bind(this)}>没有了</span>
                    <div  className="photo-list-outer">
                    <ul>
                      {
                          cards.map((card, i) => {
                              return (
                                  <li key={`${card.id}:${i}`} className={`${current == i ? 'current_photo': ''}`} style={{'background':`${randomColor()} url(${card.url}) center no-repeat`,'backgroundSize':'cover', 'left': `${offset}px`}} onClick={this.showCurrent.bind(this, i)}></li>
                              )
                          })
                      }
                    </ul>
                    </div>
                    <span className={`nav nav-right ${current==(cards.length-1) ? 'disabled' : ''}`}  onClick={this.showNext.bind(this)}>没有了</span>
                </section>
            </section>
        )
    }
}
