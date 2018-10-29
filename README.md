<h1 align="center">
  <img src="https://raw.githubusercontent.com/smooth-code/loadable-components/master/resources/loadable-components.png" alt="loadable-components" title="loadable-components" width="300">
</h1>
<p align="center" style="font-size: 1.2rem;">React code splitting made easy. Reduce your bundle size without stress ✂️✨.</p>

[![License](https://img.shields.io/npm/l/@loadable/component.svg)](https://github.com/smooth-code/loadable-components/blob/master/LICENSE)
[![npm package](https://img.shields.io/npm/v/@loadable/component/latest.svg)](https://www.npmjs.com/package/@loadable/component)
[![npm downloads](https://img.shields.io/npm/dm/@loadable/component.svg)](https://www.npmjs.com/package/@loadable/component)
[![Build Status](https://img.shields.io/travis/smooth-code/loadable-components.svg)](https://travis-ci.org/smooth-code/loadable-components)
![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)
[![Dependencies](https://img.shields.io/david/smooth-code/loadable-components.svg?path=packages%2Fcomponent)](https://david-dm.org/smooth-code/loadable-components?path=packages/component)
[![DevDependencies](https://img.shields.io/david/dev/smooth-code/loadable-components.svg)](https://david-dm.org/smooth-code/loadable-components?type=dev)

```sh
npm install @loadable/component
```

## Introduction

Code Splitting can be done easily using [`React.lazy`](https://reactjs.org/docs/code-splitting.html#reactlazy). It is true if you don't need Server Side Rendering or complex features like [full dynamic imports](https://webpack.js.org/api/module-methods/#import-).

Loadable leverage the limit of Code Splitting and give you access to all features.

Code Splitting + Server Side Rendering is something very complex. Several libraries tried to solve this problem successfully or not. The goal of this library is to follow as much as possible the philosophy of React and give a developer-experience first solution to solve this complex problem. It takes the best from all libraries and provide an elegant solution to this problem.

## Getting started

`loadable` lets you render a dynamic import as a regular component.

```js
import loadable from '@loadable/component'

const OtherComponent = loadable(() => import('./OtherComponent'))

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  )
}
```

### Full dynamic import

Webpack accepts [full dynamic imports](https://webpack.js.org/api/module-methods/#import-) and you can also use them with `@loadable/component` to create dynamic components.

```js
import loadable from '@loadable/component'

const AsyncPage = loadable(props => import(`./${props.page}`))

function MyComponent() {
  return (
    <div>
      <AsyncPage page="Home" />
      <AsyncPage page="Contact" />
    </div>
  )
}
```

### Suspense

`@loadable/component` exposes a `lazy` method that acts similarly as `React.lazy` one.

```js
import { lazy } from '@loadable/component'

const OtherComponent = lazy(() => import('./OtherComponent'))

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  )
}
```

> Suspense is not yet available for server-side rendering.

### Custom loading

It is possible to add a custom loading component, by default it will render nothing.

**Using a component**

```js
const Loading = () => <div>Loading...</div>

const Home = loadable(() => import('./Home'), {
  LoadingComponent: Loading,
})
```

**Using render props**

```js
import React from 'react'

const Home = loadable(() => import('./Home'), {
  render: ({ Component, loading, ownProps }) => {
    if (loading) return <div>Loading...</div>
    return <Component {...ownProps} />
  },
})
```

### Error handling

You can configure the component rendered when an error occurs during loading, by default it will display the error.

**Using a component**

```js
const ErrorDisplay = ({ error }) => <div>Oups! {error.message}</div>

const Home = loadable(() => import('./Home'), {
  ErrorComponent: ErrorDisplay,
})
```

**Using render props**

```js
import React from 'react'

const Home = loadable(() => import('./Home'), {
  render: ({ Component, error, ownProps }) => {
    if (error) return <div>Oups! {error.message}</div>
    return <Component {...ownProps} />
  },
})
```

### Delay

To avoid flashing a loader if the loading is very fast, you could implement a minimum delay. There is no built-in API in `@loadable/component` but you could do it using [`p-min-delay`](https://github.com/sindresorhus/p-min-delay).

```js
import loadable from '@loadable/component'
import pMinDelay from 'p-min-delay'

// Wait a minimum of 200ms before loading home.
export const Home = loadable(() => pMinDelay(import('./Home'), 200))
```

If you want to avoid these delay server-side:

```js
import loadable from '@loadable/component'
import pMinDelay from 'p-min-delay'

const delay = promise => {
  if (typeof window === 'undefined') return promise
  return pMinDelay(promise, 200)
}

export const Home = loadable(() => delay(import('./Home')))
```

### Timeout

Infinite loading is not good for user experience, to avoid it implementing a timeout is a good workaround. You can do it using a third party module like [`promise-timeout`](https://github.com/building5/promise-timeout):

```js
import loadable from '@loadable/component'
import { timeout } from 'promise-timeout'

// Wait a maximum of 2s before sending an error.
export const Home = loadable(() => timeout(import('./Home'), 2000))
```

### Prefetching

To enhance user experience, you can prefetch components, it loads component in background. This way you will avoid loading at first component display.

Each `loadable` component exposes a `Prefetch` component. It renders nothing but prefetch the component.

```js
import loadable from '@loadable/component'

const OtherComponent = loadable(() => import('./OtherComponent'))

function MyComponent() {
  return (
    <div>
      {/* Nothing will be rendered, but the component will be loaded in background */}
      <OtherComponent.Prefetch />
    </div>
  )
}
```

A method `prefetch` is also exposed, you can call it to trigger `prefetch` on user action.

```js
import loadable from '@loadable/component'

const OtherComponent = loadable(() => import('./OtherComponent'))

function MyComponent() {
  return (
    <div>
      <button onMouseOver={() => OtherComponent.prefetch()}>
        Prefetch on hover
      </button>
    </div>
  )
}
```

> Only component based prefetching is compatible with Server Side Rendering.

## [Server side rendering](https://github.com/smooth-code/loadable-components/tree/master/packages/server)

👉 [See `@loadable/server` documentation](https://github.com/smooth-code/loadable-components/tree/master/packages/server).

## MIT
