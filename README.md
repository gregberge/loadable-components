# loadable-components

[![Build Status](https://travis-ci.org/smooth-code/loadable-components.svg?branch=master)](https://travis-ci.org/smooth-code/loadable-components)
[![codecov](https://codecov.io/gh/smooth-code/loadable-components/branch/master/graph/badge.svg)](https://codecov.io/gh/smooth-code/loadable-components)

React code splitting made easy. Split your code without stress.

```sh
npm install loadable-components
```

Webpack permits us to use easily split our code using dynamic `import` syntax.
`loadable-components` makes it possible to use it with React components. It is compatible with react-router and server side rendering. The API is designed to be as simple as possible to avoid useless complexity and boilerplate.

## Getting started

```js
// Routes.js
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

It's possible to add a custom loading component, by default it will render nothing:

```js
export const Home = loadable(() => import('./Home'), {
  LoadingComponent: (props) => <div>Loading...</div>,
})
```

### Error handling

You can configure the component rendered when an error occurs during loading:

```js
export const Home = loadable(() => import('./Home'), {
  ErrorComponent: ({ error, props }) => <div>Oups an error occurs.</div>,
})
```

### Prefetching

To enhance the user you can fetch routes before they are requested by the user.

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

```js
// App.js
import React from 'react'
import { Home } from './Routes'

const App = () =>
  <div>
    <Route exact path="/" component={Home} />
  </div>
```

```js
// Routes.js
import loadable from 'loadable-components'

export const Home = loadable(() => import('client/Home'))
```

```js
// server.js
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

## Inspirations

- API inspired by [styled-components](https://github.com/styled-components/styled-components)
- React tree traversing from [react-apollo](https://github.com/apollographql/react-apollo)
- Loadable components inspired by [react-loadable](https://github.com/thejameskyle/react-loadable)

## License MIT
