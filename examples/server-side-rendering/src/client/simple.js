import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import loadable from '@loadable/component'

const A = loadable(() => import('./letters/A'))
const App = () => (
  <div>
    <A />
  </div>
)

export default App
