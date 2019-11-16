/* eslint-disable no-param-reassign */
export default (file, api) => {
  const { source } = file;
  const { jscodeshift: j } = api;

  const root = j(source);

  // Rename `import Loadable from 'react-loadable';` to `import loadable from '@loadable/component';
  root.find(j.ImportDeclaration).forEach(({ node }) => {
    if (node.specifiers[0] && node.specifiers[0].local.name === 'Loadable' && node.source.value === 'react-loadable') {
      node.specifiers[0].local.name = 'loadable';
      node.source.value = '@loadable/component';
    }
  });

  // Change Loadable({ ... }) invocation to loadable(() => {}, { ... }) invocation
  root.find(j.CallExpression, { callee: { name: 'Loadable' } }).forEach(({ node }) => {
    const initialArgsProps = node.arguments[0].properties;
    let loader; // this will be a function returning a dynamic import promise

    const newProps = initialArgsProps
      .map(prop => {
        if (prop.key.name === 'loader') {
          loader = prop.value;
          return undefined;
        }

        if (prop.key.name === 'loading') {
          prop.key.name = 'fallback'; // rename to fallback

          if (prop.value.type === 'ArrowFunctionExpression') {
            prop.value = prop.value.body; // change () => <div /> to <div />
          } else if (prop.value.type === 'Identifier') {
            prop.value = 'null';
          }

          return prop;
        }

        return undefined;
      })
      .filter(Boolean);

    node.arguments.unshift(loader);
    node.arguments[1].properties = newProps;
    node.callee.name = 'loadable';
  });

  // remove errorLoading function if exist (maybe just do this manually)

  // set correct fallback if previous loader was a function (might need to do manually)

  return root.toSource({ quote: 'single', trailingComma: true });
};

/**
 * yarn jscodeshift -t ./codemod/upgrade-loadable-component/jscodeshift.js ./codemod/upgrade-loadable-component/dummy.js
 */
