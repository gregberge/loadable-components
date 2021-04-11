/* eslint-disable no-underscore-dangle, camelcase */
/* eslint-env browser */
import { warn } from './util'
import { getRequiredChunkKey } from './sharedInternals'
import { LOADABLE_SHARED } from './shared'

const BROWSER = typeof window !== 'undefined'

export default function loadableReady(
  done = () => {},
  { namespace = '', chunkLoadingGlobal = '__LOADABLE_LOADED_CHUNKS__' } = {},
) {
  if (!BROWSER) {
    warn('`loadableReady()` must be called in browser only')
    done()
    return Promise.resolve()
  }

  let requiredChunks = null
  if (BROWSER) {
    const id = getRequiredChunkKey(namespace)
    const dataElement = document.getElementById(id)
    if (dataElement) {
      requiredChunks = JSON.parse(dataElement.textContent)

      const extElement = document.getElementById(`${id}_ext`)
      if (extElement) {
        const { namedChunks } = JSON.parse(extElement.textContent)
        namedChunks.forEach(chunkName => {
          LOADABLE_SHARED.initialChunks[chunkName] = true
        })
      } else {
        // version mismatch
        throw new Error(
          'loadable-component: @loadable/server does not match @loadable/component',
        )
      }
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
    window[chunkLoadingGlobal] = window[chunkLoadingGlobal] || []
    const loadedChunks = window[chunkLoadingGlobal]
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
        }
      }
    }

    loadedChunks.push = (...args) => {
      originalPush(...args)
      checkReadyState()
    }

    checkReadyState()
  }).then(done)
}
