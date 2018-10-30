/* eslint-disable no-use-before-define, react/no-multi-comp */
import React from 'react'
import createLoadable from './createLoadable'
import { resolveComponent } from './resolvers'

const loadable = createLoadable({
  resolve: resolveComponent,
  render({ result: Component, props }) {
    return <Component {...props} />
  },
})

export default loadable
