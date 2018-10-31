/* eslint-disable no-use-before-define, react/no-multi-comp */
import React from 'react'
import createLoadable from './createLoadable'
import { resolveComponent } from './resolvers'

export const { loadable, lazy } = createLoadable({
  resolve: resolveComponent,
  render({ result: Component, props }) {
    return <Component {...props} />
  },
})
