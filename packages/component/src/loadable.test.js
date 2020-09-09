/* eslint-disable max-classes-per-file */
/* eslint-disable import/no-extraneous-dependencies, react/no-multi-comp */
import 'regenerator-runtime/runtime'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, cleanup, wait } from '@testing-library/react'
import loadable, { lazy } from './index'

afterEach(cleanup)

const unresolvableLoad = jest.fn(() => new Promise(() => {}))

const resolvedToDefault = value =>
  jest.fn().mockResolvedValue({ default: value })

function mockDelayedResolvedValueOnce(fn, resolvedValue) {
  return fn.mockImplementationOnce(
    () =>
      new Promise(resolve => {
        setTimeout(() => resolve(resolvedValue), 1000)
      }),
  )
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

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      error: false,
      retries: props.retries || 0,
    }
  }

  componentDidCatch() {
    this.setState(prevState => ({
      error: true,
      retries: prevState.retries - 1,
    }))
  }

  render() {
    const { children, fallback } = this.props
    const { error, retries } = this.state

    if (error) {
      return (retries >= 0 && children) || fallback || null
    }

    return children || null
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
    const Component = loadable(unresolvableLoad)
    const { container } = render(<Component />)
    expect(container).toBeEmpty()
  })

  it('uses option fallback if specified', () => {
    const Component = loadable(unresolvableLoad, { fallback: 'progress' })
    const { container } = render(<Component />)
    expect(container).toHaveTextContent('progress')
  })

  it('uses props fallback if specified', () => {
    const Component = loadable(unresolvableLoad)
    const { container } = render(<Component fallback="progress" />)
    expect(container).toHaveTextContent('progress')
  })

  it('should use props fallback instead of option fallback if specified', () => {
    const Component = loadable(unresolvableLoad, { fallback: 'opt fallback' })
    const { container } = render(<Component fallback="prop fallback" />)
    expect(container).toHaveTextContent('prop fallback')
  })

  it('mounts component when loaded', async () => {
    const load = resolvedToDefault(() => 'loaded')
    const Component = loadable(load)
    const { container } = render(<Component />)
    expect(container).toBeEmpty()
    await wait(() => expect(container).toHaveTextContent('loaded'))
  })

  it('supports preload', async () => {
    const load = resolvedToDefault(() => 'loaded')
    const Component = loadable(load)
    expect(load).not.toHaveBeenCalled()
    Component.preload({ foo: 'bar' })
    expect(load).toHaveBeenCalledWith({ foo: 'bar' })
    expect(load).toHaveBeenCalledTimes(1)
    const { container } = render(<Component />)
    expect(container).toBeEmpty()
    await wait(() => expect(container).toHaveTextContent('loaded'))
    expect(load).toHaveBeenCalledTimes(2)
  })

  it('supports commonjs default export', async () => {
    const load = resolvedToDefault(() => 'loaded')
    const Component = loadable(load)
    const { container } = render(<Component />)
    await wait(() => expect(container).toHaveTextContent('loaded'))
  })

  it('supports non-default export via resolveComponent', async () => {
    const importedModule = { exported: () => 'loaded' }
    const load = jest.fn().mockResolvedValue(importedModule)
    const resolveComponent = jest.fn(({ exported: component }) => component)
    const Component = loadable(load, {
      resolveComponent,
    })
    const { container } = render(<Component someProp="123" />)

    await wait(() => expect(container).toHaveTextContent('loaded'))
    expect(resolveComponent).toHaveBeenCalledWith(importedModule, {
      someProp: '123',
      __chunkExtractor: undefined,
      forwardedRef: null,
    })
  })

  it('forwards props', async () => {
    const load = resolvedToDefault(({ name }) => name)
    const Component = loadable(load)
    const { container } = render(<Component name="James Bond" />)
    await wait(() => expect(container).toHaveTextContent('James Bond'))
  })

  it('should update component if props change', async () => {
    const load = resolvedToDefault(({ value }) => value)
    const Component = loadable(load)
    const { container } = render(<Component value="first" />)
    await wait(() => expect(container).toHaveTextContent('first'))
    render(<Component value="second" />, { container })
    await wait(() => expect(container).toHaveTextContent('second'))
    expect(load).toHaveBeenCalledTimes(1)
  })

  it('calls load func if cacheKey change', async () => {
    const load = resolvedToDefault(({ value }) => value)
    const Component = loadable(load, { cacheKey: ({ value }) => value })
    const { container } = render(<Component value="first" />)
    await wait(() => expect(container).toHaveTextContent('first'))
    expect(load).toHaveBeenCalledTimes(1)
    render(<Component value="second" />, { container })
    await wait(() => expect(container).toHaveTextContent('second'))
    expect(load).toHaveBeenCalledTimes(2)
  })

  it('calls load func if resolve change', async () => {
    const load = resolvedToDefault(({ value }) => value)
    const Component = loadable({
      requireAsync: load,
      resolve: ({ value }) => value,
    })
    const { container } = render(<Component value="first" />)
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
    const load = resolvedToDefault(
      React.forwardRef((props, fref) => <div {...props} ref={fref} />),
    )
    const Component = loadable(load)
    const ref = React.createRef()
    render(<Component ref={ref} />)
    await wait(() => expect(ref.current.tagName).toBe('DIV'))
  })

  it('throws when an error occurs', async () => {
    const load = jest.fn().mockRejectedValue(new Error('boom'))
    const Component = loadable(load)
    const { container } = render(
      <Catch>
        <Component />
      </Catch>,
    )
    expect(container).toBeEmpty()
    await wait(() => expect(container).toHaveTextContent('error'))
  })

  it('supports retry from Error Boundary', async () => {
    const load = jest
      .fn()
      .mockRejectedValueOnce(new Error('Error Boundary'))
      .mockResolvedValueOnce({ default: () => 'loaded' })

    const Component = loadable(load)
    const { container } = render(
      <ErrorBoundary fallback="error" retries={1}>
        <Component />
      </ErrorBoundary>,
    )
    expect(container).toBeEmpty()

    await wait(() => expect(container).toHaveTextContent('loaded'))
  })
})

describe('#lazy', () => {
  it('supports Suspense', async () => {
    const load = resolvedToDefault(() => 'loaded')
    const Component = lazy(load)
    const { container } = render(
      <React.Suspense fallback="progress">
        <Component />
      </React.Suspense>,
    )
    expect(container).toHaveTextContent('progress')
    await wait(() => expect(container).not.toHaveTextContent('progress'))
    expect(container).toHaveTextContent('loaded')
  })

  it('should only render both components when both resolve', async () => {
    const load = jest
      .fn()
      .mockResolvedValueOnce({ default: ({ text }) => text })

    mockDelayedResolvedValueOnce(load, { default: ({ text }) => text })

    const Component = lazy(load)

    const { container } = render(
      <React.Suspense fallback="progress">
        <>
          <Component text="A" />
          <Component text="B" />
        </>
      </React.Suspense>,
    )
    expect(container).toHaveTextContent('progress')
    await wait(() => expect(container).not.toHaveTextContent('progress'))
    expect(container.textContent).toBe('AB')
  })

  it("should render multiple elements of the same async component under contextual Suspense'", async () => {
    const load = resolvedToDefault(({ text }) => text)
    const Component = lazy(load)
    const { container } = render(
      <>
        <React.Suspense fallback="progressA">
          <Component text="A" />
        </React.Suspense>
        <React.Suspense fallback=" progressB">
          <Component text="B" />
        </React.Suspense>
      </>,
    )
    expect(container).toHaveTextContent('progressA progressB')

    await wait(() => expect(container).not.toHaveTextContent('progress'))
    expect(container).toHaveTextContent('AB')
  })

  it("shouldn't trigger nested Suspense for same lazy component", async () => {
    const load = resolvedToDefault(({ text }) => text)
    const Component = lazy(load)
    const { container } = render(
      <>
        <React.Suspense fallback="progressA">
          <Component text="A" />
          <React.Suspense fallback=" progressB">
            <Component text="B" />
          </React.Suspense>
        </React.Suspense>
      </>,
    )
    expect(container.textContent).toBe('progressA')

    await wait(() => expect(container).not.toHaveTextContent('progressA'))
    expect(container).toHaveTextContent('AB')
  })

  it('should support Error Boundary', async () => {
    const load = jest.fn().mockRejectedValue(new Error('Error Boundary'))
    const Component = lazy(load)
    const { container } = render(
      <ErrorBoundary fallback="error">
        <React.Suspense fallback="progress">
          <Component />
        </React.Suspense>
      </ErrorBoundary>,
    )
    expect(container).toHaveTextContent('progress')
    await wait(() => expect(container).toHaveTextContent('error'))
  })

  it('should support retry from Error Boundary', async () => {
    const load = jest
      .fn()
      .mockRejectedValueOnce(new Error('Error Boundary'))
      .mockResolvedValueOnce({ default: () => 'loaded' })

    const Component = lazy(load)
    const { container } = render(
      <ErrorBoundary fallback="error" retries={1}>
        <React.Suspense fallback="progress">
          <Component />
        </React.Suspense>
      </ErrorBoundary>,
    )
    expect(container).toHaveTextContent('progress')

    await wait(() => expect(container).toHaveTextContent('loaded'))
  })
})

describe('#loadable.lib', () => {
  it('loads library as render prop', async () => {
    const library = { it: 'is', a: 'lib' }
    const load = jest.fn().mockResolvedValue(library)
    const Lib = loadable.lib(load)
    const renderFn = jest.fn(() => 'loaded')
    const { container } = render(<Lib>{renderFn}</Lib>)
    expect(container).toBeEmpty()
    await wait(() => expect(container).toHaveTextContent('loaded'))
    expect(renderFn).toHaveBeenCalledWith(library)
  })
})

describe('#lazy.lib', () => {
  it('supports Suspense', async () => {
    const library = { it: 'is', a: 'lib' }
    const load = jest.fn().mockResolvedValue(library)
    const Lib = lazy.lib(load)
    const renderFn = jest.fn(() => 'loaded')
    const { container } = render(
      <React.Suspense fallback="progress">
        <Lib>{renderFn}</Lib>
      </React.Suspense>,
    )
    expect(container).toHaveTextContent('progress')
    await wait(() => expect(container).toHaveTextContent('loaded'))
  })

  it('supports Error Boundary', async () => {
    const load = jest.fn().mockRejectedValue(new Error('Error Boundary'))
    const Lib = lazy.lib(load)
    const renderFn = jest.fn(() => 'loaded')
    const { container } = render(
      <ErrorBoundary fallback="error">
        <React.Suspense fallback="progress">
          <Lib>{renderFn}</Lib>
        </React.Suspense>
      </ErrorBoundary>,
    )
    expect(container).toHaveTextContent('progress')
    await wait(() => expect(container).toHaveTextContent('error'))
  })
})
