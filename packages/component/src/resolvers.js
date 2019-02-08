import hoistNonReactStatics from 'hoist-non-react-statics'

export function resolveComponent(loadedModule, { Loadable }) {
  const Component = loadedModule.__esModule ? loadedModule.default : loadedModule
  hoistNonReactStatics(Loadable, Component, {
    preload: true,
  })
  return Component
}
