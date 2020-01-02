import syntaxDynamicImport from '@babel/plugin-syntax-dynamic-import'
import chunkNameProperty from './properties/chunkName'
import isReadyProperty from './properties/isReady'
import importAsyncProperty from './properties/importAsync'
import requireAsyncProperty from './properties/requireAsync'
import requireSyncProperty from './properties/requireSync'
import resolveProperty from './properties/resolve'
import stateProperty from './properties/state'

const properties = [
  stateProperty,
  chunkNameProperty,
  isReadyProperty,
  importAsyncProperty,
  requireAsyncProperty,
  requireSyncProperty,
  resolveProperty,
]

const LOADABLE_COMMENT = '#__LOADABLE__'

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

  function hasLoadableComment(path) {
    const comments = path.get('leadingComments')
    const comment = comments.find(
      ({ node }) =>
        node && node.value && String(node.value).includes(LOADABLE_COMMENT),
    )
    if (!comment) return false
    comment.remove()
    return true
  }

  function getFuncPath(path) {
    const funcPath = path.isCallExpression() ? path.get('arguments.0') : path
    if (
      !funcPath.isFunctionExpression() &&
      !funcPath.isArrowFunctionExpression() &&
      !funcPath.isObjectMethod()
    ) {
      return null
    }
    return funcPath
  }

  function transformImport(path) {
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

    const funcPath = getFuncPath(path)
    if (!funcPath) return

    funcPath.node.params = funcPath.node.params || []

    const object = t.objectExpression(
      propertyFactories.map(getProperty =>
        getProperty({ path, callPath, funcPath }),
      ),
    )

    if (funcPath.isObjectMethod()) {
      funcPath.replaceWith(
        t.objectProperty(funcPath.node.key, object, funcPath.node.computed),
      )
    } else {
      funcPath.replaceWith(object)
    }
  }

  return {
    inherits: syntaxDynamicImport,
    visitor: {
      Program: {
        enter(programPath) {
          programPath.traverse({
            CallExpression(path) {
              if (!isValidIdentifier(path)) return
              transformImport(path)
            },
            'ArrowFunctionExpression|FunctionExpression|ObjectMethod': path => {
              if (!hasLoadableComment(path)) return
              transformImport(path)
            },
          })
        },
      },
    },
  }
}

export default loadablePlugin
