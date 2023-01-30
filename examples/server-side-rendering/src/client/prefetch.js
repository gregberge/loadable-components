import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import loadable from '@loadable/component'

const D = loadable(() => import(/* webpackPrefetch: true */ './letters/D'))

const App = () => (
  <div>
    <D />
  </div>
)

export default App
