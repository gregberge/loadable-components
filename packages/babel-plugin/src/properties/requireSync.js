function buildProperty({ types: t }, implementation) {
  return t.objectMethod(
    'method',
    t.identifier('requireSync'),
    [t.identifier('props')],
    t.blockStatement(implementation),
  )
}

export function requireSyncProperty(api) {
  const { template } = api;
  const implementation = template.ast(`
    const id = this.resolve(props)

    if (typeof __webpack_require__ !== 'undefined') {
      return __webpack_require__(id)
    }

    return eval('module.require')(id)
  `)

  return () => {
    return buildProperty(api, implementation)
  }
}


export function requireSyncPropertyEsm(api, target) {
  const { template } = api
  const nodeImplementation = template.ast(`
    const id = this.resolve(props)

    const module = __non_webpack_require__(id)

    if (module.__esModule) {
      return module
    }

     return { __esModule: true, default: module }
  `)

  const browserImplementation = template.ast(`
    const id = this.resolve(props)

    throw new Error('esm module ' + id + ' cannot be loaded synchronously');
  `)

  return () => {
    return buildProperty(api, target === 'node' ? nodeImplementation : browserImplementation)
  };
}