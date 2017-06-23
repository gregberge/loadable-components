export default name =>
  typeof Symbol === 'function' ? Symbol(name) : `@@lodable-components/${name}`
