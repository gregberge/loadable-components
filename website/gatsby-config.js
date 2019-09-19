module.exports = {
  plugins: [
    {
      resolve: 'smooth-doc',
      options: {
        name: 'Loadable Components',
        slug: 'loadable-components',
        author: 'Greg Bergé',
        description: 'The recommended Code Splitting library for React.',
        siteUrl: 'https://www.smooth-code.com/open-source/loadable-components',
        github: 'https://github.com/smooth-code/loadable-components',
        menu: ['Introduction', 'Guides', 'API'],
        nav: [{ title: 'Docs', url: '/docs/' }],
        codeFundProperty: 268,
      },
    },
    {
      resolve: '@bundle-analyzer/gatsby-plugin',
      options: {
        token: '385aa427a43b4e840d763a07f672131a57decf45',
      },
    },
  ],
}
