import React from 'react'
import loadable from 'loadable-components'

const AsyncAmazingWorld = loadable(() => import('./AmazingWorld'))

const Nesting = () => (
  <React.Fragment>
    This is an <AsyncAmazingWorld />
  </React.Fragment>
)

export default Nesting
