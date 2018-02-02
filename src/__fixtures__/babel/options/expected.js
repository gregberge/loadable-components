import loadable from 'loadable-components';

const AsyncComponent = loadable(() => import('./MyComponent'), {
  LoadingComponent: () => 'Loading...',
  modules: ['./MyComponent']
});

export default AsyncComponent;
