export default function requireAsyncProperty({types: t}) {

  return () =>
    t.objectProperty(
      t.identifier('loading'),
      t.objectExpression([])
    )
}
