import * as componentTracker from './componentTracker'

describe('componentTracker', () => {
  it('should be possible to track and get components', () => {
    const Component1 = () => null
    const Component2 = () => null

    const id1 = componentTracker.track(Component1, ['./Component1'])
    const id2 = componentTracker.track(Component2, ['./Component2'])

    expect(componentTracker.get(id1)).toBe(Component1)
    expect(componentTracker.get(id2)).toBe(Component2)

    expect(componentTracker.getAll()).toEqual({
      [id1]: Component1,
      [id2]: Component2,
    })
  })
})
