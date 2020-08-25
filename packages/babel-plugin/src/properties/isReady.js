function buildProperty({ types: t, template }, statement) {
  const statements = template.ast(statement)

  return () =>
    t.objectMethod(
      'method',
      t.identifier('isReady'),
      [t.identifier('props')],
      t.blockStatement(statements),
    )
}

export function isReadyProperty(api) {
  const statement = `
    const key = this.resolve(props)
    if (this.resolved[key] === false) {
      return false
    }

    if (typeof __webpack_modules__ !== 'undefined') {
      return !!(__webpack_modules__[key])
    }

    return false
  `

  return buildProperty(api, statement)
}

export function isReadyPropertyEsm(api) {
  const statement = `
    const key = this.resolve(props)

    return !!this.module[key]
  `

  return buildProperty(api, statement)
}