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
  root.find(j.CallExpression, { callee: { name: 'Loadable' } }).forEach((path) => {
    const { node } = path;
    const initialArgsProps = node.arguments[0].properties;
    let loader; // this will be a function returning a dynamic import promise

    // loop through the first argument (object) passed to `Loadable({ ... })`
    const newProps = initialArgsProps
      .map(prop => {
        if (prop.key.name === 'loader') {
          /**
           * In react-loadable, this is the function that returns a dynamic import
           * We'll keep it to `loader` variable for now, and remove it from the arg object
           */
          loader = prop.value;

          return undefined;
        }

        if (prop.key.name === 'loading') {
          prop.key.name = 'fallback'; // rename to fallback

          /**
           * react-loadable accepts a Function that returns JSX as the `loading` arg.
           * @loadable/component accepts a React.Element (what returned from React.createElement(calls))
           * 
           */
          if (prop.value.type === 'ArrowFunctionExpression') {
            // if it's an ArrowFunctionExpression like `() => <div>loading...</div>`, 
            
            if (prop.value.params && prop.value.params.length > 0) {
              // If the function accept params, we can't safely transform it. We can just make it null
              prop.value = 'null';
            } else {
              // If the function doesn't accept any params, we can safely just invoke it directly
              // we can change it to `(() => <div>loading...</div>)()`
              const callExpr = j.callExpression(
                prop.value, 
                [],
              );

              prop.value = callExpr;
            }
          } else if (prop.value.type === 'Identifier') {
            // if it's an identifier like `Loading`, we can't know if it accept params or not, 
            // so just set it to null
            prop.value = 'null';
          }

          return prop;
        }

        // for all other props, just remove them
        return undefined;
      })
      .filter(Boolean);

    // add the function that return a dynamic import we stored earlier as the first argument to `loadable()` call
    node.arguments.unshift(loader);
    node.arguments[1].properties = newProps;
    node.callee.name = 'loadable';
  });

  return root.toSource({ quote: 'single', trailingComma: true });
};
