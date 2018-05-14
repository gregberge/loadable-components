const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: './src/client.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          babelrc: false,
          presets: [
            'react',
            [
              'env',
              {
                targets: {
                  browsers: ['last 2 chrome versions'],
                },
                modules: false,
              },
            ],
          ],
          plugins: [
            'react-hot-loader/babel',
            'loadable-components/babel',
            ['transform-class-properties', { loose: true }],
            'transform-object-rest-spread',
          ],
        },
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'sourcemap',
  devServer: {
    hot: true,
    proxy: {
      contentBase: path.resolve(__dirname, 'public'),
      publicPath: '/',
      '/': {
        target: 'http://localhost:3000',
      },
    },
  },
}
