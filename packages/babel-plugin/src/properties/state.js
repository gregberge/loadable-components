function buildProperty({ types: t }, key, value) {
  return t.objectProperty(t.identifier(key), value)
}

export function resolvedProperty(api) {
  const { types: t } = api;

  return () =>
    buildProperty(api, 'resolved', t.objectExpression([]))
}

export function typeProperty(api) {
  const { types: t } = api;

  return () => {
    return buildProperty(api, 'type', t.stringLiteral('CHUNK'))
  }
}

export function typePropertyEsm(api) {
  const { types: t } = api;

  return () => {
    return buildProperty(api, 'type', t.stringLiteral('ESM'))
  }
}

export function modulePropertyEsm(api) {
  const { types: t } = api;

  return () =>
    buildProperty(api, 'module', t.objectExpression([]))
}