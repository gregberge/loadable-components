/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
const chalk = require('chalk')

const invokeWithMockedUpProp = (jscodeshift, file, prop) => {
  // We invoke the function previously passed as `loading` to react-loadable with this props
  // {
  //   pastDelay: true,
  //   error: false,
  //   timedOut: false,
  // }
  const j = jscodeshift

  const defaultPropsObjProperties = []

  defaultPropsObjProperties.push(
    j.objectProperty(j.identifier('pastDelay'), j.booleanLiteral(true)),
  )
  defaultPropsObjProperties.push(
    j.objectProperty(j.identifier('error'), j.booleanLiteral(false)),
  )
  defaultPropsObjProperties.push(
    j.objectProperty(j.identifier('timedOut'), j.booleanLiteral(false)),
  )

  const defaultPropsObj = j.objectExpression(defaultPropsObjProperties)

  const callExpr = j.callExpression(prop.value, [defaultPropsObj])

  prop.value = callExpr

  console.warn(
    chalk.yellow(
      `[WARN] '${file.path}' has some react-loadable specific logic in it. We could not codemod while keeping all the behaviors the same. Please check this file manually.`,
    ),
  )
}

module.exports = (file, api) => {
  const { source } = file
  const { jscodeshift: j } = api

  const root = j(source)

  // Rename `import Loadable from 'react-loadable';` to `import loadable from '@loadable/component';
  root.find(j.ImportDeclaration).forEach(({ node }) => {
    if (
      node.specifiers[0] &&
      node.specifiers[0].local.name === 'Loadable' &&
      node.source.value === 'react-loadable'
    ) {
      node.specifiers[0].local.name = 'loadable'
      node.source.value = '@loadable/component'
    }
  })

  // Change Loadable({ ... }) invocation to loadable(() => {}, { ... }) invocation
  root
    .find(j.CallExpression, { callee: { name: 'Loadable' } })
    .forEach(path => {
      const { node } = path
      const initialArgsProps = node.arguments[0].properties
      let loader // this will be a function returning a dynamic import promise

      // loop through the first argument (object) passed to `Loadable({ ... })`
      const newProps = initialArgsProps
        .map(prop => {
          if (prop.key.name === 'loader') {
            /**
             * In react-loadable, this is the function that returns a dynamic import
             * We'll keep it to `loader` variable for now, and remove it from the arg object
             */
            loader = prop.value

            return undefined
          }

          if (prop.key.name === 'loading') {
            prop.key.name = 'fallback' // rename to fallback

            /**
             * react-loadable accepts a Function that returns JSX as the `loading` arg.
             * @loadable/component accepts a React.Element (what returned from React.createElement() calls)
             *
             */
            if (prop.value.type === 'ArrowFunctionExpression') {
              // if it's an ArrowFunctionExpression like `() => <div>loading...</div>`,

              if (
                (prop.value.params && prop.value.params.length > 0) ||
                prop.value.type === 'Identifier'
              ) {
                // If the function accept props, we can invoke it and pass it a mocked-up props to get the component to
                // a should-be-acceptable default state, while also logs out a warning.
                // {
                //   pastDelay: true,
                //   error: false,
                //   timedOut: false,
                // }

                invokeWithMockedUpProp(j, file, prop)
              } else {
                // If the function doesn't accept any params, we can safely just invoke it directly
                // we can change it to `(() => <div>loading...</div>)()`
                const callExpr = j.callExpression(prop.value, [])

                prop.value = callExpr
              }
            } else if (prop.value.type === 'Identifier') {
              // if it's an identifier like `Loading`, let's just invoke it with a mocked-up props
              invokeWithMockedUpProp(j, file, prop)
            }

            return prop
          }

          // for all other props, just remove them
          return undefined
        })
        .filter(Boolean)

      // add the function that return a dynamic import we stored earlier as the first argument to `loadable()` call
      node.arguments.unshift(loader)
      node.arguments[1].properties = newProps
      node.callee.name = 'loadable'
    })

  return root.toSource({ quote: 'single', trailingComma: true })
}

module.exports.parser = 'babylon'
