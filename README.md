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

```bash
npm install @loadable/component
```

## [Docs](https://www.smooth-code.com/open-source/loadable-components)

**See the documentation at [smooth-code.com/open-source/loadable-components](https://www.smooth-code.com/open-source/loadable-components)** for more information about using `loadable components`!

Quicklinks to some of the most-visited pages:

- [**Getting started**](https://www.smooth-code.com/open-source/loadable-components/docs/getting-started/)
- [Comparison with React.lazy](https://www.smooth-code.com/open-source/loadable-components/docs/loadable-vs-react-lazy/)
- [Server Side Rendering](https://www.smooth-code.com/open-source/loadable-components/docs/server-side-rendering/)

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

## Licence

Licensed under the MIT License, Copyright © 2017-present Smooth Code.

See [LICENSE](./LICENSE) for more information.
