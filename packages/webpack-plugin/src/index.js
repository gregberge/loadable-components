const nodePath = require('path')
const fs = require('fs')

class LoadablePlugin {
  constructor({
    filename = 'loadable-stats.json',
    path,
    writeToDisk = {},
  } = {}) {
    this.opts = { filename, writeToDisk, path }

    // The Webpack compiler instance
    this.compiler = null
  }

  handleEmit = (hookCompiler, callback) => {
    const stats = hookCompiler.getStats().toJson({
      hash: true,
      publicPath: true,
      assets: true,
      chunks: false,
      modules: false,
      source: false,
      errorDetails: false,
      timings: false,
    })
    const result = JSON.stringify(stats, null, 2)

    hookCompiler.assets[this.opts.filename] = {
      source() {
        return result
      },
      size() {
        return result.length
      },
    }

    if (this.opts.writeToDisk.filename) {
      this.writeAssetsFile(this.opts.writeToDisk.filename, result)
    }

    callback()
  }

  /**
   * Write Assets Manifest file
   * @method writeAssetsFile
   */
  writeAssetsFile = (outputFolder, manifest) => {
    const outputFile = nodePath.resolve(outputFolder, this.opts.filename)

    try {
      if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder)
      }
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err
      }
    }

    fs.writeFileSync(outputFile, manifest)
  }

  apply(compiler) {
    this.compiler = compiler

    // Add a custom output.jsonpFunction: __LOADABLE_LOADED_CHUNKS__
    compiler.options.output.jsonpFunction = '__LOADABLE_LOADED_CHUNKS__'

    compiler.hooks.emit.tapAsync('@loadable/webpack-plugin', this.handleEmit)
  }
}

module.exports = LoadablePlugin
module.exports.default = LoadablePlugin
