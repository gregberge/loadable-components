const path = require('path')

module.exports = {
  entry: './client.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    chunkFilename: '[name].bundle.js',
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
                modules: false
              },
            ],
          ],
          plugins: [
            'loadable-components/babel',
            ['transform-class-properties', { loose: true }],
            'transform-object-rest-spread',
          ],
        },
      },
    ],
  },
  devtool: 'sourcemap',
  devServer: {
    proxy: {
      contentBase: path.resolve(__dirname, 'public'),
      publicPath: '/',
      '/': {
        target: 'http://localhost:3000',
      },
    },
  },
}
