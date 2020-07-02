export const clearModuleCache = moduleName => {
  const m = require.cache[moduleName]
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
    delete require.cache[moduleName]
  }
}

export const smartRequire = modulePath => {
  if (process.env.NODE_ENV !== 'production') {
    clearModuleCache(modulePath)
  }

  // Use __non_webpack_require__ to prevent Webpack from compiling it
  // when the server-side code is compiled with Webpack
  // eslint-disable-next-line camelcase
  if (typeof __non_webpack_require__ !== 'undefined') {
    // eslint-disable-next-line no-undef
    return __non_webpack_require__(modulePath)
  }

  // eslint-disable-next-line global-require, import/no-dynamic-require, no-eval
  return eval('require')(modulePath)
}

export const joinURLPath = (publicPath, filename) => {
  if (publicPath.substr(-1) === '/') {
    return `${publicPath}${filename}`
  }

  return `${publicPath}/${filename}`
}
