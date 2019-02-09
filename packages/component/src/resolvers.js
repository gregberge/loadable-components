import hoistNonReactStatics from 'hoist-non-react-statics'

export function resolveComponent(loadedModule, { Loadable }) {
  // eslint-disable-next-line no-underscore-dangle
  const Component = loadedModule.__esModule ? loadedModule.default : (loadedModule.default || loadedModule)
  hoistNonReactStatics(Loadable, Component, {
    preload: true,
  })
  return Component
}
