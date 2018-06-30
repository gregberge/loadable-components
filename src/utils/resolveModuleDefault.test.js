import resolveModuleDefault from './resolveModuleDefault'

describe('resolveModuleDefault', () => {
  it('should return default if present', () => {
    const module = {
      default: 'foo',
    }

    expect(resolveModuleDefault(module)).toBe('foo')
  })

  it('should return module either', () => {
    const module = { foo: 'bar' }
    expect(resolveModuleDefault(module)).toBe(module)
  })
})
