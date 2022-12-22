import { getImportArg } from '../util'

export default function resolveProperty(
  { types: t, template },
  { moduleFederation },
) {
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
    const { isBrowser } = process

    if (moduleFederation) {
      if ('isBrowser' in process) {
        if (isBrowser === true) {
          // eslint-disable-next-line no-console
          console.warn(
            'You are using Module Federation with target browser in webpack config. This is not recommended, cause it will disable code-splitting on client-side. Please use target "node" or false.',
          )
        }
      } else {
        // eslint-disable-next-line no-console
        console.warn(
          'process.isBrowser not found. Please use LoadablePlugin in webpack config.',
        )
      }
    }

    const targetTemplate =
      moduleFederation && isBrowser === false ? 'federated' : 'standard'

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
