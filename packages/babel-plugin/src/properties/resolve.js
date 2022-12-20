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
            'The "moduleFederation: true" option will disable code splitting on the client-side',
          )
        }
      } else {
        // eslint-disable-next-line no-console
        console.warn(
          'It\'s recommended to use "isBrowser" global variable to detect the environment\n' +
            'Try to add "webpack.DefinePlugin({ \'process.isBrowser\': true })" to your webpack config',
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
