// next.config.js
const path = require('path')
const glob = require('glob')

module.exports = {
    //build directory
    distDir: 'build',

    //webpack config
    webpack: (config, { dev }) => {
        config.module.rules.push({
            test: /\.(css|scss)/,
            loader: 'emit-file-loader',
            options: {
                name: 'dist/[path][name].[ext]'
            }
        }, {
            test: /\.css$/,
            use: ['babel-loader', 'raw-loader', 'postcss-loader']
        }, {
            test: /\.s(a|c)ss$/,
            use: ['babel-loader', 'raw-loader', 'postcss-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        includePaths: ['styles', 'node_modules']
                            .map((d) => path.join(__dirname, d))
                            .map((g) => glob.sync(g))
                            .reduce((a, c) => a.concat(c), [])
                    }
                }
            ]
        })

        //path alias
        config.resolve = {
            extensions: ['.js'],
            alias: {
                'config': path.resolve(__dirname, './config'),
                'common': path.resolve(__dirname, './common'),
                'components': path.resolve(__dirname, './components'),
                'store': path.resolve(__dirname, './store'),
            }
        }

        return config
    }
}
