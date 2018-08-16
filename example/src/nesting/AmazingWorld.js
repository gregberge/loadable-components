import React from 'react'
import loadable from 'loadable-components'

const AsyncWorld = loadable(() => import('./World'))

const AmazingWorld = () => (
  <React.Fragment>
    Amazing
    <AsyncWorld />
  </React.Fragment>
)

export default AmazingWorld
