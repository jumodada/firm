'use strict'

const path = require('path')

module.exports = {
    entry: './Examples/index.js',
    output: {
        path:path.join(__dirname,'dist'),
        filename: "bundle.js"
    },
    mode: "production"
}
