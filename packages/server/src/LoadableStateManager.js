import React from 'react'
import { Context } from './sharedInternals'

const LoadableStateManager = ({ state, children }) => (
  <Context.Provider value={state}>{children}</Context.Provider>
)

export default LoadableStateManager
