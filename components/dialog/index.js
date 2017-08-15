import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './index.scss'

export default class Dialog extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible
        }
    }

    close(e) {
        this.props.onClose(e);
    }

    render() {
        const { visible, children } = this.props;
        // const { visible } = this.state;

        return (!visible ? null :
            (<section className="dialog-container">
                <div className="mask" onClick={this.close.bind(this)}></div>
                <style dangerouslySetInnerHTML={{ __html: styles }} />
                <section className="dialog">
                    <a className="close"></a>
                    {children}
                </section>
            </section>)
        )
    }
}
