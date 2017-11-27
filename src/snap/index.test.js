import { getState } from './'
import loadable from '../loadable'

describe('snap', () => {
  describe('#getState', () => {
    it('should return only loaded components', () => {
      const getComponent = jest.fn(() => import('../__fixtures__/Dummy'))
      const Loadable = loadable(getComponent)
      expect(getState()).toEqual({ __LOADABLE_COMPONENT_IDS__: [] })
      Loadable.load()
      expect(getState()).toEqual({ __LOADABLE_COMPONENT_IDS__: [0] })
    })
  })
})
