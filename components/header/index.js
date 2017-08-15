import React, { PureComponent } from 'react';
import Link from 'next/link';

export default class Header extends PureComponent {
    constructor(props) {
        super(props);
        if (!props.items || !props.items.length) return;
        if (!props.items.some(item => !item.id)) {
            props.items.unshift({
                id: 0,
                name: '全站',
                icon: '/static/images/ico_desktop_nav_catology_default.png',
            });
        }

        if (!props.pc && props.category_id) {
            const index = props.items.findIndex(item => item.id == props.category_id);
            var item = props.items[index];
            props.items.splice(index, 1);
            props.items.unshift({
                id: item.id,
                name: item.name,
            });
        }

    }

    render() {
        //header-all
        const activeCls = (current_category) => {
            if (!this.props.category_id && !current_category) {
                return this.props.pc ? 'header-active' : '';
            }
            return current_category == this.props.category_id ? 'header-active' : '';
        }

        const computeUrl = (id, i) => {
            if (i == 0) return this.props.pc ? '/' : 'javascript:void(0)';
            return !!id ? `/?category_id=${id}` : '/';
        }

        const max = 8;
        let items = [],
            moreItems = [];
        if (this.props.items && !!this.props.items.length) {
            items = this.props.items && this.props.items.slice(0, max);
            moreItems = this.props.items.slice(max);
        }

        return (
            <header className='fatu-container-fuild common-header'>
                <div className="fatu-container clearfix header-con">
                    <Link href="/"><a className="header-logo"></a></Link>
                    {
                        this.props.pc ?
                        (   <section>
                            <ul className="header-classify">
                                {
                                    items.map((item, i) => (
                                        <li key={item.id} className={`${activeCls(item.id)}`}>
                                            <Link href={computeUrl(item.id, i)}>
                                                <a>
                                                    <span style={{'background': `url(${item.icon}) center no-repeat`, 'backgroundSize': '14px 14px'}}></span>
                                                    {item.name}
                                                </a>
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                            {

                                !!moreItems.length && (
                                    <div className="header-more header-more-hide">
                                        <p>更多</p>
                                        <ul className="header-classify">
                                        {
                                            moreItems.map((item, i) => (
                                                <li key={item.id} className={`${activeCls(item.id)}`}>
                                                    <Link href={computeUrl(item.id, i)}>
                                                        <a>
                                                            <span style={{'background': `url(${item.icon}) center no-repeat`, 'backgroundSize': '14px 14px'}}></span>
                                                            {item.name}
                                                        </a>
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                        </ul>
                                    </div>
                                )
                            }
                            </section>
                        )
                        : (
                            <ul className="header-classify">
                                {
                                    this.props.items && this.props.items.map((item, i)=> (
                                        <li key={item.id} className={`${i==0?'header-all':''} ${activeCls(item.id)}`}>
                                            <Link href={computeUrl(item.id, i)}>
                                                <a>{item.name}<span></span></a>
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        )
                    }

                </div>
                <div className="mask hide"></div>
            </header>
        )
    }
}
