export const clearModuleCache = key => delete require.cache[key]

export const smartRequire = modulePath => {
  if (process.env.NODE_ENV !== 'production') {
    clearModuleCache(modulePath)
  }

  // eslint-disable-next-line global-require, import/no-dynamic-require
  return require(modulePath)
}

export const joinURLPath = (...paths) => {
  const cleanPaths = paths.map(path => path.replace(/\/$/, ''))
  return cleanPaths.join('/')
}
