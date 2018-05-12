import React from 'react'
import loadable from 'loadable-components'
import { hot } from 'react-hot-loader'
import A from './A'
import B from './B'

const AsyncWhat = loadable(() =>
  import(/* webpackChunkName: "What" */ './What.js'),
)

const AsyncBig = loadable(() =>
  import(/* webpackChunkName: "Big" */ './Big.js'),
)

const App = () => (
  <div>
    <A />
    <B />
    Hello <AsyncWhat />!
  </div>
)

export default hot(module)(App)
