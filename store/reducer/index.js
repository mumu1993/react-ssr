import { combineReducers } from 'redux'
import common from './common.js'
import topic from './topic.js'
import hot from './hot.js'
import top from './top.js'
import search from './search.js'

export default combineReducers({
    common,
    topic,
    hot,
    top,
    search,
})
