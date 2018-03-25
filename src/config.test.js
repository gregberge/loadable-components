import { getConfig, setConfig } from './config'

describe('config', () => {
  it('should set and get config', () => {
    expect(getConfig()).toEqual({ hotReload: false })
    setConfig({ hotReload: true })
    expect(getConfig()).toEqual({ hotReload: true })
  })
})
