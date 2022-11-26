import React from 'react'

// eslint-disable-next-line import/no-extraneous-dependencies
import { reactLazy } from '@loadable/component'
import Html from './Html'

const A = reactLazy(() => import('./letters/A'))
const B = reactLazy(() => import('./letters/B'))
const C = reactLazy(() => import(/* webpackPreload: true */ './letters/C'))
const D = reactLazy(() => import(/* webpackPrefetch: true */ './letters/D'))
const E = reactLazy(() => import('./letters/E?param'), { ssr: false })
const X = reactLazy(props => import(`./letters/${props.letter}`))
const Sub = reactLazy(props => import(`./letters/${props.letter}/file`))
const RootSub = reactLazy(props => import(`./${props.letter}/file`))

const App = () => {
  return (
    <Html title="Hello">
    <React.Suspense fallback="Loading">
          <A />
          <br />
          <B />
          <br />
          <X letter="A" />
          <br />
          <X letter="F" />
          <br />
          <E />
          <br />
          <Sub letter="Z" />
          <br />
          <RootSub letter="Y" />
      </React.Suspense>
    </Html>
  )
}

function Error({ error }) {
  return (
    <div>
      <h1>Application Error</h1>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{error.stack}</pre>
    </div>
  );
}

export default App
