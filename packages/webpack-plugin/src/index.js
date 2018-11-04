class LoadablePlugin {
  constructor({ filename = 'loadable-stats.json' } = {}) {
    this.opts = { filename }
  }

  apply(compiler) {
    // Add a custom output.jsonpFunction: __LOADABLE_LOADED_CHUNKS__
    compiler.options.output.jsonpFunction = '__LOADABLE_LOADED_CHUNKS__'

    compiler.hooks.emit.tap('@loadable/webpack-plugin', hookCompiler => {
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
    })
  }
}

module.exports = LoadablePlugin
module.exports.default = LoadablePlugin
