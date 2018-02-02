import loadable from 'loadable-components'

const AsyncComponent = loadable(() => import('./MyComponent'))

export default AsyncComponent
