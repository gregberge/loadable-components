const nodePath = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')

class LoadablePlugin {
  constructor({
    additionalAssetAttributes = [],
    filename = 'loadable-stats.json',
    path,
    writeToDisk,
    outputAsset = true,
  } = {}) {
    this.opts = {
      additionalAssetAttributes,
      filename,
      writeToDisk,
      outputAsset,
      path,
    }

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

    // include extra asset keys if present
    stats.assets = stats.assets.map((asset) => {
      const assetAttributes = hookCompiler.assets[asset.name];

      const validAssetAttributes = Object.keys(assetAttributes)
        .filter(key => this.opts.additionalAssetAttributes.includes(key))
        .reduce((obj, key) => {
          obj[key] = assetAttributes[key];
          return obj;
        }, {});
    
      return ({
        ...asset,
        ...validAssetAttributes,
      })
    })

    const result = JSON.stringify(stats, null, 2)

    if (this.opts.outputAsset) {
      hookCompiler.assets[this.opts.filename] = {
        source() {
          return result
        },
        size() {
          return result.length
        },
      }
    }

    if (this.opts.writeToDisk) {
      this.writeAssetsFile(result)
    }

    callback()
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
        mkdirp.sync(outputFolder)
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
