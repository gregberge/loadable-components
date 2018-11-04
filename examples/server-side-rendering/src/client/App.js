import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import loadable from '@loadable/component'
import './main.css'

const A = loadable(() => import('./letters/A'))
const B = loadable(() => import('./letters/B'))
const C = loadable(() => import(/* webpackPreload: true */ './letters/C'))
const D = loadable(() => import(/* webpackPrefetch: true */ './letters/D'))

// We keep some references to prevent uglify remove
A.C = C
A.D = D

const Moment = loadable.lib(() => import('moment'))

const App = () => (
  <div>
    <A />
    <B />
    <Moment>{moment => moment().format('HH:mm')}</Moment>
  </div>
)

export default App
