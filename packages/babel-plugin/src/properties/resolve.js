import { getImportArg } from '../util'

export default function resolveProperty({ types: t, template }) {
  const templates = {
    federated: template`
      require(ID)
      
      if (require.resolveWeak) {
        return require.resolveWeak(ID)
      }
      
      return eval('require.resolve')(ID)
    `,
    standard: template`
      if (require.resolveWeak) {
        return require.resolveWeak(ID)
      }
      
      return eval('require.resolve')(ID)
    `,
  }

  function getCallValue(callPath) {
    const importArg = getImportArg(callPath)
    if (importArg.isTemplateLiteral()) {
      return t.templateLiteral(
        importArg.node.quasis,
        importArg.node.expressions,
      )
    }
    if (importArg.isBinaryExpression()) {
      return t.BinaryExpression(
        importArg.node.operator,
        importArg.node.left,
        importArg.node.right,
      )
    }
    return t.stringLiteral(importArg.node.value)
  }

  return ({ callPath, funcPath }) => {
    const targetTemplate = process.env.serverSideModuleFederation
      ? 'federated'
      : 'standard'

    return t.objectMethod(
      'method',
      t.identifier('resolve'),
      funcPath.node.params,
      t.blockStatement(
        templates[targetTemplate]({ ID: getCallValue(callPath) }),
      ),
    )
  }
}
