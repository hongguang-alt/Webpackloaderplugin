const path = require('path')
const ZIPPlugin = require('./plugin/zip-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.join(__dirname, 'dist')
    },
    mode: "production",
    plugins: [
        new ZIPPlugin({
            filename: "hongguang"
        })
    ]
}