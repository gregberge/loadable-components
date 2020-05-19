import babel from 'rollup-plugin-babel';
import globalExternals from 'rollup-plugin-external-globals';

const externalDependencies = {
	'react': 'React'
};

export default {
  input: 'native.js',
  output: {
    dir: 'public/dist/web',
    format: 'es'
  },

  plugins: [
	babel({
		exclude: 'node_modules/**',
		presets: ['@babel/env', '@babel/preset-react']
	}),
	globalExternals(externalDependencies)
  ]
};