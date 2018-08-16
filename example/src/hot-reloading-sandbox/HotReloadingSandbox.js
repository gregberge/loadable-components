import React from 'react'
import loadable from 'loadable-components'

const AsyncCounter = loadable(() => import('./Counter'))

const HotReloadingSandbox = () => (
  <React.Fragment>
    Counter:
    <AsyncCounter />
  </React.Fragment>
)

export default HotReloadingSandbox
