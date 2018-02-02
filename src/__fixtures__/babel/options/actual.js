import loadable from 'loadable-components'

const AsyncComponent = loadable(() => import('./MyComponent'), {
  LoadingComponent: () => 'Loading...'
})

export default AsyncComponent
