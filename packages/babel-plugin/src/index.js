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

  function isValidIdentifier(path) {
    // `loadable()`
    if (path.get('callee').isIdentifier({ name: 'loadable' })) {
      return true
    }

    // `loadable.lib()`
    return (
      path.get('callee').isMemberExpression() &&
      path.get('callee.object').isIdentifier({ name: 'loadable' }) &&
      path.get('callee.property').isIdentifier({ name: 'lib' })
    )
  }

  return {
    inherits: syntaxDynamicImport,
    visitor: {
      CallExpression(path) {
        if (!isValidIdentifier(path)) return

        const callPaths = collectImportCallPaths(path)

        // Ignore loadable function that does not have any "import" call
        if (callPaths.length === 0) return

        // Multiple imports call is not supported
        if (callPaths.length > 1) {
          throw new Error(
            'loadable: multiple import calls inside `loadable()` function are not supported.',
          )
        }

        const [callPath] = callPaths
        const funcPath = path.get('arguments.0')

        funcPath.replaceWith(
          t.objectExpression(
            propertyFactories.map(getProperty =>
              getProperty({ path, callPath, funcPath }),
            ),
          ),
        )
      },
    },
  }
}

export default loadablePlugin
