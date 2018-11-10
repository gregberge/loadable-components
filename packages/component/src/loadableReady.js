/* eslint-disable no-underscore-dangle, camelcase */
/* eslint-env browser */
import { warn } from './util'
import { LOADABLE_REQUIRED_CHUNKS_KEY } from './sharedInternals'

const BROWSER = typeof window !== 'undefined'

export default function loadableReady(done = () => {}) {
  if (!BROWSER) {
    warn('`loadableReady()` must be called in browser only')
    done()
    return Promise.resolve()
  }

  const requiredChunks = BROWSER ? window[LOADABLE_REQUIRED_CHUNKS_KEY] : null

  if (!requiredChunks) {
    warn(
      '`loadableReady()` requires state, please use `getScriptTags` or `getScriptElements` server-side',
    )
    done()
    return Promise.resolve()
  }

  let resolved = false

  return new Promise(resolve => {
    window.__LOADABLE_LOADED_CHUNKS__ = window.__LOADABLE_LOADED_CHUNKS__ || []
    const loadedChunks = window.__LOADABLE_LOADED_CHUNKS__
    const originalPush = loadedChunks.push.bind(loadedChunks)

    function checkReadyState() {
      if (
        requiredChunks.every(chunk =>
          loadedChunks.some(([chunks]) => chunks.includes(chunk)),
        )
      ) {
        if (!resolved) {
          resolved = true
          resolve()
          done()
        }
      }
    }

    loadedChunks.push = (...args) => {
      originalPush(...args)
      checkReadyState()
    }

    checkReadyState()
  })
}
