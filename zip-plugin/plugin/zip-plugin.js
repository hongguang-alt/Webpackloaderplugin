const ZipJS = require('jszip')
const zip = new ZipJS()
const path = require('path')
const RawSource = require('webpack-sources').RawSource

module.exports = class ZIPPlugin {
    constructor(options) {
        this.options = options
    }
    apply(compiler) {
        compiler.hooks.emit.tapAsync('ZIPPlugin', (compilation, callback) => {
            const folder = zip.folder(this.options.filename)

            for (let filename in compilation.assets) {
                const source = compilation.assets[filename].source()
                folder.file(filename, source)
            }
            zip.generateAsync({
                type: 'nodebuffer'
            }).then((content) => {
                let outputPath = path.join(compilation.options.output.path, this.options.filename + '.zip')
                const outputRelaticePath = path.relative(compilation.options.output.path, outputPath)
                compilation.assets[outputRelaticePath] = new RawSource(content)
                callback()
            })
        })
    }
}