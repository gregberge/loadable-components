function buildProperty({ types: t }, type) {
  return t.objectProperty(t.identifier('type'), t.stringLiteral(type))
}

export function typeProperty(api) {
  return () => {
    return buildProperty(api, 'CHUNK')
  }
}

export function typePropertyEsm(api) {
  return () => {
    return buildProperty(api, 'ESM')
  }
}