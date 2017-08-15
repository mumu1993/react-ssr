### redux store

### redux数据状态中心

- action

> 由``view``触发对应的功能``action``，执行具体业务逻辑，发送异步请求

- reducer

> 接收由``action``分发(``dispatch``)的不同类型``actionType``，更新``state``数据  
> 将不同业务对一个的``reducer``合并(``combineReducers``)，统一导出供``store``调用

- initalState

> ``state``初始状态，每个``reducer``需指定自己的初始状态

- store

> 因采用服务端渲染方式，每个不同page，使用一个独立的``store``，使用``redux``中的``createStore``方法创建一个store，导出到page
