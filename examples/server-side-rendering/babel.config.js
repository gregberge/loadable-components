function isWebTarget(caller) {
  return Boolean(caller && caller.target === 'web')
}

function isWebpack(caller) {
  return Boolean(caller && caller.name === 'babel-loader')
}

function getTarget(caller) {
  return caller && caller.target;
}

module.exports = api => {
  const web = api.caller(isWebTarget)
  const webpack = api.caller(isWebpack)

  return {
    presets: [
      '@babel/preset-react',
      [
        '@babel/preset-env',
        {
          useBuiltIns: web ? 'entry' : undefined,
          corejs: web ? 'core-js@3' : false,
          targets: !web ? { node: 'current' } : undefined,
          modules: webpack ? false : 'commonjs',
        },
      ],
    ],
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      ['@loadable/babel-plugin', { target: api.caller(getTarget) }]
    ],
  }
}
