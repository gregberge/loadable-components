export default function requireAsyncProperty({ types: t }) {
  function getFunc(funcPath) {
    if (funcPath.isObjectMethod()) {
      const { params, body, async } = funcPath.node
      return t.arrowFunctionExpression(params, body, async)
    }

    return funcPath.node
  }

  return ({ funcPath }) =>
    t.objectProperty(t.identifier('importAsync'), getFunc(funcPath))
}
