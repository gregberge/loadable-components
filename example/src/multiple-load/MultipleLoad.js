import React from 'react'
import loadable from 'loadable-components'

const MultipleLoad = loadable(
  async () => {
    const {
      default: World,
    } = await import(/* webpackChunkName: "World" */ './World')
    const {
      default: Amazing,
    } = await import(/* webpackChunkName: "Amazing" */ './Amazing')
    return () => (
      <React.Fragment>
        <Amazing />
        <World />
      </React.Fragment>
    )
  },
  {
    LoadingComponent: () => 'Loading...',
  },
)

export default MultipleLoad
