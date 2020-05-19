export function stateProperty({ types: t }) {
  return () =>
    t.objectProperty(t.identifier('resolved'), t.objectExpression([]))
}

export const statePropertyEsm = stateProperty