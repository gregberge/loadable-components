import { getImportArg } from '../util'

export default function resolveProperty({ types: t, template }) {
  const buildStatements = template`
    if (require.resolveWeak) {
      return require.resolveWeak(ID)
    }

    return require('path').resolve(__dirname, ID)
  `

  function getCallValue(callPath) {
    const importArg = getImportArg(callPath)
    if (importArg.isTemplateLiteral()) {
      return t.templateLiteral(
        importArg.node.quasis,
        importArg.node.expressions,
      )
    }
    return t.stringLiteral(importArg.node.value)
  }

  return ({ callPath, funcPath }) =>
    t.objectMethod(
      'method',
      t.identifier('resolve'),
      funcPath.node.params,
      t.blockStatement(buildStatements({ ID: getCallValue(callPath) })),
    )
}
