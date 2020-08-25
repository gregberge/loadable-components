function buildProperty({ types: t, template }, statement) {
  const implementation = template.ast(statement)

  return t.objectMethod(
    'method',
    t.identifier('requireAsync'),
    [t.identifier('props')],
    t.blockStatement(implementation),
  );
}

export function requireAsyncProperty(api) {
  const statement = `
    const key = this.resolve(props)
    this.resolved[key] = false
    return this.importAsync(props).then(resolved => {
      this.resolved[key] = true
      return resolved
    })
  `

  return () => {
    return buildProperty(api, statement)
  }
}

export function requireAsyncPropertyEsm(api) {
  const statement = `
    const key = this.resolve(props)
    this.module[key] = null
    return this.importAsync(props).then(resolved => {
      this.module[key] = resolved
      return resolved
    });
  `

  return () => {
    return buildProperty(api, statement)
  }
}