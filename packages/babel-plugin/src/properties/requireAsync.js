function buildProperty({ types: t }, implementation) {
  return t.objectMethod(
    'method',
    t.identifier('requireAsync'),
    [t.identifier('props')],
    t.blockStatement(implementation),
  );
}

export function requireAsyncProperty(api) {
  const { template } = api

  const implementation = template.ast(`
    const key = this.resolve(props)
    this.resolved[key] = false
    return this.importAsync(props).then(resolved => {
      this.resolved[key] = true
      return resolved
    })
  `)

  return () => {
    return buildProperty(api, implementation)
  }
}

export function requireAsyncPropertyEsm(api) {
  const { template } = api
  const implementation = template.ast(`
    const key = this.resolve(props)
    this.resolved[key] = false
    return this.importAsync(props)
  `)

  return () => {
    return buildProperty(api, implementation)
  }
}