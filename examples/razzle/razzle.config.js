/* eslint-disable prefer-object-spread */
const path = require('path')
const LoadableWebpackPlugin = require('@loadable/webpack-plugin')
const LoadableBabelPlugin = require('@loadable/babel-plugin')
const babelPresetRazzle = require('razzle/babel')

module.exports = {
  modify: (config, { dev, target }) => {
    const appConfig = Object.assign({}, config)

    if (target === 'web') {
      const filename = path.resolve(__dirname, 'build')

      appConfig.plugins = [
        ...appConfig.plugins,
        new LoadableWebpackPlugin({
          outputAsset: false,
          writeToDisk: { filename },
        }),
      ]

      appConfig.output.filename = dev
        ? 'static/js/[name].js'
        : 'static/js/[name].[chunkhash:8].js'

      appConfig.node = { fs: 'empty' } // fix "Cannot find module 'fs'" problem.

      appConfig.optimization = Object.assign({}, appConfig.optimization, {
        runtimeChunk: true,
        splitChunks: {
          chunks: 'all',
          name: dev,
        },
      })
    }

    return appConfig
  },

  modifyBabelOptions: () => ({
    babelrc: false,
    presets: [babelPresetRazzle],
    plugins: [LoadableBabelPlugin],
  }),
}
