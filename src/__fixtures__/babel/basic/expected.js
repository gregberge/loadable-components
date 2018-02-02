import loadable from 'loadable-components';

const AsyncComponent = loadable(() => import('./MyComponent'), {
  modules: ['./MyComponent']
});

export default AsyncComponent;
