import React from 'react'
import { render } from 'react-dom'
import loadable from '../../../packages/component'

const Hello = loadable(() => import('./Hello'))
const Moment = loadable.lib(() => import('moment'))

const App = () => (
  <div>
    <Hello />
    <Moment>{({ default: moment }) => moment().format('HH:mm')}</Moment>
  </div>
)

const root = document.createElement('div')
document.body.append(root)

render(<App />, root)
