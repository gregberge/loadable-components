<a href="https://github.com/smooth-code/loadable-components">
  <img alt="loadable-components" src="https://user-images.githubusercontent.com/266302/27487896-6a8cc4fa-5835-11e7-8061-b481ad72a065.png" height="200px" />
</a>
<br />

React code splitting made easy. Reduce your bundle size without stress ✂️✨.

> Read [the intro blogpost](https://medium.com/smooth-code/introducing-loadable-components-%EF%B8%8F-646dd3ab0aa6)

```sh
npm install loadable-components
```

[![Build Status](https://travis-ci.org/smooth-code/loadable-components.svg?branch=master)](https://travis-ci.org/smooth-code/loadable-components)
[![codecov](https://codecov.io/gh/smooth-code/loadable-components/branch/master/graph/badge.svg)](https://codecov.io/gh/smooth-code/loadable-components)

Webpack allows modern code splitting via the [dynamic `import` syntax](https://webpack.js.org/guides/code-splitting/#dynamic-imports).
`loadable-components` makes it possible to use that awesome feature with React components. It is compatible with **`react-router`** and **server side rendering**. The API is designed to be as simple as possible to avoid useless complexity and boilerplate.

We use it in production on [our website](https://www.smooth-code.com/), it's open source https://github.com/smooth-code/website.

## Motivation

Splitting your React application and rendering it server-side is complicated. Several have tried, [react-router gave up](https://reacttraining.com/react-router/web/guides/code-splitting), today only [next.js](https://github.com/zeit/next.js/) is doing it right. First I decided to not do it (afraid by react-router 😱) on my website. But then I think "Fuck code splitting shouldn't be a problem today, let's do it.".

I tried several solutions, [react-async-components](https://github.com/ctrlplusb/react-async-component), [react-loadable](https://github.com/thejameskyle/react-loadable) and for each of them server-side rendering is very complicated. I decided to create `loadable-components` with for main goal: reducing API in order to make it as easier as possible for the developer. I inspired from [`styled-components`](https://www.styled-components.com/) and [Apollo](http://dev.apollodata.com/) for the API and `loadable-components` was born.

## Getting started

```js
// Routes.js
import loadable from 'loadable-components'

export const Home = loadable(() => import('./Home'))
export const About = loadable(() => import('./About'))
export const Contact = loadable(() => import('./Contact'))
```

```js
// App.js
import React from 'react'
import { Route } from 'react-router'
import * as Routes from './Routes'

export default () =>
  <div>
    <Route exact path="/" component={Routes.Home} />
    <Route path="/about" component={Routes.About} />
    <Route path="/contact" component={Routes.Contact} />
  </div>
```

### Custom loading

It is possible to add a custom loading component, by default it will render nothing:

```js
export const Home = loadable(() => import('./Home'), {
  LoadingComponent: (props) => <div>Loading...</div>,
})
```

### Error handling

You can configure the component rendered when an error occurs during loading, by default it will render nothing:

```js
export const Home = loadable(() => import('./Home'), {
  ErrorComponent: ({ error, props }) => <div>Oups an error occurs.</div>,
})
```

### Delay

To avoid flashing a loader if the loading is very fast, you could implement a minimum delay. There is no built-in API in `loadable-components` but you could do it using [`p-min-delay`](https://github.com/sindresorhus/p-min-delay).

```js
import loadable from 'loadable-components'
import pMinDelay from 'p-min-delay'

// Wait a minimum of 200ms before loading home.
export const Home = loadable(pMinDelay(() => import('./Home'), 200))
```

If you want to avoid these delay server-side:

```js
import loadable from 'loadable-components'
import pMinDelay from 'p-min-delay'

const delay = (promise) => {
  if (typeof window === 'undefined') return promise
  return pMinDelay(promise, 200)
}

export const Home = loadable(delay(() => import('./Home')))
```

### Timeout

Infinite loading is not good for user experience, to avoid it implementing a timeout is a good workaround. You can do it using a third party module like [`promise-timeout`](https://github.com/building5/promise-timeout):

```js
import loadable from 'loadable-components'
import { timeout } from 'promise-timeout'

// Wait a maximum of 2s before sending an error.
export const Home = loadable(timeout(() => import('./Home'), 2000))
```

### Prefetching

To enhance user experience you can fetch routes before they are requested by the user.

#### Prefetch on route loading

```js
import React from 'react'
import { Contact } from './Routes'

Contact.load()

export default () => <div>Hello</div>
```

#### Prefetch on hover

```js
import React from 'react'
import { Contact } from './Routes'

export default () =>
  <div>
    <Link
    <Link to="/contact" onHover={Contact.load}>Contact</Link>
  </div>
```

### Server-side rendering

First create a `Routes.js` containing all your loadable routes:

```js
// Routes.js
import loadable from 'loadable-components'

export const Home = loadable(() => import('client/Home'))
```

You can use them in your application:

```js
// App.js
import React from 'react'
import { Home } from './Routes'

const App = () =>
  <div>
    <Route exact path="/" component={Home} />
  </div>
```

Then bootstrap your application client-side using `loadComponents`:

```js
// main.js
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { loadComponents } from 'loadable-components'
import App from './App'

// Load all components needed before starting rendering
loadComponents().then(() => {
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('main'),
  )
})
```

The only thing you have to do on the server is calling `getLoadableState()` and inserting the loadable state in your html:

```js
// server.js
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { getLoadableState } from 'loadable-components/server'
import App from './App'

let context = {}

const app = (
  <StaticRouter location={...} context={context}>
    <App />
  </StaticRouter>
)

// Extract loadable state from application tree
getLoadableState(app).then(loadableState => {
  const html = renderToString(<YourApp />)
  // Insert style tag into page
  const page = `
    <!doctype html>
    <html>
    <head></head>
    <body>
      <div id="main">${html}</div>
      ${loadableState.getScriptTag()}
    </body>
    </html>
  `
})
```

#### Configuring Babel

Dynamic `import` syntax is natively supported by Webpack but not by node. That's why you have to configure Babel differently for server and client:

- Use [babel-plugin-syntax-dynamic-import](https://babeljs.io/docs/plugins/syntax-dynamic-import/) on the client.
- Use [babel-plugin-dynamic-import-node](https://github.com/airbnb/babel-plugin-dynamic-import-node) on the server.

To have a different configuration for client and server, you can use [Babel env option](https://babeljs.io/docs/usage/babelrc/#env-option).

### Snapshoting

An alternative to server-side rendering is [snapshoting](https://medium.com/superhighfives/an-almost-static-stack-6df0a2791319). Basically, you crawl your React website locally and you generate HTML pages.

You need to instruct your snapshot solution to save state of `loadable-components` to the `window` in the end.

`getState()` will return `{__LOADABLE_COMPONENT_IDS__: [...]}`, and this should be converted to  `<script>window.__LOADABLE_COMPONENT_IDS__ = [...]</script>` in the resulting html.

For example, to do this with [`react-snap`](https://github.com/stereobooster/react-snap) you can use following code:

```js
import { getState } from 'loadable-components/snap'

// Set up for react-snap.
window.snapSaveState = () => getState()
```

## API Reference

### loadable

This is the default export. It's a factory used to create a loadable component. Props are passed to the loaded component.

### Arguments

1. `getComponent` _(Function)_: Function to load component asynchronously.
2. `options` _(Object)_: Facultative options to configure component behavior.

### options
1. `ErrorComponent` _(ReactComponent)_: Component rendered when an error occurs, take two props: `error` and `props`.
2. `LoadingComponent` _(ReactComponent)_: Component rendered during loading, take the same props from loadable component.

```js
import loadable from 'loadable-components'

const MyLoadableComponent = loadable(() => import('./MyComponent'), {
  ErrorComponent: ({ error }) => <div>{error.message}</div>,
  LoadingComponent: () => <div>Loading...</div>,
})
```

### loadComponents

This method is only required if you use server-side rendering. It loads components used in the page that has been rendered server-side.

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { loadComponents } from 'loadable-components'
import App from './App'

// Load all components needed before starting rendering
loadComponents().then(() => {
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('main'),
  )
})
```

### getLoadableState

This method is only required if you use server-side rendering. It loads components recursively and extract a loadable state from a React tree.

```js
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { getLoadableState } from 'loadable-components/server'
import App from './App'

const app = (
  <StaticRouter>
    <App />
  </StaticRouter>
)

// Extract loadable state from application tree
getLoadableState(app).then(loadableState => {
  const html = renderToString(<YourApp />)
  // Insert style tag into page
  const page = `
    <!doctype html>
    <html>
    <head></head>
    <body>
      <div id="main">${html}</div>
      ${loadableState.getScriptTag()}
    </body>
    </html>
  `
})
```

A loadable state has two methods to extract state:

- `loadableState.getScriptTag()`: Returns a string representing a script tag.
- `loadableState.getScriptElement()`: Returns a React element.

## Interoperability

You can implement a loadable component by your own. To do it you have to add `LOADABLE` Symbol to your component:

```js
import React from 'react'
import { LOADABLE } from 'loadable-components'

class ComponentWithTranslations extends React.Component {
  // Required
  static componentId = 'custom-loadable'
  static async load = () => {
    const response = await fetch('/translations.json')
    const translations = await response.json()
    ComponentWithTranslations.translations = translations
    return translations
  }

  state = { translations: ComponentWithTranslations.translations }

  componentWillMount() {
    ComponentWithTranslations[LOADABLE].load()
    .then(translations => this.setState({ translations }))
  }

  render() {
    const { translations = { hello = 'hello' } } = this.props;

    return <div>{hello}</div>
  }
}

ComponentWithTranslations[LOADABLE] = () => ({
  componentId: 'custom-loadable',
  load: async () => {
    const response = await fetch('/translations.json')
    const translations = await response.json()
    ComponentWithTranslations.translations = translations
  }
})
```

## Other solutions

[`react-loadable`](https://github.com/thejameskyle/react-loadable) offers an elegant API to load a component and enhance it. It supports a lot of features like delay and timeout. I chose to not implement it because it delay can be done in `LoadingComponent` and timeout can be done in `getComponent` function.

[`react-async-component`](https://github.com/ctrlplusb/react-async-component) offers a simple API, very similar to `loadable-components` API.

[`react-code-splitting`](https://github.com/didierfranc/react-code-splitting) is the basic approach of an async component, it doesn't support LoadingComponent, ErrorComponent and server-side rendering.

The main difference between these two libraries is the server-side rendering approach:

- `react-loadable` requires a babel plugin. I think it's too complicated and we should not rely on it.
- `react-async-component` has a better approach, analyzing tree + context, it also rely on another library. I like the idea but not the API.

`loadable-components` has a simpler approach, it relies on [dynamic-import-specification](https://github.com/tc39/proposal-dynamic-import) and assumes that [it is working for node and Webpack](https://babeljs.io/docs/plugins/syntax-dynamic-import/). Then it analyzes the tree server-side and waiting for every modules to be loaded. Client-side it loads modules before rendering the application. The API is as simple as possible, no context, no babel plugin, no magic variable.

## Inspirations

- API inspired by [styled-components](https://github.com/styled-components/styled-components)
- React tree traversing from [react-apollo](https://github.com/apollographql/react-apollo)

## MIT
