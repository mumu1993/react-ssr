/**
 * 服务请求调用
 */
import axios from 'axios';
import { URL } from '../config/url.js';
import { PageSize } from './constant.js';
import config from '../config';

import utils from './utils'
// import store from 'store/index.js';

const Request = {};
module.exports = Request;

//请求超时时长
const TIMEOUT = 60000;
//http请求授权header属性
const AUTH_KEY = 'Authorization';

var request = (options) => {
    //处理查询参数，过滤空值参数
    utils.filterParams(options.params || options.body);

    // process && process.env && process.env.NODE_ENV !== 'production' &&
    // console.info(`[${options.method}]`, (options.params || ''), `${options.url}`);

    var start, end;
    start = new Date().getTime();

    //添加自定义请求头
    options.headers['X-App'] = `X-Web/${config.version}`;

    return axios.request({
        headers: options.headers,
        url: options.url,
        method: options.method,
        data: options.body,
        params: options.params,
        timeout: TIMEOUT,
        // emulateJSON: true,
    }).then(response => {
        // console.log('response', response);
        endLoading();
        if (~~(response.status / 100) !== 2) {
            if (utils.isNode()) {
                console.error(response);
                return;
            }
            throw new Error(response);
        }
        //请求结束
        var result = response.data;

        //自定义响应内容
        if (options.extra.callback) {
            result = options.extra.callback(response);
        }

        end = new Date().getTime();
        console.info(`[elapsed - ${end - start} ms]`, `[${options.method}]`, (options.params || ''), `${options.url}`);
        return result;
    }).catch((e) => {
        //抛出异常
        if (utils.isNode()) {
            console.error('[request error]', options.url, e);
            return;
        }
        endLoading();
        throw e;
    });

    //终止loading动画
    function endLoading() {
        if (!utils.isNode()) {
            // setTimeout(() => store.commit && store.commit(types.SHOW_LOADING, false), 500);
        }
    }
}

//http请求方式
const http = {};
['get', 'post', 'put', 'delete'].forEach(method => {
    http[method] = (url, params, extra) => {
        var defaultConfig = { headers: {}, loadig: false, callback: false };
        extra = {...defaultConfig, ...extra };
        method = method.toUpperCase();
        if (method === 'GET') {
            return request({ url, params, method, headers: extra.headers, loading: extra.loading, extra });
        }
        return request({ url, body: params, method, headers: extra.headers, loading: extra.loading, extra });
    };
});

//获取最新精选
Request.queryHots = (options, extra) => {
    var url = `${URL.HOT_TOPICS}`;
    return http.get(url, options, extra);
}

//首页专题模块
Request.queryTopics = (options, extra) => {
    var url;
    //category_id为空 全站最新专题
    if (!options.category_id) {
        url = `${URL.TOPICS}`;
    } else {
        //某一分类下的最新专题
        url = `${URL.CATEGORY}/${options.category_id}/topics`
        delete options.category_id;
    }
    return http.get(url, options, extra);
}

//根据专题id查询专题明细（若为分享链接，查询分享中的专题详情）
Request.queryTopic = (id, isShare) => {
    var url = isShare ? `${URL.SHARE_DETAIL}/${id}` : `${URL.TOPICS}/${id}`;
    return isShare ? http.get(url).then(data => data.shareable) : http.get(url);
}

//导航分类目录查询
Request.queryCategories = (options, extra) => {
    var url = `${URL.CATEGORY}`;
    return http.get(url, options, extra);
}

//热门标签
Request.queryHotTags = (options, extra) => {
    var url = `${URL.HOT_TAGS}`;
    return http.get(url, options, extra);
}

//查询热门排行
Request.queryTops = (options, extra) => {
    var url = `${URL.TOP}`;
    return http.get(url, options, extra);
}

//随机获取几个专题
Request.randomTopics = () => {
    return http.get(URL.RANDOM_TOPIC, {});
}

//搜索
Request.search = (options, extra) => {
    return http.get(URL.SEACHR, options, extra);
}

//获取分享参数
Request.shareConfig = () => {
    return http.post(`${URL.SHARES}`)
}

//专题分享信息
Request.topicShareInfo = (options) => {
    return http.post(`${URL.TOPICS}/${options.id}/shares`, {
        media: options.media
    })
}
