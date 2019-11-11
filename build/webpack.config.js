const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {join:pathJoin} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const isProd = process.env.NODE_ENV === 'production'

const webpackConfig = {
    mode: process.env.NODE_ENV,
    entry:'./Demo/index.js',
    output:{
        filename:'[name].[hash].js',
        path:pathJoin(__dirname,'./dist')
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        modules: ['node_modules']
    },
    devServer: {
        host: '0.0.0.0',
        port: 8081,
        publicPath: '/',
        hot: true
    },
    performance: {
        hints: false
    },
    stats: {
        children: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader"
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.svg/,
                use: ['file-loader']
            },
            {
                test: /\.md$/,
                use: [{
                    loader: 'html-loader'
                }, {
                    loader: 'markdown-loader',
                }]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './Demo/index.html',
            filename: './index.html',
            favicon: './Demo/assets/icon/favicon.ico'
        }),
        new ProgressBarPlugin(),
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env.FAAS_ENV': JSON.stringify(process.env.FAAS_ENV)
        }),
        new webpack.LoaderOptionsPlugin({
            vue: {
                compilerOptions: {
                    preserveWhitespace: false
                }
            }
        })
    ],
    optimization: {
        minimizer: []
    },
    devtool: '#eval-source-map'
}

if (isProd) {
    webpackConfig.externals = {
        vue: 'Vue',
        'vue-router': 'VueRouter',
    }

    webpackConfig.optimization.splitChunks = {
        chunks:'initial'
    }
    webpackConfig.devtool = false
}

module.exports = webpackConfig
