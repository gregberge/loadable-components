const path = require('path')
const fs = require('fs')

class LoadablePlugin {
  constructor({ filename = 'loadable-stats.json', writeToDisk = false } = {}) {
    this.opts = { filename, writeToDisk }

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

    if (this.opts.writeToDisk) {
      this.writeAssetsFile(result)
    }

    callback()
  }

  /**
   * Check if request is from Dev Server
   * aka webpack-dev-server
   * @method isRequestFromDevServer
   * @returns {boolean} - True or False
   */
  isRequestFromDevServer = () => {
    if (process.argv.some(arg => arg.includes('webpack-dev-server'))) {
      return true
    }
    return (
      this.compiler.outputFileSystem &&
      this.compiler.outputFileSystem.constructor.name === 'MemoryFileSystem'
    )
  }

  /**
   * Get assets manifest output path
   *
   * @method getManifestOutputPath
   * @returns {string} - Output path containing path + filename.
   */
  getManifestOutputPath = () => {
    if (path.isAbsolute(this.opts.filename)) {
      return this.opts.filename
    }

    if (this.isRequestFromDevServer() && this.compiler.options.devServer) {
      let outputPath =
        this.compiler.options.devServer.outputPath ||
        this.compiler.outputPath ||
        '/'

      if (outputPath === '/') {
        // eslint-disable-next-line no-console
        console.warn(
          'Please use an absolute path in options.output when using webpack-dev-server.',
        )
        outputPath = this.compiler.context || process.cwd()
      }

      return path.resolve(outputPath, this.opts.filename)
    }

    return path.resolve(this.compiler.outputPath, this.opts.filename)
  }

  /**
   * Write Assets Manifest file
   * @method writeAssetsFile
   */
  writeAssetsFile = manifest => {
    const filePath = this.getManifestOutputPath()
    const fileDir = path.dirname(filePath)

    try {
      if (!fs.existsSync(fileDir)) {
        fs.mkdirSync(fileDir)
      }
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err
      }
    }

    fs.writeFileSync(filePath, manifest)
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
