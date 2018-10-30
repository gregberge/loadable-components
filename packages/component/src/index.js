/* eslint-disable no-underscore-dangle */
import * as sharedInternals from './sharedInternals'
import loadable from './loadable'
import library from './library'

loadable.lib = library

export default loadable
export { default as library } from './library'

export { default as loadComponents } from './loadComponents'
export const __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sharedInternals
