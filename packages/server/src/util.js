// Use __non_webpack_require__ to prevent Webpack from compiling it
// when the server-side code is compiled with Webpack
// eslint-disable-next-line camelcase, no-undef, global-require, import/no-dynamic-require, no-eval
const getRequire = () => typeof __non_webpack_require__ !== 'undefined' ? __non_webpack_require__ : eval('require');

export const clearModuleCache = moduleName => {
  const { cache } = getRequire();
  const m = cache[moduleName]
  if (m) {
    // remove self from own parents
    if (m.parent && m.parent.children) {
      m.parent.children = m.parent.children.filter(x => x !== m)
    }
    // remove self from own children
    if (m.children) {
      m.children.forEach(child => {
        if (child.parent && child.parent === m) {
          child.parent = null
        }
      })
    }
    delete cache[moduleName]
  }
}

export const smartRequire = modulePath => {
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    clearModuleCache(modulePath)
  }

  return getRequire()(modulePath)
}

export const joinURLPath = (publicPath, filename) => {
  if (publicPath.substr(-1) === '/') {
    return `${publicPath}${filename}`
  }

  return `${publicPath}/${filename}`
}
