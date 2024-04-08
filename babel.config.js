function getTargets() {
  if (process.env.BUILD_TARGET === 'node') {
    return { node: '8' }
  }
  return undefined
}

function getModules() {
  if (process.env.MODULE_TARGET === 'cjs') {
    return 'cjs'
  }
  if (process.env.MODULE_TARGET === 'esm') {
    return false
  }
  return 'auto'
}

module.exports = {
  presets: [
    ['@babel/preset-react', { useBuiltIns: true }],
    [
      '@babel/preset-env',
      { loose: true, targets: getTargets(), modules: getModules() },
    ],
  ],
  plugins: ['@babel/plugin-proposal-class-properties'],
}
