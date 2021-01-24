import React from 'react'
import loadable from '@loadable/component'

const X = loadable(props => import(`./letters/${props.letter}`))

const ClientSideOnly = loadable(props => import(`./letters/${props.letter}`), {
  ssr: false,
})

const Moment = loadable.lib(() => import('moment'), {
  resolveComponent: moment => moment.default || moment,
})

const App = () => (
  <div>
    <p>
      Lazy load letter A:
      <X letter="A" />
    </p>
    <p>
      Lazy load letter B:
      <X letter="B" />
    </p>
    <p>
      Lazy load letter <strong>only on Client</strong> C and D:
      <ClientSideOnly letter="C" /> +
      <ClientSideOnly letter="D" />
    </p>
    <p>
      lazy load momentjs and format date:
      <Moment>{moment => `now is : ${moment().format('HH:mm')}`}</Moment>
    </p>
  </div>
)

export default App
