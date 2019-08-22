/* eslint-disable no-underscore-dangle, camelcase */
/* eslint-env browser */
import { warn } from './util'
import { getRequiredChunkKey } from './sharedInternals'

const BROWSER = typeof window !== 'undefined'

export default function loadableReady(
  done = () => {},
  { namespace = '' } = {},
) {
  if (!BROWSER) {
    warn('`loadableReady()` must be called in browser only')
    done()
    return Promise.resolve()
  }

  let requiredChunks = null
  if (BROWSER) {
    const dataElement = document.getElementById(getRequiredChunkKey(namespace))
    if (dataElement) {
      requiredChunks = JSON.parse(dataElement.textContent)
    }
  }

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
          loadedChunks.some(([chunks]) => chunks.indexOf(chunk) > -1),
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
