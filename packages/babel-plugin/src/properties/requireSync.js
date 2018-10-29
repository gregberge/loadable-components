export default function requireSyncProperty({ types: t, template }) {
  const statements = template.ast(`
    const id = this.resolve(props)

    if (typeof __webpack_require__ !== 'undefined') {
      return __webpack_require__(id)
    }

    return eval('module.require')(id)
  `)

  return () =>
    t.objectMethod(
      'method',
      t.identifier('requireSync'),
      [t.identifier('props')],
      t.blockStatement(statements),
    )
}
