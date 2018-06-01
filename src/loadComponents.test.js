/* eslint-env browser */
import { LOADABLE_STATE } from './constants'
import loadable from './'
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
      children: [{ id: null } ]
    }

    expect.assertions(1)
    try {
      await loadComponents()
    } catch (error) {
      expect(error.message).toMatch(/loadable-components: module "null" is not found/)
    }
  })

  it('rejects when found component is not a function', async () => {
    const BadComponent = -1
    const badId = componentTracker.track(BadComponent, ['./BadComponent'])
    window[LOADABLE_STATE] = {
      children: [{ id: badId } ]
    }

    expect.assertions(1)
    try {
      await loadComponents()
    } catch (error) {
      expect(error.message).toMatch(/loadable-components: module ".\/BadComponent" is not a loadable component/)
    }
  })

  it('should load all components', async () => {
    await loadComponents()
    expect(Component1.load).toHaveBeenCalled()
    expect(Component2.load).toHaveBeenCalled()
    expect(Component3.load).toHaveBeenCalled()
  })

  it('should load all components (simulating server HMR and browser refreshed manually)', async () => {
    // Because of manually refresh browser, it resets all the state `index`es in
    // client, i.e. ./Component4 , ./Component5 & ./Component6
    const Component4 = loadable(async () => () => null)
    jest.spyOn(Component4, 'load')
    const id4 = componentTracker.track(Component4, ['./Component4'])

    const id5 = './Component5';
    const hotServerId5 = `${id5}-1`;
    const Component5 = loadable(async () => () => null)
    jest.spyOn(Component5, 'load')
    componentTracker.track(Component5, [id5])

    const id6 = './Component6';
    const hotServerId6 = `${id6}-1`;
    const Component6 = loadable(async () => () => null)
    jest.spyOn(Component6, 'load')
    componentTracker.track(Component6, [id6])

    // module states (Component5 & Component6) in server got HMR once
    // thus the `index`es should be increased by 1, i.e. ./Component5-1 &
    // ./Component6-1
    window[LOADABLE_STATE] = {
      children: [{ id: id4 }, { id: hotServerId5, children: [{ id: hotServerId6 }] }],
    }

    await loadComponents()
    expect(Component4.load).toHaveBeenCalled()
    expect(Component5.load).toHaveBeenCalled()
    expect(Component6.load).toHaveBeenCalled()
  })
})
