import React from 'react'
import { ErrorBoundary } from 'react-error-boundary';

// eslint-disable-next-line import/no-extraneous-dependencies
import { lazy } from '@loadable/component'
import Html from './Html'

const A = lazy(() => import('./letters/A'))
const B = lazy(() => import('./letters/B'))
const C = lazy(() => import(/* webpackPreload: true */ './letters/C'))
const D = lazy(() => import(/* webpackPrefetch: true */ './letters/D'))
const E = lazy(() => import('./letters/E?param'), { ssr: false })
const X = lazy(props => import(`./letters/${props.letter}`))
const Sub = lazy(props => import(`./letters/${props.letter}/file`))
const RootSub = lazy(props => import(`./${props.letter}/file`))

const App = () => {
  return (
    <Html title="Hello">
    <React.Suspense fallback="Loading">
      <ErrorBoundary FallbackComponent={Error}>  
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
        </ErrorBoundary>
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
