// request url
const config = require('./index.js');

var host = process.browser ? config.urls.virtual : config.urls.proxy;

/*
 * 精选是hots
 * 热门是popular_topics
 * 最新是topics
 */

//请求url
export const URL = {};

//导航分类目录
//某一目录下的最新专题(中间部分的数据) /categories?category_id={category_id}/topics
URL.CATEGORY = `${host}/categories`;


//搜索动图(gif)或专题(topic) ?q=keyword&type=gif
URL.SEACHR = `${host}/search`;

//精选列表(篮球、足球、娱乐...) ?category_id=1  全站不带category_id参数
URL.HOT_TOPICS = `${host}/hots/topics`;

//热门标签
URL.HOT_TAGS = `${host}/hots/tags`;

//首页最新专题模块  专题详情 topics/648
URL.TOPICS = `${host}/topics`;

//获取热门排行  某个类型热门排行 /popular_topics?category_id={category_id}
URL.TOP = `${host}/popular_topics`;

//随机获取几个专题
URL.RANDOM_TOPIC = `${host}/random_topics`;

//查询分享内容详情
URL.SHARE_DETAIL = `${host}/shares`;

//分享
URL.SHARES = `${host}/configs/share`;
