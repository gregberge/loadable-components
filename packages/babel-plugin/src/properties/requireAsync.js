export default function requireAsyncProperty({ types: t }) {
  return ({ funcPath }) =>
    t.objectProperty(t.identifier('requireAsync'), funcPath.node)
}
