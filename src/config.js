/* eslint-disable no-underscore-dangle */

const _config = {
  // Automatically load components in hot reload environment
  hotReload: process.env.NODE_ENV === 'development',
}

export const setConfig = config => Object.assign(_config, config)
export const getConfig = () => _config
