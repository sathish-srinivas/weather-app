const { resolve } = require('path');
const webpack = require('webpack');
const { EnvironmentPlugin } = require('webpack');

const dist_path = resolve(__dirname, './dist');
const src_path = resolve(__dirname, './src');

const config = {
    entry: `${src_path}/index.js`,
    output: {
        filename: 'bundle.js',
        path: dist_path,
    },
    module: {
        rules: [
            {
                test: /\.(js)$/, loader: 'babel-loader', exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            JQuery: 'jquery',
            jQuery: 'jquery',
            Backbone: 'backbone',
            _: 'underscore'
        }),
        new EnvironmentPlugin({
            WEATHER_API: 'http://api.openweathermap.org/data/2.5/onecall',
            GEO_CODING_API: 'http://api.openweathermap.org/geo/1.0/reverse',
            WEATHER_API_KEY: '',
            CURRENCY_API: 'https://v2.api.forex/rates/latest.json',
            CURRENCY_API_KEY: '',
            GOOGLE_API_KEY: '',
        })
    ],
    devServer: {
        static: {
            directory: dist_path,
            serveIndex: true,
            watch: true
        },
        // host: "127.0.0.1",
        historyApiFallback: {
            disableDotRule: true,
        },
        allowedHosts: "all",
        port: 8080
    }
};
module.exports = config;