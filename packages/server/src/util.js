export const clearModuleCache = key => delete require.cache[key]

export const smartRequire = modulePath => {
  if (process.env.NODE_ENV !== 'production') {
    clearModuleCache(modulePath)
  }

  // Use eval to prevent Webpack from compiling it
  // when the server-side code is compiled with Webpack
  // eslint-disable-next-line no-eval
  return eval('module.require')(modulePath)
}

export const joinURLPath = (...paths) => {
  const cleanPaths = paths.map(path => path.replace(/\/$/, ''))
  return cleanPaths.join('/')
}
