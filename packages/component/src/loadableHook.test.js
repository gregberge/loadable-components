/* eslint-disable max-classes-per-file */
/* eslint-disable import/no-extraneous-dependencies, react/no-multi-comp */
import * as React from 'react'
import 'regenerator-runtime/runtime'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, wait } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import loadable, { lazy } from './index'

afterEach(cleanup)

const unresolvableLoad = jest.fn(() => new Promise(() => {}))

const resolvedToDefault = value =>
  jest.fn().mockResolvedValue({ default: value })

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
  
describe('#loadable.hook', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    // eslint-disable-next-line no-console
    console.error.mockRestore()
  })

  it('returns null while loading', () => {
    const useUnsolvableLoad = loadable.hook(unresolvableLoad)
    const { result } = renderHook(useUnsolvableLoad)
    expect(result.current).toEqual(null)
  })

  it('returns module when loaded', async () => {
    const load = resolvedToDefault('loaded')
    const useLoadedModule = loadable.hook(load)
    const { result } = renderHook(useLoadedModule)
    await wait(() => {
      expect(result.current).toEqual('loaded')
    })
  })

  it('supports preload', async () => {
    const load = resolvedToDefault(() => 'loaded')
    const useLoadedModule = loadable.hook(load)
    expect(load).not.toHaveBeenCalled()
    useLoadedModule.preload({ foo: 'bar' })
    expect(load).toHaveBeenCalledWith({ foo: 'bar' })
    expect(load).toHaveBeenCalledTimes(1)
  })

  it('supports non-default export', async () => {
    const importedModule = { exported: 'loaded' }
    const load = jest.fn().mockResolvedValue(importedModule)
    const useModule = loadable.hook(load, { resolveExport: module => module.exported })
    const { result } = renderHook(useModule)
    await wait(() => {
      expect(result.current).toBeTruthy()
      expect(result.current).toBe('loaded')
    })
  })

  it('supports full module export', async () => {
    const importedModule = { exported: 'loaded', default: 'default' }
    const load = jest.fn().mockResolvedValue(importedModule)
    const useModule = loadable.hook(load, { resolveExport: module => module })
    const { result } = renderHook(useModule)
    await wait(() => {
      expect(result.current).toBeTruthy()
      expect(result.current.exported).toBe('loaded')
      expect(result.current.default).toBe('default')
    })
  })

  it('calls load func if cacheKey change', async () => {
    const load = resolvedToDefault(({ value }) => value)
    const useModule = loadable.hook(load, { cacheKey: ({ value }) => value })
    const { rerender } = renderHook((props) => useModule(props), { initialProps: { value: 'first' }})
    expect(load).toHaveBeenCalledTimes(1)
    rerender({value: 'second'})
    expect(load).toHaveBeenCalledTimes(2)
    rerender({value: 'second'})
    expect(load).toHaveBeenCalledTimes(2)
  })

  it('calls load func if resolve change', async () => {
    const load = resolvedToDefault(({ value }) => value)
    const useModule = loadable.hook({
      requireAsync: load,
      resolve: ({ value }) => value,
    })
    const { rerender } = renderHook((props) => useModule(props), { initialProps: { value: 'first' } })
    await wait(() => {
      expect(load).toHaveBeenCalledTimes(1)
    })

    rerender({ value: 'second' })
    await wait(() => {
      expect(load).toHaveBeenCalledTimes(2)
    })
  })

  it('does not return previous module if cacheKey change', async () => {
    const A = 'A'
    const B = 'B'
    const components = { A, B }
    const load = jest.fn(async ({ name }) => {
      const Component = components[name]
      return { default: Component }
    })
    const useModule = loadable.hook(load, { cacheKey: ({ name }) => name })
    const { result, rerender } = renderHook((props) => useModule(props), { initialProps: { name: 'A' }})
    await wait(() => {
      expect(result.current).toEqual('A')
      expect(load).toHaveBeenCalledTimes(1)
      expect(load).toHaveBeenCalledWith({ name: 'A' })
    })
    rerender({ name: B })
    await wait(() => {
      expect(result.current).toEqual('B')
      expect(load).toHaveBeenCalledTimes(2)
      expect(load).toHaveBeenCalledWith({ name: 'B' })
    })
  })

  it('throws when an error occurs', async () => {
    const load = jest.fn().mockRejectedValue(new Error('boom'))
    const useModule = loadable.hook(load)
    const { result } = renderHook(useModule)
    await wait(() => {
      expect(result.error.message).toBe('boom')
    })
  })

  it('supports retry', async () => {
    const load = jest
      .fn()
      .mockRejectedValueOnce(new Error('boom'))
      .mockResolvedValueOnce({ default: 'loaded' })

    const useModule = loadable.hook(load)
    const { result } = renderHook(useModule)
    await wait(() => expect(result.error.message).toBe('boom'))
    const { result: remountedResult } = renderHook(useModule)
    await wait(() => expect(remountedResult.current).toBe('loaded'))
  })
})

describe('#lazy.hook', () => {
  it('supports Suspense', async () => {
    const module = { value: 'helloworld' }
    const load = jest.fn().mockResolvedValue(module)
    const useLibraryLazy = lazy.hook(load, { resolveExport: m => m.value })

    const InnerComponent = () => {
      const lib = useLibraryLazy()
      return lib || 'error'
    }
    const { container } = render(
      <React.Suspense fallback="progress">
        <InnerComponent />
      </React.Suspense>
    )
    expect(container).toHaveTextContent('progress')
    await wait(() => expect(container).toHaveTextContent('helloworld'))
  })

  it('supports Error Boundary', async () => {
    const load = jest.fn().mockRejectedValue(new Error('Error Boundary'))
    const useLibrary = lazy.hook(load)
    const InnerComponent = () => {
      useLibrary()
    }
    const { container } = render(
      <ErrorBoundary fallback="error">
        <React.Suspense fallback="progress">
          <InnerComponent />
        </React.Suspense>
      </ErrorBoundary>,
    )
    expect(container).toHaveTextContent('progress')
    await wait(() => expect(container).toHaveTextContent('error'))
  })
})
