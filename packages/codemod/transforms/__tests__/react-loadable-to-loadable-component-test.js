jest.autoMockOff()

const { defineTest } = require('jscodeshift/dist/testUtils')

defineTest(
  __dirname,
  'react-loadable-to-loadable-component',
  null,
  'react-loadable-to-loadable-component_expr',
)
defineTest(
  __dirname,
  'react-loadable-to-loadable-component',
  null,
  'react-loadable-to-loadable-component_arrow-no-params',
)
defineTest(
  __dirname,
  'react-loadable-to-loadable-component',
  null,
  'react-loadable-to-loadable-component_arrow-w-params',
)
