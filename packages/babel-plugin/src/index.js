import syntaxDynamicImport from '@babel/plugin-syntax-dynamic-import'
import chunkNameProperty from './properties/chunkName'
import isReadyProperty from './properties/isReady'
import requireAsyncProperty from './properties/requireAsync'
import requireSyncProperty from './properties/requireSync'
import resolveProperty from './properties/resolve'

const properties = [
  chunkNameProperty,
  isReadyProperty,
  requireAsyncProperty,
  requireSyncProperty,
  resolveProperty,
]

const loadablePlugin = api => {
  const { types: t } = api

  function collectImportCallPaths(startPath) {
    const imports = []
    startPath.traverse({
      Import(importPath) {
        imports.push(importPath.parentPath)
      },
    })
    return imports
  }

  const propertyFactories = properties.map(init => init(api))

  return {
    inherits: syntaxDynamicImport,
    visitor: {
      ImportDeclaration(path) {
        const source = path.node.source.value
        if (source !== '@loadable/component') return

        let defaultSpecifier = path.get('specifiers').find(specifier => {
          return specifier.isImportDefaultSpecifier()
        })

        if (!defaultSpecifier) return

        const bindingName = defaultSpecifier.node.local.name
        const binding = path.scope.getBinding(bindingName)

        binding.referencePaths.forEach(refPath => {
          let callExpression = refPath.parentPath

          if (
            callExpression.isMemberExpression() &&
            callExpression.node.computed === false &&
            callExpression.get('property').isIdentifier({ name: 'lib' })
          ) {
            callExpression = callExpression.parentPath
          }

          if (!callExpression.isCallExpression()) return

          const callPaths = collectImportCallPaths(callExpression)

          // Ignore loadable function that does not have any "import" call
          if (callPaths.length === 0) return

          // Multiple imports call is not supported
          if (callPaths.length > 1) {
            throw new Error(
              'loadable: multiple import calls inside `loadable()` function are not supported.',
            )
          }

          const [callPath] = callPaths
          const funcPath = callExpression.get('arguments.0')

          funcPath.replaceWith(
            t.objectExpression(
              propertyFactories.map(getProperty =>
                getProperty({ path: callExpression, callPath, funcPath }),
              ),
            ),
          )
        })
      },
    },
  }
}

export default loadablePlugin
