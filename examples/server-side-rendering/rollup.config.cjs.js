import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
  input: 'native.js',
  output: {
    dir: 'public/dist/node',
    format: 'cjs'
  },
  plugins: [
	  babel({
		exclude: 'node_modules/**',
		presets: ['@babel/env', '@babel/preset-react']
	}),
	commonjs()
	]
};