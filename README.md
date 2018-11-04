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
[![Small size](https://img.badgesize.io/https://unpkg.com/@loadable/component/dist/loadable.min.js?compression=gzip)](https://unpkg.com/@loadable/component/dist/loadable.min.js)

```sh
npm install @loadable/component
```

## Introduction

Code splitting is supported out of the box by React using [`React.lazy`](https://reactjs.org/docs/code-splitting.html#reactlazy). So what is the goal of this library?

`@loadable/component` pushes the limit of Code splitting, it offers several features:

- 📚 Library splitting
- ⚡️ Prefetching
- 💫 Server Side Rendering
- 🎛 Full dynamic import `` import(`./${value}`) ``

## Comparison with React.lazy & react-loadable

| Library               | Suspense | SSR | Library splitting | `` import(`./${value}`) `` |
| --------------------- | -------- | --- | ----------------- | -------------------------- |
| `React.lazy`          | ✅       | ❌  | ❌                | ❌                         |
| `react-loadable`      | ❌       | 🔶  | ❌                | ❌                         |
| `@loadable/component` | ✅       | ✅  | ✅                | ✅                         |

Even if [`react-loadable` is recommended by React team](https://reactjs.org/docs/code-splitting.html#reactlazy), the project does not accept any GitHub issue and is no longer maintained.

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

### Loading library

`loadable.lib` lets you defer the loading of a library. It takes a render props called when the library is loaded.

```js
import loadable from '@loadable/component'

const Moment = loadable.lib(() => import('moment'))

function FromNow({ date }) {
  return (
    <div>
      <Moment fallback={date.toLocaleDateString()}>
        {({ default: moment }) => moment(date).fromNow()}
      </Moment>
    </div>
  )
}
```

You can also use a `ref`, populated when the library is loaded.

```js
import loadable from '@loadable/component'

const Moment = loadable.lib(() => import('moment'))

class MyComponent {
  moment = React.createRef()

  handleClick = () => {
    if (this.moment.current) {
      return alert(this.moment.current.default.format('HH:mm'))
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>What time is it?</button>
        <Moment ref={this.moment} />
      </div>
    )
  }
}
```

> You can also pass a function to `ref`, called when the library is loaded.

### Full dynamic import

Webpack accepts [full dynamic imports](https://webpack.js.org/api/module-methods/#import-), you can use them to create a reusable Loadable Component.

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

> Use `lazy.lib` for libraries.

> ⚠️ Suspense is not yet available for server-side rendering.

### Fallback without Suspense

You can specify a `fallback` in `loadable` options.

```js
const OtherComponent = loadable(() => import('./OtherComponent'), {
  fallback: <div>Loading...</div>,
})

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  )
}
```

You can also specify a `fallback` in props:

```js
const OtherComponent = loadable(() => import('./OtherComponent'))

function MyComponent() {
  return (
    <div>
      <OtherComponent fallback={<div>Loading...</div>} />
    </div>
  )
}
```

### Error boundaries

If the other module fails to load (for example, due to network failure), it will trigger an error. You can handle these errors to show a nice user experience and manage recovery with [Error Boundaries](https://reactjs.org/docs/error-boundaries.html). Once you’ve created your Error Boundary, you can use it anywhere above your lazy components to display an error state when there’s a network error.

```js
import MyErrorBoundary from '/MyErrorBoundary'
const OtherComponent = loadable(() => import('./OtherComponent'))
const AnotherComponent = loadable(() => import('./AnotherComponent'))

const MyComponent = () => (
  <div>
    <MyErrorBoundary>
      <section>
        <OtherComponent />
        <AnotherComponent />
      </section>
    </MyErrorBoundary>
  </div>
)
```

### Delay

To avoid flashing a loader if the loading is very fast, you could implement a minimum delay. There is no built-in API in `@loadable/component` but you could do it using [`p-min-delay`](https://github.com/sindresorhus/p-min-delay).

```js
import loadable from '@loadable/component'
import pMinDelay from 'p-min-delay'

// Wait a minimum of 200ms before loading home.
export const OtherComponent = loadable(() =>
  pMinDelay(import('./OtherComponent'), 200),
)
```

### Timeout

Infinite loading is not good for user experience, to avoid it implementing a timeout is a good workaround. You can do it using a third party module like [`promise-timeout`](https://github.com/building5/promise-timeout):

```js
import loadable from '@loadable/component'
import { timeout } from 'promise-timeout'

// Wait a maximum of 2s before sending an error.
export const OtherComponent = loadable(() =>
  timeout(import('./OtherComponent'), 2000),
)
```

### Prefetching

Loadable Components is fully compatible with [webpack hints `webpackPrefetch` and `webpackPreload`](https://webpack.js.org/guides/code-splitting/#prefetching-preloading-modules).

Most of the time, you want to "prefetch" a component, it means it will be loaded when the browser is idle. You can do it by adding `/* webpackPrefetch: true */` inside your import statement.

```js
import loadable from '@loadable/component'

const OtherComponent = loadable(() =>
  import(/* webpackPrefetch: true */ './OtherComponent'),
)
```

> You can extract prefetched resources server-side to add `<link rel="prefetch">` in your head.

## API

### loadable

Create a loadable component.

| Arguments          | Description                              |
| ------------------ | ---------------------------------------- |
| `loadFn`           | The function call to load the component. |
| `options`          | Optional options.                        |
| `options.fallback` | Fallback displayed during the loading.   |

```js
import loadable from '@loadable/component'

const OtherComponent = loadable(() => import('./OtherComponent'))
```

### lazy

Create a loadable component "Suspense" ready.

| Arguments | Description                              |
| --------- | ---------------------------------------- |
| `loadFn`  | The function call to load the component. |

```js
import { lazy } from '@loadable/component'

const OtherComponent = lazy(() => import('./OtherComponent'))
```

### LoadableComponent

A component created using `loadable` or `lazy`.

| Props      | Description                                       |
| ---------- | ------------------------------------------------- |
| `fallback` | Fallback displayed during the loading.            |
| `...`      | Props are forwarded as first argument of `loadFn` |

### loadable.lib

Create a loadable library.

| Arguments          | Description                              |
| ------------------ | ---------------------------------------- |
| `loadFn`           | The function call to load the component. |
| `options`          | Optional options.                        |
| `options.fallback` | Fallback displayed during the loading.   |

```js
import loadable from '@loadable/component'

const Moment = loadable.lib(() => import('moment'))
```

### lazy.lib

Create a loadable library "Suspense" ready.

| Arguments | Description                              |
| --------- | ---------------------------------------- |
| `loadFn`  | The function call to load the component. |

```js
import { lazy } from '@loadable/component'

const Moment = lazy.lib(() => import('moment'))
```

### LoadableLibrary

A component created using `loadable.lib` or `lazy.lib`.

| Props      | Description                                          |
| ---------- | ---------------------------------------------------- |
| `children` | Function called when the library is loaded.          |
| `ref`      | Accepts a ref, populated when the library is loaded. |
| `fallback` | Fallback displayed during the loading.               |
| `...`      | Props are forwarded as first argument of `loadFn`    |

## [Server side rendering](https://github.com/smooth-code/loadable-components/tree/master/packages/server)

👉 [See `@loadable/server` documentation](https://github.com/smooth-code/loadable-components/tree/master/packages/server).

## MIT
