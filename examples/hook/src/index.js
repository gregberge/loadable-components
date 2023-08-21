import React from 'react'
import { render } from 'react-dom'
import loadable from '@loadable/component'

const useHello = loadable.hook(() => import('./Hello'))
const useMoment = loadable.hook(() => import('moment'))

function App() {
  const Hello = useHello()
  const moment = useMoment()
  const timeNow = React.useMemo(() => moment && moment().format('HH:mm'), [moment])

  return (
    <div>
      {Hello ? <Hello /> : 'Loading hello'}
      <br />
      {timeNow || 'Loading moment library'}
    </div>
  )
}

const root = document.createElement('div')
document.body.append(root)

render(<App />, root)
