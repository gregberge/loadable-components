function getTargets() {
  if (process.env.BUILD_TARGET === 'node') {
    return { node: '8' }
  }
  return undefined
}

module.exports = {
  presets: [
    ['@babel/preset-react', { useBuiltIns: true }],
    ['@babel/preset-env', { loose: true, targets: getTargets() }],
  ],
  plugins: ['@babel/plugin-proposal-class-properties'],
}
