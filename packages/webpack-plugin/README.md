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

## API

### LoadablePlugin

Create a webpack loadable plugin.

| Arguments             | Description                                       |
| --------------------- | ------------------------------------------------- |
| `options`             | Optional options                                  |
| `options.filename`    | Stats filename (default to `loadable-stats.json`) |
| `options.writeToDisk` | Always write assets to disk (default to `false`)  |

```js
new LoadablePlugin({ filename: 'stats.json', writeToDisk: true })
```

> Writing file to disk can be useful if you are using `razzle` or `webpack-dev-server`.

## License

MIT
