const fs = require('fs')
const path = require('path')

const stats = fs.readFileSync(
  '../examples/server-side-rendering/public/dist/node/loadable-stats.json',
  'utf-8',
)
const localPath = path.resolve(__dirname, '..')
// write cleaned from PII data
fs.writeFileSync(
  '../packages/server/__fixtures__/stats.json',
  stats.split(localPath).join('../..'),
)
