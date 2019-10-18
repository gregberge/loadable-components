import React, { Suspense } from 'react'
import { render } from 'react-dom'
import { lazy } from '@loadable/component'

const Hello = lazy(() => import('./Hello'))
const Moment = lazy.lib(() => import('moment'))

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
