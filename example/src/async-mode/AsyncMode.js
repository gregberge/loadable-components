import React, { Timeout } from 'react'
import loadable from 'loadable-components'

const AsyncWorld = loadable(
  () =>
    import('./World').then(
      World => new Promise(resolve => setTimeout(() => resolve(World), 500)),
    ),
  { asyncMode: true },
)

const AsyncMode = () => (
  <React.Fragment>
    <Timeout ms={100}>
      {didTimeout => (didTimeout ? 'Loading...' : <AsyncWorld />)}
    </Timeout>
  </React.Fragment>
)

export default AsyncMode
