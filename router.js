module.exports = class Router {
    constructor(server, app) {
        this.server = server;
        this.app = app;
    }

    register() {
        // 专题
        this.server.get('/topic', (req, res) => {
            return this.app.render(req, res, '/topic', req.query)
        })

        // 精选
        this.server.get('/hot', (req, res) => {
            return this.app.render(req, res, '/hot', req.query)
        })

        // 搜索
        this.server.get('/search', (req, res) => {
            return this.app.render(req, res, '/search', req.query)
        })

        // 专题详情分享页
        this.server.get('/shares/:id', (req, res) => {
            req.query.shareId = req.params.id;
            return this.app.render(req, res, '/topic', req.query)
        })
    }
}
