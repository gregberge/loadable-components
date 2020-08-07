/* eslint-disable import/prefer-default-export */

export function invariant(condition, message) {
  if (condition) return
  const error = new Error(`loadable: ${message}`)
  error.framesToPop = 1
  error.name = 'Invariant Violation'
  throw error
}

export function warn(message) {
  // eslint-disable-next-line no-console
  console.warn(`loadable: ${message}`)
}
