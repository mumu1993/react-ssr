// check whether is pc or not
function isPc(userAgent) {
    //userAgent = window.navigator.userAgent
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgent.indexOf(Agents[v]) > 0) { flag = false; break; }
    }
    return flag;
}

// check whether is nodejs environment
function isNode() {
    return process && process.title === 'node';
}

// format date
function formatDate(date) {
    if (!date) return date;
    if (/^\d+$/.test(date)) {
        date = new Date(date * 1000);
    } else {
        if (typeof date === 'string') {
            date = new Date(date);
        }
    }

    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()

    let hour = date.getHours()
    let minute = date.getMinutes()
        //let second = date.getSeconds()

    const now = new Date().getTime();
    const diff = now - date.getTime();
    const diffMinute = Math.floor(diff / (60 * 1000));
    if (diffMinute < 1) {
        return '1分钟前';
    } else if (diffMinute < 60) {
        return diffMinute + '分钟前';
    } else if (diffMinute < 60 * 24) {
        return Math.floor(diffMinute / 60) + '小时前';
    } else if (diffMinute < 60 * 24 * 7) {
        return Math.floor(diffMinute / 1440) + '天前';
    } else {
        return [year, month, day].map(formatNumber).join('-');
    }
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

//过滤左右空格
function trim(str) {
    if (!str) return str;
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

//参数过滤，移除空参数、多余空格
function filterParams(params) {
    if (typeof params === 'object') {
        for (var key in params) {
            if (params[key] === undefined) {
                delete params[key];
            } else if (typeof params[key] === 'string') {
                (params[key] = trim(params[key])) === '' && (delete params[key]);
            } else if (typeof params[key] === 'object') {
                params[key] = filterParams(params[key]);
            }
        }
    }
    return params;
}

function toRgb(color, alpha = 1) {
    if (!color) return color;
    var sColor = color.toLowerCase();
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = "#";
            for (var i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        var sColorChange = [];
        for (var i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }
        return `rgba(${sColorChange.join(',')}, ${alpha})`
    } else {
        return sColor;
    }
}

//获取元素位置偏移
function getOffset(element) {
    var box = element.getBoundingClientRect();
    var body = document.body,
        docElem = document.documentElement;

    //获取页面的scrollTop,scrollLeft
    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
        scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
    var clientTop = docElem.clientTop || body.clientTop,
        clientLeft = docElem.clientLeft || body.clientLeft;
    var top = Math.round(box.top + scrollTop - clientTop),
        left = Math.round(box.left + scrollLeft - clientLeft);

    //视口大小
    var clientWidth = docElem.clientWidth || body.clientWidth;
    // var clientHeight = docElem.clientHeight || body.clientHeight;
    var right = clientWidth - left - box.width;

    return {
        top,
        left,
        right,
    }
};

module.exports = {
    isPc,
    isNode,
    filterParams,
    formatDate,
    toRgb,
    getOffset,
}
