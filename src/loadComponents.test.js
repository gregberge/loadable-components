/* eslint-env browser */
import { LOADABLE_STATE } from './constants'
import loadable from '.'
import * as componentTracker from './componentTracker'
import loadComponents from './loadComponents'

describe('loadComponents', () => {
  let Component1
  let Component2
  let Component3

  beforeEach(() => {
    global.console.warn = jest.fn() // hide logs
    Component1 = loadable(async () => () => null)
    jest.spyOn(Component1, 'load')
    Component2 = loadable(async () => () => null)
    jest.spyOn(Component2, 'load')
    Component3 = loadable(async () => () => null)
    jest.spyOn(Component3, 'load')
    const id1 = componentTracker.track(Component1, ['./Component1'])
    const id2 = componentTracker.track(Component2, ['./Component2'])
    const id3 = componentTracker.track(Component3, ['./Component3'])
    window[LOADABLE_STATE] = {
      children: [{ id: id1 }, { id: id2, children: [{ id: id3 }] }],
    }
  })

  it('rejects when no LOADABLE_STATE', async () => {
    delete window[LOADABLE_STATE]

    expect.assertions(1)
    try {
      await loadComponents()
    } catch (error) {
      expect(error.message).toMatch(/loadable-components state not found/)
    }
  })

  it('rejects when no component is found in componentTracker', async () => {
    window[LOADABLE_STATE] = {
      children: [{ id: null }],
    }

    expect.assertions(1)
    try {
      await loadComponents()
    } catch (error) {
      expect(error.message).toMatch(
        /loadable-components: module "null" is not found/,
      )
    }
  })

  it('rejects when found component is not a function', async () => {
    const BadComponent = -1
    const badId = componentTracker.track(BadComponent, ['./BadComponent'])
    window[LOADABLE_STATE] = {
      children: [{ id: badId }],
    }

    expect.assertions(1)
    try {
      await loadComponents()
    } catch (error) {
      expect(error.message).toMatch(
        /loadable-components: module ".\/BadComponent" is not a loadable component/,
      )
    }
  })

  it('should load all components', async () => {
    await loadComponents()
    expect(Component1.load).toHaveBeenCalled()
    expect(Component2.load).toHaveBeenCalled()
    expect(Component3.load).toHaveBeenCalled()
  })
})
