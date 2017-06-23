/* eslint-disable react/no-danger */
import React from 'react'
import { shallow } from 'enzyme'
import DeferredState from './DeferredState'

describe('DeferredState', () => {
  let deferredState

  beforeEach(() => {
    deferredState = new DeferredState([0, 1, 2])
  })

  describe('#getScriptContent', () => {
    it('should return script content', () => {
      expect(deferredState.getScriptContent()).toBe(
        'window.__DEFER_COMPONENT_IDS__ = [0,1,2];',
      )
    })
  })

  describe('#getScriptTag', () => {
    it('should return script content', () => {
      expect(deferredState.getScriptTag()).toBe(
        '<script>window.__DEFER_COMPONENT_IDS__ = [0,1,2];</script>',
      )
    })
  })

  describe('#getScriptElement', () => {
    it('should return script content', () => {
      expect(
        shallow(deferredState.getScriptElement()).equals(
          <script
            dangerouslySetInnerHTML={{
              __html: 'window.__DEFER_COMPONENT_IDS__ = [0,1,2];',
            }}
          />,
        ),
      ).toBe(true)
    })
  })
})
