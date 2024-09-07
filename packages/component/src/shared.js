/* eslint-env browser */
const INITIAL_CHUNKS_KEY = '__LOADABLE_INITIAL_CHUNKS__'

const SERVER_INITIAL_CHUNKS = {}

export const BROWSER = typeof window !== 'undefined'

export function getInitialChunks() {
  if (!BROWSER) {
    return SERVER_INITIAL_CHUNKS
  }
  if (!window[INITIAL_CHUNKS_KEY]) {
    window[INITIAL_CHUNKS_KEY] = {}
  }
  return window[INITIAL_CHUNKS_KEY]
}
