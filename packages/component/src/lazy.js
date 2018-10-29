import loadable from './loadable'

export default function lazy(ctor, options) {
  return loadable(ctor, { ...options, suspense: true })
}
