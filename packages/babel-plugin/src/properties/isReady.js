export default function isReadyProperty({ types: t, template }) {
  const statements = template.ast(`
    if (typeof __webpack_modules__ !== 'undefined') {
      return !!(__webpack_modules__[this.resolve(props)])
    }

    return false
  `)

  return () =>
    t.objectMethod(
      'method',
      t.identifier('isReady'),
      [t.identifier('props')],
      t.blockStatement(statements),
    )
}
