let targets = {}

if (process.env.BUILD_TARGET === 'node') {
  targets = { node: '8' }
}

module.exports = {
  presets: [
    ['@babel/preset-react', { useBuiltIns: true }],
    ['@babel/preset-env', { loose: true, targets }],
  ],
  plugins: ['@babel/plugin-proposal-class-properties'],
}
