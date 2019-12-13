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

  function isImportCall(path) {
    if (path.type === 'CallExpression') {
      const { callee } = path;
      if (callee.type === 'Import') {
        return true;
      }
    }
    return false
  }

  function isFunctionBodyWhichReturnsImportCall(path) {
    if (path.type === 'BlockStatement') {
      const { body: methodBody } = path;
      if (methodBody.length === 1) {
        const [statement] = methodBody;
        if (statement.type === 'ReturnStatement') {
          const { argument: returnExpression } = statement;
          if (isImportCall(returnExpression)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  function isFunctionAndOnlyReturnsImport(importCreator) {
    if (importCreator.type === 'ArrowFunctionExpression') {
      const { body } = importCreator;
      if (isImportCall(body) || isFunctionBodyWhichReturnsImportCall(body)) {
        return true;
      }
    }

    if (['ObjectMethod', 'FunctionExpression'].indexOf(importCreator.type) !== -1) {
      const { body } = importCreator;
      if (isFunctionBodyWhichReturnsImportCall(body)) {
        return true;
      }
    }
    return false;
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
    const importCreator = path.node.type === 'CallExpression'
      ? path.node.arguments[0] // loadable((...) => import(...)) or loadable.lib
      : path.node; // /* #__LOADABLE__ */ () => import(...)

      if (!isFunctionAndOnlyReturnsImport(importCreator)) {
      throw new Error(
        'The first argument to `loadable()` must be a function with a single statement that returns a call to `import()`' +
        'See https://loadable-components.com/docs/api-loadable-component/#loadfn for more information',
      );
    }

    const callPaths = collectImportCallPaths(path)

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
