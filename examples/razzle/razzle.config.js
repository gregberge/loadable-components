const path = require('path')
const LoadableWebpackPlugin = require('@loadable/webpack-plugin')
const LoadableBabelPlugin = require('@loadable/babel-plugin')
const babelPresetRazzle = require('razzle/babel')

module.exports = {
  modify: (config, { target }) => {
    const appConfig = Object.assign({}, config)

    if (target === 'web') {
      const filename = path.resolve(__dirname, 'build/loadable-stats.json')

      appConfig.plugins = [
        ...appConfig.plugins,
        new LoadableWebpackPlugin({ writeToDisk: true, filename }),
      ]
    }

    return appConfig
  },

  modifyBabelOptions: () => ({
    babelrc: false,
    presets: [babelPresetRazzle],
    plugins: [LoadableBabelPlugin],
  }),
}
