const nodePath = require('path')
const fs = require('fs')
const makeDir = require('make-dir')

const name = '@loadable/webpack-plugin';

class LoadablePlugin {
  constructor({
    filename = 'loadable-stats.json',
    path,
    writeToDisk,
    outputAsset = true,
  } = {}) {
    this.opts = { filename, writeToDisk, outputAsset, path }

    // The Webpack compiler instance
    this.compiler = null
  }

  handleEmit = compilation => {
    const stats = compilation.getStats().toJson({
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

    if (this.opts.writeToDisk) {
      this.writeAssetsFile(result)
    }

    if (this.opts.outputAsset) {
      return {
        source() {
          return result
        },
        size() {
          return result.length
        },
      }
    }

    return null;
  }

  /**
   * Write Assets Manifest file
   * @method writeAssetsFile
   */
  writeAssetsFile = manifest => {
    const outputFolder =
      this.opts.writeToDisk.filename || this.compiler.options.output.path

    const outputFile = nodePath.resolve(outputFolder, this.opts.filename)

    try {
      if (!fs.existsSync(outputFolder)) {
        makeDir.sync(outputFolder)
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

    // Check if webpack version 4 or 5
    if ('jsonpFunction' in compiler.options.output) {
      // Add a custom output.jsonpFunction: __LOADABLE_LOADED_CHUNKS__
      compiler.options.output.jsonpFunction = '__LOADABLE_LOADED_CHUNKS__'
    } else {
      // Add a custom output.chunkLoadingGlobal: __LOADABLE_LOADED_CHUNKS__
      compiler.options.output.chunkLoadingGlobal = '__LOADABLE_LOADED_CHUNKS__'
    }

    const { webpack } = compiler;

    if (this.opts.outputAsset || this.opts.writeToDisk) {
      if (!webpack) { // v4
        compiler.hooks.emit.tap(name, compilation => {
          const asset = this.handleEmit(compilation)
          if (asset) compilation.assets[this.opts.filename] = asset
        })
      } else { // v5
        compiler.hooks.make.tap(name, compilation => {
          compilation.hooks.processAssets.tap(
            { name, stage: webpack.Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE },
            () => {
              const asset = this.handleEmit(compilation)
              if (asset) compilation.emitAsset(this.opts.filename, asset)
            }
          )
        })
      }
    }
  }
}

module.exports = LoadablePlugin
module.exports.default = LoadablePlugin
