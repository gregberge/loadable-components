# @loadable/codemod

This package is a collection of codemod that can be used to help making big changes easier to a project, for example: migrating from `react-loadable` to `@loadable/component`

## Notes about `react-loadable-to-loadable-component` transform

`react-loadable-to-loadable-component` transform will help codemod all of your `Loadable()` declaration to `loadable()` with mostly equivalent params, barring some behavior that do not exist in `@loadable/component` such as `Loadable.Map()`, `timeout`, `delay`, etc.

After running the codemod, you will still need to update some of your code manually, namely:

1. Using `loadableReady` to hydrate your app on the client side.
2. Updating your webpack configuration to use `@loadable`
3. Updating your server side rendering code to use `ChunkExtractor`
