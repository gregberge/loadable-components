export { invariant } from './util'
export { default as Context } from './Context'
const LOADABLE_REQUIRED_CHUNKS_KEY = '__LOADABLE_REQUIRED_CHUNKS__'
export function getRequiredChunkKey(namespace) {
  return `${namespace}${LOADABLE_REQUIRED_CHUNKS_KEY}`
}
