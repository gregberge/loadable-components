import { getImportArg } from '../util'

function buildProperty({ types: t }, params, statement) {
  return t.objectMethod(
    'method',
    t.identifier('resolve'),
    params,
    t.blockStatement(statement),
  )
}

function getCallValue({ types: t }, callPath) {
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

export function resolveProperty(api) {
  const { template } = api
  const statementBuilder = template `
    if (require.resolveWeak) {
      return require.resolveWeak(ID)
    }

    return eval('require.resolve')(ID)
  `

  return ({ callPath, funcPath }) => {
    const id = getCallValue(api, callPath);
    const statement = statementBuilder({ ID: id });

    return buildProperty(api, funcPath.node.params, statement);
  }
}


export function resolvePropertyEsm(api) {
  const { template } = api
  const statementBuilder = template `
    return ID;
  `;

  return ({ callPath, funcPath }) => {
    const id = getCallValue(api, callPath)
    const statement = [statementBuilder({ ID: id })]

    return buildProperty(api, funcPath.node.params, statement)
  }
}