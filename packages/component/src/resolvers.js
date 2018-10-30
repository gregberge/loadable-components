import hoistNonReactStatics from 'hoist-non-react-statics'

export function resolveComponent(loadedModule, { Loadable }) {
  const Component = loadedModule.default || loadedModule
  hoistNonReactStatics(Loadable, Component, {
    prefetch: true,
    Prefetch: true,
  })
  return Component
}
