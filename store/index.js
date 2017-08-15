// home store
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import reducers from './reducer/index.js'
import initState from './initalState.js'

// 导出创建store， 需传入初始state
export const makeStore = (initialState = initState) => {
    // var middleware = applyMiddleware(thunkMiddleware);
    // if (process.env.NODE_ENV === 'development') {
    //     middleware = composeWithDevTools(middleware)
    // }
    return createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
