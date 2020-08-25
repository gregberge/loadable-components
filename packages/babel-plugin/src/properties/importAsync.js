function getFunc({ types: t }, funcPath) {
  if (funcPath.isObjectMethod()) {
    const { params, body, async } = funcPath.node

    return t.arrowFunctionExpression(params, body, async)
  }

  return funcPath.node
}

function buildProperty({ types: t }, functionExpression) {
  return t.objectProperty(t.identifier('importAsync'), functionExpression)
}

export function importAsyncProperty(api) {
  return ({ funcPath }) => buildProperty(api, getFunc(api, funcPath))
}

function getFuncWithEsmSSR(api, funcPath, target) {
  const { params, body, async } = funcPath.node
  const { types: t } = api

  if (target === 'node') {
    return t.arrowFunctionExpression(
      params,
      t.callExpression(
        t.memberExpression(
          t.identifier('Promise'),
          t.identifier('resolve'),
        ),
        [
          t.callExpression(
            t.identifier('__non_webpack_require__'),
            body.arguments
          )
        ]
      ),
      async
    )
  }

  return getFunc(api, funcPath)
}

export function importAsyncPropertyEsm(api, target) {
  return ({ funcPath }) => buildProperty(api, getFuncWithEsmSSR(api, funcPath, target))
}