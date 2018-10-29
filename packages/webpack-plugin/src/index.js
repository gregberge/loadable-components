import path from 'path'

class LoadablePlugin {
  constructor({ filename = 'loadable-manifest.json' } = {}) {
    this.opts = { filename }
  }

  apply(compiler) {
    compiler.hooks.emit.tap('@loadable/webpack', hookCompiler => {
      const { assetsByChunkName, publicPath } = hookCompiler.getStats().toJson({
        hash: true,
        publicPath: true,
        assets: true,
        chunks: false,
        modules: false,
        source: false,
        errorDetails: false,
        timings: false,
      })
      const assetPath = (publicPath || '').replace(/\/$/, '')
      const fullAssetsByChunkName = Object.keys(assetsByChunkName).reduce(
        (assets, key) => {
          let asset = assetsByChunkName[key]
          if (Array.isArray(asset)) {
            ;[asset] = asset
          }
          assets[key] = path.join(assetPath, asset)
          return assets
        },
        {},
      )
      const result = JSON.stringify(fullAssetsByChunkName, null, 2)
      hookCompiler.assets[this.opts.filename] = {
        source() {
          return result
        },
        size() {
          return result.length
        },
      }
    })
  }
}

module.exports = LoadablePlugin
module.exports.default = LoadablePlugin
