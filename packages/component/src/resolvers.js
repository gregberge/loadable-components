export function defaultResolveComponent(loadedModule) {
  // eslint-disable-next-line no-underscore-dangle
  return loadedModule.__esModule
    ? loadedModule.default
    : loadedModule.default || loadedModule
}
