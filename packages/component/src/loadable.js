/* eslint-disable no-use-before-define, react/no-multi-comp */
import React from 'react'
import createLoadable from './createLoadable'
import { defaultResolveComponent } from './resolvers'

export const { loadable, lazy } = createLoadable({
  defaultResolveComponent,
  render({ result: Component, props }) {
    return <Component {...props} />
  },
})
