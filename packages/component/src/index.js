/* eslint-disable no-underscore-dangle */
import * as sharedInternals from './sharedInternals'
import * as loadableExports from './loadable'
import * as libraryExports from './library'

const { loadable } = loadableExports
loadable.lib = libraryExports.loadable

const { lazy } = loadableExports
lazy.lib = libraryExports.lazy

export default loadable
export { lazy }

export { default as loadableReady } from './loadableReady'
export const __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sharedInternals
