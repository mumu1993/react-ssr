// system config
const config = {
    port: 7000,
    // appversion
    version: '1.0.0',
    urls: {
        virtual: '/api/v1',
        proxy: '',
    },
    development: {
        host: 'https://api-demo.fatu.me',
        // host: 'https://api.fatu.me',
        prefix: 'api',
        version: 'v1',
    },
    production: {
        host: 'https://api.fatu.me',
        // host: 'https://api-demo.fatu.me',
        prefix: 'api',
        version: 'v1',
    }
}

// 请求转发目标url
const current = config[process.env.NODE_ENV || 'development'];
const proxyUrl = `${current.host}/${current.prefix}/${current.version}`;
config.urls.proxy = proxyUrl;

module.exports = config;
