/* eslint-disable import/no-extraneous-dependencies, react/no-multi-comp */
import 'regenerator-runtime/runtime'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, cleanup, wait } from '@testing-library/react'
import loadable, { lazy } from './index'

afterEach(cleanup)

function createLoadFunction() {
  const ref = {}
  const fn = jest.fn(() => ref.promise)
  ref.promise = new Promise((resolve, reject) => {
    fn.resolve = resolve
    fn.reject = reject
  })
  return fn
}

class Catch extends React.Component {
  state = { error: false }

  static getDerivedStateFromError() {
    return { error: true }
  }

  render() {
    return this.state.error ? 'error' : this.props.children
  }
}

describe('#loadable', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    // eslint-disable-next-line no-console
    console.error.mockRestore()
  })

  it('renders nothing without a fallback', () => {
    const load = createLoadFunction()
    const Component = loadable(load)
    const { container } = render(<Component />)
    expect(container).toBeEmpty()
  })

  it('uses option fallback if specified', () => {
    const load = createLoadFunction()
    const Component = loadable(load, { fallback: 'progress' })
    const { container } = render(<Component />)
    expect(container).toHaveTextContent('progress')
  })

  it('uses props fallback if specified', () => {
    const load = createLoadFunction()
    const Component = loadable(load)
    const { container } = render(<Component fallback="progress" />)
    expect(container).toHaveTextContent('progress')
  })

  it('should use props fallback instead of option fallback if specified', () => {
    const load = createLoadFunction()
    const Component = loadable(load, { fallback: 'opt fallback' })
    const { container } = render(<Component fallback="prop fallback" />)
    expect(container).toHaveTextContent('prop fallback')
  })

  it('mounts component when loaded', async () => {
    const load = createLoadFunction()
    const Component = loadable(load)
    const { container } = render(<Component />)
    expect(container).toBeEmpty()
    load.resolve({ default: () => 'loaded' })
    await wait(() => expect(container).toHaveTextContent('loaded'))
  })

  it('supports preload', async () => {
    const load = createLoadFunction()
    const Component = loadable(load)
    expect(load).not.toHaveBeenCalled()
    Component.preload({ foo: 'bar' })
    expect(load).toHaveBeenCalledWith({ foo: 'bar' })
    expect(load).toHaveBeenCalledTimes(1)
    const { container } = render(<Component />)
    expect(container).toBeEmpty()
    load.resolve({ default: () => 'loaded' })
    await wait(() => expect(container).toHaveTextContent('loaded'))
    expect(load).toHaveBeenCalledTimes(2)
  })

  it('supports commonjs default export', async () => {
    const load = createLoadFunction()
    const Component = loadable(load)
    const { container } = render(<Component />)
    load.resolve(() => 'loaded')
    await wait(() => expect(container).toHaveTextContent('loaded'))
  })

  it('supports non-default export via resolveComponent', async () => {
    const load = createLoadFunction()
    const importedModule = { exported: () => 'loaded' }
    const resolveComponent = jest.fn(({ exported: component }) => component)
    const Component = loadable(load, {
      resolveComponent,
    })
    const { container } = render(<Component someProp="123" />)
    load.resolve(importedModule)
    await wait(() => expect(container).toHaveTextContent('loaded'))
    expect(resolveComponent).toHaveBeenCalledWith(importedModule, {
      someProp: '123',
      __chunkExtractor: undefined,
      forwardedRef: null,
    })
  })

  it('forwards props', async () => {
    const load = createLoadFunction()
    const Component = loadable(load)
    const { container } = render(<Component name="James Bond" />)
    load.resolve({ default: ({ name }) => name })
    await wait(() => expect(container).toHaveTextContent('James Bond'))
  })

  it('should update component if props change', async () => {
    const load = createLoadFunction()
    const Component = loadable(load)
    const { container } = render(<Component value="first" />)
    load.resolve({ default: ({ value }) => value })
    await wait(() => expect(container).toHaveTextContent('first'))
    render(<Component value="second" />, { container })
    await wait(() => expect(container).toHaveTextContent('second'))
    expect(load).toHaveBeenCalledTimes(1)
  })

  it('calls load func if cacheKey change', async () => {
    const load = createLoadFunction()
    const Component = loadable(load, { cacheKey: ({ value }) => value })
    const { container } = render(<Component value="first" />)
    load.resolve({ default: ({ value }) => value })
    await wait(() => expect(container).toHaveTextContent('first'))
    expect(load).toHaveBeenCalledTimes(1)
    render(<Component value="second" />, { container })
    await wait(() => expect(container).toHaveTextContent('second'))
    expect(load).toHaveBeenCalledTimes(2)
  })

  it('calls load func if resolve change', async () => {
    const load = createLoadFunction()
    const Component = loadable({
      requireAsync: load,
      resolve: ({ value }) => value,
    })
    const { container } = render(<Component value="first" />)
    load.resolve({ default: ({ value }) => value })
    await wait(() => expect(container).toHaveTextContent('first'))
    expect(load).toHaveBeenCalledTimes(1)
    render(<Component value="second" />, { container })
    await wait(() => expect(container).toHaveTextContent('second'))
    expect(load).toHaveBeenCalledTimes(2)
  })

  it('does not call previous component if cacheKey change', async () => {
    const A = jest.fn(({ id }) => `A-${id}`)
    const B = jest.fn(({ id }) => `B-${id}`)
    const components = { A, B }
    const load = jest.fn(async ({ name }) => {
      const Component = components[name]
      return { default: Component }
    })
    const Component = loadable(load, { cacheKey: ({ name }) => name })
    const { container } = render(<Component name="A" id={0} />)
    await wait(() => expect(container).toHaveTextContent('A-0'))
    expect(load).toHaveBeenCalledTimes(1)
    expect(load).toHaveBeenCalledWith({ name: 'A', id: 0 })
    expect(A).toHaveBeenCalledTimes(1)
    expect(A).toHaveBeenCalledWith({ name: 'A', id: 0 }, {})
    render(<Component name="A" id={1} />, { container })
    await wait(() => expect(container).toHaveTextContent('A-1'))
    expect(A).toHaveBeenCalledTimes(2)
    expect(A).toHaveBeenCalledWith({ name: 'A', id: 1 }, {})
    render(<Component name="B" id={2} />, { container })
    await wait(() => expect(container).toHaveTextContent('B-2'))
    expect(load).toHaveBeenCalledTimes(2)
    expect(load).toHaveBeenCalledWith({ name: 'B', id: 2 })
    expect(B).toHaveBeenCalledTimes(1)
    expect(B).toHaveBeenCalledWith({ name: 'B', id: 2 }, {})

    // A should not have been rendered with "id: 2"
    expect(A).toHaveBeenCalledTimes(2)
  })

  it('forwards ref', async () => {
    const load = createLoadFunction()
    const Component = loadable(load)
    const ref = React.createRef()
    render(<Component ref={ref} />)
    load.resolve({
      default: React.forwardRef((props, fref) => <div {...props} ref={fref} />),
    })
    await wait(() => expect(ref.current.tagName).toBe('DIV'))
  })

  it('throws when an error occurs', async () => {
    const load = createLoadFunction()
    const Component = loadable(load)
    const { container } = render(
      <Catch>
        <Component />
      </Catch>,
    )
    expect(container).toBeEmpty()
    load.reject(new Error('boom'))
    await wait(() => expect(container).toHaveTextContent('error'))
  })
})

describe('#lazy', () => {
  it('supports Suspense', async () => {
    const load = createLoadFunction()
    const Component = lazy(load)
    const { container } = render(
      <React.Suspense fallback="progress">
        <Component />
      </React.Suspense>,
    )
    expect(container).toHaveTextContent('progress')
    load.resolve({ default: () => 'loaded' })
    await wait(() => expect(container).toHaveTextContent('loaded'))
  })
})

describe('#loadable.lib', () => {
  it('loads library as render prop', async () => {
    const load = createLoadFunction()
    const Lib = loadable.lib(load)
    const renderFn = jest.fn(() => 'loaded')
    const { container } = render(<Lib>{renderFn}</Lib>)
    expect(container).toBeEmpty()
    const library = { it: 'is', a: 'lib' }
    load.resolve(library)
    await wait(() => expect(container).toHaveTextContent('loaded'))
    expect(renderFn).toHaveBeenCalledWith(library)
  })
})

describe('#lazy.lib', () => {
  it('supports Suspense', async () => {
    const load = createLoadFunction()
    const Lib = lazy.lib(load)
    const renderFn = jest.fn(() => 'loaded')
    const { container } = render(
      <React.Suspense fallback="progress">
        <Lib>{renderFn}</Lib>
      </React.Suspense>,
    )
    expect(container).toHaveTextContent('progress')
    const library = { it: 'is', a: 'lib' }
    load.resolve(library)
    await wait(() => expect(container).toHaveTextContent('loaded'))
    expect(container).toHaveTextContent('loaded')
  })
})
