/* eslint-disable react/no-danger */
import React from 'react'
import { shallow } from 'enzyme'
import DeferredState from './DeferredState'

describe('DeferredState', () => {
  let deferredState

  beforeEach(() => {
    deferredState = new DeferredState({
      children: [{ id: './Foo' }, { id: './Bar' }],
    })
  })

  describe('#getScriptContent', () => {
    it('should return script content', () => {
      expect(deferredState.getScriptContent()).toBe(
        'window.__LOADABLE_STATE__ = {"children":[{"id":"./Foo"},{"id":"./Bar"}]};',
      )
    })
  })

  describe('#getScriptTag', () => {
    it('should return script content', () => {
      expect(deferredState.getScriptTag()).toBe(
        '<script>window.__LOADABLE_STATE__ = {"children":[{"id":"./Foo"},{"id":"./Bar"}]};</script>',
      )
    })
  })

  describe('#getScriptElement', () => {
    it('should return script content', () => {
      expect(
        shallow(deferredState.getScriptElement()).equals(
          <script
            dangerouslySetInnerHTML={{
              __html:
                'window.__LOADABLE_STATE__ = {"children":[{"id":"./Foo"},{"id":"./Bar"}]};',
            }}
          />,
        ),
      ).toBe(true)
    })
  })
})
