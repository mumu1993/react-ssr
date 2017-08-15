import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Download extends PureComponent {
    render() {
        const url = this.props.pc ? 'http://sj.qq.com/myapp/detail.htm?apkName=sponia.me.fatu' : 'http://a.app.qq.com/o/simple.jsp?pkgname=sponia.me.fatu';
        return (
            <div className="clearfix index-download">
                <p className="index-download-appicon"></p>
                {
                    this.props.pc ? (
                        <a target="_blank" href={url} className="index-download-hint">下载「发图」</a>
                    ):(
                        <div className="index-download-mobile">
                            <p className="download-title">发图</p>
                            <p className="download-hint">好图！收了！</p>
                        </div>
                    )
                }
                <a href={url} className="index-download-button">立即下载</a>
            </div>
        )
    }
}
