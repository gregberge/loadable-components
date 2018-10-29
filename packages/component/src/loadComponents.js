/* eslint-disable no-underscore-dangle, camelcase */
/* eslint-env browser */
/* globals __webpack_require__ */
import { warn, invariant } from './util'
import {
  DEFAULT_LOADABLE_STATE_KEY,
  DATA_LOADABLE_CHUNK,
} from './sharedInternals'

const BROWSER = typeof window !== 'undefined'
const WEBPACK = typeof __webpack_require__ !== 'undefined'

function isManifestMode() {
  const loadableScripts = document.querySelectorAll(
    `script[${DATA_LOADABLE_CHUNK}]`,
  )
  return loadableScripts.length > 0
}

export default function loadComponents(loadableState) {
  loadableState = BROWSER ? window[DEFAULT_LOADABLE_STATE_KEY] : null

  if (!loadableState) {
    if (!BROWSER) {
      warn('`loadComponents()` must be called in browser only')
    }

    if (isManifestMode()) {
      warn(
        '`loadComponents()` is not required if you use `@loadable/webpack-plugin`',
      )
    } else {
      warn(
        '`loadComponents()` requires a state in the page, please inject scripts server-side',
      )
    }
    return Promise.resolve()
  }

  invariant(WEBPACK, '`loadComponents()` is only compatible with Webpack')

  return Promise.all(
    loadableState.map(chunk => __webpack_require__.e(chunk)),
  ).catch(error => {
    warn('`loadComponents()` has failed')
    warn(error)
  })
}
