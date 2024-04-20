import path from 'path'
import nodeExternals from 'webpack-node-externals'
import LoadablePlugin from '@loadable/webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const DIST_PATH = path.resolve(__dirname, 'public/dist')
const production = process.env.NODE_ENV === 'production'
const development = !production

const getConfig = target => ({
  experiments: {
    outputModule: true,
  },
  name: target,
  mode: 'production',
  target,
  // entry: `./src/client/main-${target}.js`,
  entry: target==='web' ? `./src/client/main-web.js` : './src/server/main.js',
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            caller: { target },
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
    ],
  },
  externals:
    target === 'node' ? ['@loadable/component','@loadable/server', nodeExternals()] : undefined,

  optimization: {
    // this will lead to runtime error
    runtimeChunk: target !== 'node',
  },

  devtool:undefined,
  output: {
    path: path.join(DIST_PATH, target),
    filename: production ? '[name]-bundle-[chunkhash:8].js' : '[name].mjs',
    publicPath: `/dist/${target}/`,
    libraryTarget: 'module',// target === 'node' ? 'commonjs2' : undefined,
    chunkFormat:'module',
    module:true,
  },
  plugins: [new LoadablePlugin(), new MiniCssExtractPlugin()],
})

export default [getConfig('web'), getConfig('node')]
