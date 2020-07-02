/* eslint-disable no-use-before-define, react/no-multi-comp, no-underscore-dangle */
import React from 'react'
import * as ReactIs from 'react-is'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { invariant } from './util'
import Context from './Context'
import { LOADABLE_SHARED } from './shared'

function resolveConstructor(ctor) {
  if (typeof ctor === 'function') {
    return { requireAsync: ctor }
  }

  return ctor
}

const withChunkExtractor = Component => props => (
  <Context.Consumer>
    {extractor => <Component __chunkExtractor={extractor} {...props} />}
  </Context.Consumer>
)

const identity = v => v

function createLoadable({
  defaultResolveComponent = identity,
  render,
  onLoad,
}) {
  function loadable(loadableConstructor, options = {}) {
    const ctor = resolveConstructor(loadableConstructor)
    const cache = {}
    function getCacheKey(props) {
      if (options.cacheKey) {
        return options.cacheKey(props)
      }
      if (ctor.resolve) {
        return ctor.resolve(props)
      }
      return null
    }

    function resolve(module, props, Loadable) {
      const Component = options.resolveComponent
        ? options.resolveComponent(module, props)
        : defaultResolveComponent(module)
      if (options.resolveComponent && !ReactIs.isValidElementType(Component)) {
        throw new Error(
          `resolveComponent returned something that is not a React component!`,
        )
      }
      hoistNonReactStatics(Loadable, Component, {
        preload: true,
      })
      return Component
    }

    class InnerLoadable extends React.Component {
      static getDerivedStateFromProps(props, state) {
        const cacheKey = getCacheKey(props)
        return {
          ...state,
          cacheKey,
          loading: state.loading || state.cacheKey !== cacheKey,
        }
      }

      constructor(props) {
        super(props)

        this.state = {
          result: null,
          error: null,
          loading: true,
          cacheKey: getCacheKey(props),
        }

        this.promise = null

        invariant(
          !props.__chunkExtractor || ctor.requireSync,
          'SSR requires `@loadable/babel-plugin`, please install it',
        )

        // Server-side
        if (props.__chunkExtractor) {
          // This module has been marked with no SSR
          if (options.ssr === false) {
            return
          }

          // We run load function, we assume that it won't fail and that it
          // triggers a synchronous loading of the module
          ctor.requireAsync(props).catch(() => {})

          // So we can require now the module synchronously
          this.loadSync()

          props.__chunkExtractor.addChunk(ctor.chunkName(props))
          return
        }

        // Client-side with `isReady` method present (SSR probably)
        // If module is already loaded, we use a synchronous loading
        // Only perform this synchronous loading if the component has not
        // been marked with no SSR, else we risk hydration mismatches
        if (
          options.ssr !== false &&
          // is ready - was loaded in this session
          ((ctor.isReady && ctor.isReady(props)) ||
            // is ready - was loaded during SSR process
            (ctor.chunkName &&
              LOADABLE_SHARED.initialChunks[ctor.chunkName(props)]))
        ) {
          this.loadSync()
        }
      }

      componentDidMount() {
        this.mounted = true

        if (this.state.loading) {
          this.loadAsync()
        } else if (!this.state.error) {
          this.triggerOnLoad()
        }
      }

      componentDidUpdate(prevProps, prevState) {
        // Component is reloaded if the cacheKey has changed
        if (prevState.cacheKey !== this.state.cacheKey) {
          this.promise = null
          this.loadAsync()
        }
      }

      componentWillUnmount() {
        this.mounted = false
      }

      safeSetState(nextState, callback) {
        if (this.mounted) {
          this.setState(nextState, callback)
        }
      }

      triggerOnLoad() {
        if (onLoad) {
          setTimeout(() => {
            onLoad(this.state.result, this.props)
          })
        }
      }

      loadSync() {
        if (!this.state.loading) return

        try {
          const loadedModule = ctor.requireSync(this.props)
          const result = resolve(loadedModule, this.props, Loadable)
          this.state.result = result
          this.state.loading = false
        } catch (error) {
          this.state.error = error
        }
      }

      getCacheKey() {
        return getCacheKey(this.props) || JSON.stringify(this.props)
      }

      getCache() {
        return cache[this.getCacheKey()]
      }

      setCache(value) {
        cache[this.getCacheKey()] = value
      }

      loadAsync() {
        if (!this.promise) {
          const { __chunkExtractor, forwardedRef, ...props } = this.props
          this.promise = ctor
            .requireAsync(props)
            .then(loadedModule => {
              const result = resolve(loadedModule, this.props, Loadable)
              if (options.suspense) {
                this.setCache(result)
              }
              this.safeSetState(
                {
                  result: resolve(loadedModule, this.props, Loadable),
                  loading: false,
                },
                () => this.triggerOnLoad(),
              )
            })
            .catch(error => {
              this.safeSetState({ error, loading: false })
            })
        }

        return this.promise
      }

      render() {
        const {
          forwardedRef,
          fallback: propFallback,
          __chunkExtractor,
          ...props
        } = this.props
        const { error, loading, result } = this.state

        if (options.suspense) {
          const cachedResult = this.getCache()
          if (!cachedResult) throw this.loadAsync()
          return render({
            loading: false,
            fallback: null,
            result: cachedResult,
            options,
            props: { ...props, ref: forwardedRef },
          })
        }

        if (error) {
          throw error
        }

        const fallback = propFallback || options.fallback || null

        if (loading) {
          return fallback
        }

        return render({
          loading,
          fallback,
          result,
          options,
          props: { ...props, ref: forwardedRef },
        })
      }
    }

    const EnhancedInnerLoadable = withChunkExtractor(InnerLoadable)
    const Loadable = React.forwardRef((props, ref) => (
      <EnhancedInnerLoadable forwardedRef={ref} {...props} />
    ))

    // In future, preload could use `<link rel="preload">`
    Loadable.preload = props => {
      ctor.requireAsync(props)
    }

    Loadable.load = props => ctor.requireAsync(props)

    return Loadable
  }

  function lazy(ctor, options) {
    return loadable(ctor, { ...options, suspense: true })
  }

  return { loadable, lazy }
}

export default createLoadable
