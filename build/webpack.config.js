'use strict'

const path = require('path')

module.exports = {
    entry: './Examples/index.js',
    output: {
        path:path.join(__dirname,'dist'),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test:/.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            }
        ]
    },
    mode: "production"
}
