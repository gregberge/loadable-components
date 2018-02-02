import React from 'react'
import loadable from 'loadable-components'

const AsyncWhat = loadable(() => import('./What.js'))

const App = () => (
  <div>
    Hello <AsyncWhat />!
  </div>
)

export default App
