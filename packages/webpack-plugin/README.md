# @loadable/webpack-plugin

This plugin is required only if you use Server Side Rendering in your application. [See `@loadable/server` for more information](https://github.com/smooth-code/loadable-components/tree/master/packages/server).

## Install

```
npm install --save-dev @loadable/webpack-plugin
```

## Usage

**webpack.config.js**

```js
const LoadablePlugin = require('@loadable/webpack-plugin')

module.exports = {
  plugins: [new LoadablePlugin()],
}
```

## License

MIT
