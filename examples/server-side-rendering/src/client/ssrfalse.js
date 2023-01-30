import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import loadable from '@loadable/component'

const E = loadable(() => import('./letters/E?param'), { ssr: false })
const App = () => (
  <div>
    <E />
  </div>
)

export default App
