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

export const STATUS_PENDING = 'PENDING'
export const STATUS_RESOLVED = 'RESOLVED'
export const STATUS_REJECTED = 'REJECTED'

export function statusAware(promise) {
  let status = STATUS_PENDING

  const proxy = new Proxy(promise, {
    get(target, prop) {
      if (prop === 'status') return status

      const value = target[prop]

      return typeof value === 'function'
        ? (...args) => statusAware(value.bind(target)(...args))
        : value
    },
  })

  promise
    .then(() => {
      status = STATUS_RESOLVED
    })
    .catch(() => {
      status = STATUS_REJECTED
    })

  return proxy
}
