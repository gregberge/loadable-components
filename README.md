<h1 align="center">
  <img src="https://raw.githubusercontent.com/gregberge/loadable-components/master/resources/loadable-components.png" alt="loadable-components" title="loadable-components" width="300">
</h1>
<p align="center" style="font-size: 1.2rem;">React code splitting made easy. Reduce your bundle size without stress ✂️✨.</p>

[![License](https://img.shields.io/npm/l/@loadable/component.svg)](https://github.com/gregberge/loadable-components/blob/master/LICENSE)
[![npm package](https://img.shields.io/npm/v/@loadable/component/latest.svg)](https://www.npmjs.com/package/@loadable/component)
[![npm downloads](https://img.shields.io/npm/dm/@loadable/component.svg)](https://www.npmjs.com/package/@loadable/component)
[![Build Status](https://img.shields.io/travis/gregberge/loadable-components.svg)](https://travis-ci.org/gregberge/loadable-components)
![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)
[![Dependencies](https://img.shields.io/david/gregberge/loadable-components.svg?path=packages%2Fcomponent)](https://david-dm.org/gregberge/loadable-components?path=packages/component)
[![DevDependencies](https://img.shields.io/david/dev/gregberge/loadable-components.svg)](https://david-dm.org/gregberge/loadable-components?type=dev)
[![Small size](https://img.badgesize.io/https://unpkg.com/@loadable/component/dist/loadable.min.js?compression=gzip)](https://unpkg.com/@loadable/component/dist/loadable.min.js)

```bash
npm install @loadable/component
```

## [Docs](https://loadable-components.com)

**See the documentation at [loadable-components.com](https://loadable-components.com)** for more information about using Loadable Components!

Quicklinks to some of the most-visited pages:

- [**Getting started**](https://loadable-components.com/docs/getting-started/)
- [Comparison with React.lazy](https://loadable-components.com/docs/loadable-vs-react-lazy/)
- [Server Side Rendering](https://loadable-components.com/docs/server-side-rendering/)

## Example

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

## Supporting Loadable Components

Loadable Components is an MIT-licensed open source project. It's an independent project with ongoing development made possible thanks to the support of these awesome [backers](/BACKERS.md). If you'd like to join them, please consider:

- [Sponsor me on GitHub ❤️](https://github.com/sponsors/gregberge).

## License

Licensed under the MIT License, Copyright © 2017-present Greg Bergé.

See [LICENSE](./LICENSE) for more information.
