// entry of application.
const express = require('express');
const proxy = require('http-proxy-middleware');
// const c2k = require('koa2-connect');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const opn = require('opn');

const config = require('./config');
const Router = require('./router');

app.prepare()
    .then(() => {
        const server = new express()
        var router = new Router(server, app)

        // custom route
        router.register();

        // request proxy
        const proxyUrl = config[process.env.NODE_ENV || 'development'].host
        server.use('/api', proxy({ target: proxyUrl, changeOrigin: true }))

        // default route
        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(config.port, (err) => {
            if (err) throw err

            var uri = `http://localhost:${config.port}`
            console.log(`> Ready on ${uri}`)
            opn(uri);
        })
    })

process.on('uncaughtException', function(err) {
    err && console.error(err);
})
