/* eslint-disable import/no-extraneous-dependencies, import/no-mutable-exports */
import path from 'path'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify'
import pkg from './package.json'

// eslint-disable-next-line
const babelConfig = require('../../babel.config.js')
const SOURCE_DIR = path.resolve(__dirname, 'src')
const DIST_DIR = path.resolve(__dirname, 'dist')
const buildName = 'loadable'

const baseConfig = {
  input: `${SOURCE_DIR}/index.js`,
  plugins: [babel({ exclude: '**/node_modules/**', ...babelConfig })],
}

const esConfig = Object.assign({}, baseConfig, {
  output: {
    file: `${DIST_DIR}/${buildName}.es.js`,
    format: 'es',
  },
  external: [
    ...Object.keys(pkg.peerDependencies),
    ...Object.keys(pkg.dependencies),
  ],
})

const cjsConfig = Object.assign({}, esConfig, {
  output: {
    file: `${DIST_DIR}/${buildName}.cjs.js`,
    format: 'cjs',
    exports: 'named',
  },
})

const globals = { react: 'React' }

const umdConfig = Object.assign({}, baseConfig, {
  output: {
    name: 'loadable',
    file: `${DIST_DIR}/${buildName}.js`,
    format: 'umd',
    globals,
    exports: 'named',
    sourcemap: false,
  },
  external: Object.keys(globals),
  plugins: [...baseConfig.plugins, resolve({ browser: true }), commonjs()],
})

const minConfig = Object.assign({}, umdConfig, {
  output: {
    ...umdConfig.output,
    file: `${DIST_DIR}/${buildName}.min.js`,
  },
  plugins: [
    ...umdConfig.plugins,
    replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
      },
    }),
  ],
})

let configs

if (process.env.WATCH_MODE) {
  configs = [esConfig]
}

configs = [esConfig, cjsConfig, umdConfig, minConfig]

export default configs
