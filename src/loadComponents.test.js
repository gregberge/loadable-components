/* eslint-env browser */
import { COMPONENT_IDS } from './constants'
import loadable from './'
import * as componentTracker from './componentTracker'
import loadComponents from './loadComponents'

describe('loadComponents', () => {
  let Component1
  let Component2

  beforeEach(() => {
    Component1 = loadable(async () => () => null)
    jest.spyOn(Component1, 'load')
    Component2 = loadable(async () => () => null)
    jest.spyOn(Component2, 'load')
    const id1 = componentTracker.track(Component1)
    const id2 = componentTracker.track(Component2)
    window[COMPONENT_IDS] = [id1, id2]
  })

  it('should load all components', async () => {
    await loadComponents()
    expect(Component1.load).toHaveBeenCalled()
    expect(Component2.load).toHaveBeenCalled()
  })
})
