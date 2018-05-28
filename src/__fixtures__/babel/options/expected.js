import loadable from 'loadable-components';

const AsyncComponent = loadable((() => {
  const fn = () => import('./MyComponent');

  fn.modules = ['./MyComponent'];
  return fn;
})(), {
  LoadingComponent: () => 'Loading...'
});

export default AsyncComponent;
