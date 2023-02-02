import path from 'path'
import nodeExternals from 'webpack-node-externals'
import LoadablePlugin from '@loadable/webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const DIST_PATH = path.resolve(__dirname, 'public/dist')
const production = process.env.NODE_ENV === 'production'
const testbuild = process.env.TESTBUILD === 'true'
const development =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

const testEntrypoins = ['simple', 'prefetch', 'preload','ssrfalse', 'props', 'library']
const getTestEntrypoints = target => testEntrypoins.reduce((acc,value)=>{
  acc[value]=`./src/client/${value}${target === 'web'?`-${target}`:''}.js`
  return acc
}, {})

const getConfig = target => ({
  name: target,
  mode: development ? 'development' : 'production',
  target,
  entry: Object.assign({ 'main': `./src/client/main-${target}.js` }, testbuild ? getTestEntrypoints(target) : {}),
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
  optimization: {
    moduleIds: 'named',
    chunkIds: 'named',
  },
  resolve: {
    alias: target === 'web' ? {
      perf_hooks: path.resolve("./perf_hooks.js"),
    } : {}
  },  
  externals:
    target === 'node' ? ['@loadable/component', nodeExternals()] : undefined,
  output: {
    path: path.join(DIST_PATH, target),
    // filename: production ? '[name]-bundle-[chunkhash:8].js' : '[name].js',
    filename: production ? '[name].js' : '[name].js',
    publicPath: `/dist/${target}/`,
    libraryTarget: target === 'node' ? 'commonjs2' : undefined,
  },
  plugins: [new LoadablePlugin(), new MiniCssExtractPlugin()],
})

export default [getConfig('web'), getConfig('node')]
