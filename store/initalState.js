//inital state
import { PageSize } from 'common/constant'

const topic = {
    page: 0,
    per_page: PageSize,
    topics: [],
    hasMore: true,
    //是否正在加载数据
    loading: false,
}

const hot = {
    page: 0,
    per_page: PageSize,
    hots: [],
    hasMore: true,
    //是否正在加载数据
    loading: false,
}

const top = {
    tops: []
}

const search = {
    topic: {
        page: 0,
        per_page: PageSize,
        keyword: '',
        total: 0,
        type: 'topic',
        results: [],
        hasMore: true,
        //是否正在加载数据
        loading: false,
    },
    gif: {
        page: 0,
        per_page: PageSize,
        keyword: '',
        total: 0,
        type: 'gif',
        results: [],
        hasMore: true,
        //是否正在加载数据
        loading: false,
    }
}

export default {
    hot,
    topic,
    top,
    search,
}
