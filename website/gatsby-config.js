const { getGatsbyConfig } = require('smooth-doc/config')

module.exports = getGatsbyConfig({
  root: __dirname,
  name: 'Loadable Components',
  slug: 'loadable-components',
  github: 'https://github.com/smooth-code/loadable-components',
  menu: ['Introduction', 'Guides', 'API'],
  nav: [{ title: 'Docs', url: '/docs/' }],
})
