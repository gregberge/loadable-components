import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import loadable from '@loadable/component'
const Moment = loadable.lib(() => import('moment'), {
  resolveComponent: moment => moment.default || moment,
})

const App = () => (
  <div>
    <Moment>{moment => moment().format('HH:mm')}</Moment>
  </div>
)

export default App
