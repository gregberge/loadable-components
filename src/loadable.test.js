/* eslint-disable react/prop-types */
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { mount } from 'enzyme'
import Dummy from './__fixtures__/Dummy'
import loadable from './loadable'

describe('#loadable', () => {
  let Loadable

  beforeEach(() => {
    Loadable = loadable(() => import('./__fixtures__/Dummy'))
  })

  it('should load component using import', async () => {
    const wrapper = mount(<Loadable />)
    expect(wrapper.find('EmptyComponent').exists()).toBe(true)
    await Loadable.load()
    expect(wrapper.contains(<Dummy />)).toBe(true)
  })

  it('should render it directly if component is already loaded', async () => {
    await Loadable.load()
    const wrapper = mount(<Loadable />)
    expect(wrapper.contains(<Dummy />)).toBe(true)
  })

  it('should do nothing if component is not mounted', async () => {
    const wrapper = mount(<Loadable />)
    wrapper.unmount()
    await Loadable.load()
  })

  describe('server-side', () => {
    let windowBackup

    beforeEach(() => {
      windowBackup = global.window
      delete global.window
    })

    afterEach(() => {
      global.window = windowBackup
    })

    it('should ignore loading', async () => {
      expect(renderToStaticMarkup(<Loadable />)).toBe('')
      await Loadable.load()
      expect(renderToStaticMarkup(<Loadable />)).toBe('<div></div>')
    })
  })

  it('should be possible to add a loading component', async () => {
    const LoadableWithLoading = loadable(() => import('./__fixtures__/Dummy'), {
      LoadingComponent: ({ className }) =>
        <div className={className}>loading</div>,
    })

    const wrapper = mount(<LoadableWithLoading className="x" />)
    expect(wrapper.contains(<div className="x">loading</div>)).toBe(true)
    await LoadableWithLoading.load()
    expect(wrapper.contains(<Dummy className="x" />)).toBe(true)
  })

  it('should be possible to add an error component', async () => {
    const LoadableWithError = loadable(
      async () => {
        throw new Error('Bouh')
      },
      {
        ErrorComponent: ({ error, props }) =>
          <div className={props.className}>{error.message}</div>,
      },
    )

    const wrapper = mount(<LoadableWithError className="x" />)
    expect(wrapper.find('EmptyComponent').exists()).toBe(true)
    try {
      await new Promise(resolve => setTimeout(resolve))
      await LoadableWithError.load()
    } catch (error) {
      expect(wrapper.contains(<div className="x">Bouh</div>)).toBe(true)
    }
  })
})
