import React, { PureComponent } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import randomColor from './random-color.js'

export default class ImagePlaceholder extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            'loaded': false
        };
    }

    static propTypes = {
        placeholder: PropTypes.node,
        enableBackgroundColor: PropTypes.bool,
        height: PropTypes.string,
        width: PropTypes.string,
        float: PropTypes.string,
    }

    static defaultProps = {
        placeholder: null,
        enableBackgroundColor: true,
        height: '120px',
        width: '183px',
        float: 'none',
    }

    handleImageLoaded() {
        this.refs.img_container.style.background = 'transparent';
        this.refs.img_container.style.height = 'auto';

        // this.props.onLoad && this.props.onLoad(this.refs.img_container);
        this.setState({ loaded: true });
    }

    render() {
        let { width, height, float } = this.props;
        const children = React.Children.map(this.props.children, child => {
            /*
            if (child.type !== 'img') {
                var background = child.props.style.background || child.props.style.backgroundImage;
                if (background) {
                    var imgUrl = background.replace(/url\(['"]?(.*?)['"]?\)/i, "$1").split(' ')[0];
                    if (imgUrl) {
                        var image = document.createElement('img');
                        image.src = imgUrl;
                        image.onload = () => {
                            this.handleImageLoaded.bind(this);
                            // this.refs.img_container.style.height = '0';
                        };
                    }
                }
            }*/

            return React.cloneElement(child, { onLoad: this.handleImageLoaded.bind(this) });
        });

        let color = 'transparent';
        if (!this.state.loaded && this.props.enableBackgroundColor) {
            // const colors = ['#FFEB4C', '#FFF6B2', '#FFF17F'];
            // color = colors[Math.floor(Math.random() * 3)];
            color = randomColor()
        }

        return (
            <div ref="img_container" style={{
                'display':'inline-block',
                'background': color,
                'height': height,
                'width': width,
                // 'float': float,
            }}>
                {children}
            </div>
        )
    }
}
