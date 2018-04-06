/* eslint-disable flowtype/require-valid-file-annotation, no-console, import/extensions */
import nodeResolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import json from 'rollup-plugin-json'
import uglify from 'rollup-plugin-uglify'
import visualizer from 'rollup-plugin-visualizer'
import sourceMaps from 'rollup-plugin-sourcemaps'
import pkg from './package.json'

const commonPlugins = [
  json(),
  nodeResolve(),
  sourceMaps(),
  babel({ plugins: ['external-helpers'] }),
  commonjs({ ignoreGlobal: true }),
]

const configBase = {
  input: 'src/index.js',
  external: ['react'].concat(Object.keys(pkg.dependencies)),
  plugins: commonPlugins,
}

const umdConfig = Object.assign({}, configBase, {
  output: {
    file: 'dist/loadable-components.js',
    format: 'umd',
    name: 'loadable',
    exports: 'named',
    globals: { react: 'React', 'hoist-non-react-statics': 'hoistNonReactStatics' },
    sourcemap: true,
  },
})

const devUmdConfig = Object.assign({}, umdConfig, {
  plugins: umdConfig.plugins.concat(
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ),
})

const prodUmdConfig = Object.assign({}, umdConfig, {
  output: Object.assign({}, umdConfig.output, {
    file: 'dist/loadable-components.min.js',
  }),
  plugins: umdConfig.plugins.concat([
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    uglify({ sourceMap: true }),
    visualizer({ filename: './bundle-stats.html' }),
  ]),
})

const esConfig = Object.assign({}, configBase, {
  output: [
    {
      file: 'dist/loadable-components.es.js',
      format: 'es',
      globals: { react: 'React', 'hoist-non-react-statics': 'hoistNonReactStatics' },
      sourcemap: true,
    },
    {
      file: 'dist/loadable-components.cjs.js',
      format: 'cjs',
      exports: 'named',
      globals: { react: 'React', 'hoist-non-react-statics': 'hoistNonReactStatics' },
      sourcemap: true,
    },
  ],
})

const serverConfig = Object.assign({}, configBase, {
  input: 'src/server/index.js',
  output: [
    {
      file: 'dist/loadable-components.server.cjs.js',
      format: 'cjs',
      exports: 'named',
      globals: { react: 'React' },
      sourcemap: true,
    },
  ],
})

const babelConfig = Object.assign({}, configBase, {
  input: 'src/babel.js',
  output: [
    {
      file: 'dist/loadable-components.babel.cjs.js',
      format: 'cjs',
      exports: 'named',
      globals: { react: 'React' },
      sourcemap: true,
    },
  ],
})

export default [
  devUmdConfig,
  prodUmdConfig,
  esConfig,
  serverConfig,
  babelConfig,
]
