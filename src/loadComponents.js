/* eslint-env browser */
import { LOADABLE, COMPONENT_IDS } from './constants'
import * as componentTracker from './componentTracker'

async function loadComponents() {
  if (typeof window === 'undefined') {
    throw new Error(
      '`loadComponents` must be called client-side: `window` is undefined',
    )
  }

  const ids = window[COMPONENT_IDS] || []
  return Promise.all(ids.map(id => componentTracker.get(id)[LOADABLE]().load()))
}

export default loadComponents
