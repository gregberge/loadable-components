import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import loadable from '@loadable/component'
const C = loadable(() => import(/* webpackPreload: true */ './letters/C'))

const App = () => (
  <div>
    <C />
  </div>
)

export default App
