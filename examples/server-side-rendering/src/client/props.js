import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import loadable from '@loadable/component'
const X = loadable(props => import(`./letters/${props.letter}`))

const App = () => (
  <div>
    <X letter="A" />
    <br />
    <X letter="F" />
  </div>
)

export default App
