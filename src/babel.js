import syntax from 'babel-plugin-syntax-dynamic-import'

export default function({ types: t }) {
  return {
    inherits: syntax,

    visitor: {
      ImportDeclaration(path, state) {
        const source = path.node.source.value
        const triggerModule = state.opts.triggerModule || 'loadable-components'
        if (source !== triggerModule) return
        const triggerImport = state.opts.triggerImport || 'loadable'
        const defaultSpecifier = path
          .get('specifiers')
          .find(specifier => specifier.node.local.name === triggerImport)

        if (!defaultSpecifier) return

        const bindingName = defaultSpecifier.node.local.name
        const binding = path.scope.getBinding(bindingName)

        binding.referencePaths.forEach(refPath => {
          let callExpression = refPath.parentPath

          if (
            callExpression.isMemberExpression() &&
            callExpression.node.computed === false &&
            callExpression.get('property').isIdentifier({ name: 'Map' })
          ) {
            callExpression = callExpression.parentPath
          }

          if (!callExpression.isCallExpression()) return

          const args = callExpression.get('arguments')
          const loaderMethod = args[0]

          if (!loaderMethod) return

          const dynamicImports = []

          loaderMethod.traverse({
            Import({ parentPath }) {
              dynamicImports.push(parentPath)
            },
          })

          if (!dynamicImports.length) return

          const dynamicImportArray = t.arrayExpression(
            dynamicImports.map(
              dynamicImport => dynamicImport.get('arguments')[0].node,
            ),
          )

          const assignToFn = t.VariableDeclaration('const', [
            t.VariableDeclarator(t.Identifier('fn'), loaderMethod.node),
          ])

          const addModuleArray = t.ExpressionStatement(
            t.AssignmentExpression(
              '=',
              t.Identifier('fn.modules'),
              dynamicImportArray,
            ),
          )

          const test = t.ArrowFunctionExpression(
            [],
            t.BlockStatement([
              assignToFn,
              addModuleArray,
              t.ReturnStatement(t.Identifier('fn')),
            ]),
          )

          const selfcall = t.CallExpression(test, [])

          loaderMethod.replaceWith(selfcall)
        })
      },
    },
  }
}
