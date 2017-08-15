import Document, { Head, Main, NextScript } from 'next/document'
import withRedux from 'next-redux-wrapper'

import Header from 'components/header/index.js'
// import Footer from 'components/footer/index.js'
import pcStyle from 'styles/pc.css';
import mobileStyle from 'styles/mobile.css';
import { isPc } from 'common/utils'

import { queryCategories } from 'store/action/common'

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const { req, store, query } = ctx;
        const category_id = query.category_id;
        const props = await Document.getInitialProps(ctx)
        const isDev = (process.env.NODE_ENV || 'development') === 'development';
        const pc = isPc(req ? req.headers['user-agent'] : navigator.userAgent);

        // query categories of header
        var categories = [];
        if (store && store.dispatch) {
            categories = await queryCategories()(store.dispatch);
        }
        // console.log(categories);
        const hideHeader = !pc && ['/topic'].indexOf(ctx.pathname) !== -1;
        return {...props, isDev, categories, category_id, pc, hideHeader }
    }

    render() {
        return (
            <html>
               <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta httpEquiv="Content-Type" content="text/html;charset=utf-8" />
                    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
                    <link rel="shortcut icon bookmark" type="image/x-icon" href="/static/favicon.ico" />
                    <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" />
                    <script src="/static/adapt.js"></script>
                    <style dangerouslySetInnerHTML={{ __html: this.props.pc ? pcStyle : mobileStyle }} />
               </Head>
               <body>
                 {
                     !this.props.hideHeader && <Header pc={this.props.pc} items={this.props.categories} category_id={this.props.category_id}></Header>
                 }
                 <Main></Main>
                 <NextScript />
                 <script src="https://s19.cnzz.com/z_stat.php?id=1262663052&web_id=1262663052" language="JavaScript"></script>
               </body>
             </html>
        )
    }
}

//<link href='/static/styles/index.css' rel='stylesheet' type='text/css' />
// { this.props.isDev ? <NextScript /> : null }
