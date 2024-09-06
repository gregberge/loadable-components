/* eslint-env browser */
const INITIAL_CHUNKS_KEY = '__LOADABLE_INITIAL_CHUNKS__'

export function getInitialChunks() {
  if (!window[INITIAL_CHUNKS_KEY]) {
    window[INITIAL_CHUNKS_KEY] = {}
  }
  return window[INITIAL_CHUNKS_KEY]
}
