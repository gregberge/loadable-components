import React, { Suspense } from 'react'
import { render } from 'react-dom'
import loadable from '../../../packages/component'

const Hello = loadable.lazy(() => import('./Hello'))
const Moment = loadable.lib(() => import('moment'))

const App = () => (
  <div>
    <Suspense fallback={<div>Loading...</div>}>
      <Hello />
      <Moment>{({ default: moment }) => moment().format('HH:mm')}</Moment>
    </Suspense>
  </div>
)

const root = document.createElement('div')
document.body.append(root)

render(<App />, root)
