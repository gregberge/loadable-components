/* eslint-disable no-use-before-define, react/no-multi-comp */
import React from 'react'
import { invariant } from './util'
import Context from './Context'

function resolveConstructor(ctor) {
  if (typeof ctor === 'function') {
    return { requireAsync: ctor }
  }

  return ctor
}

const withLoadableState = Component => props => (
  <Context.Consumer>
    {loadableState => <Component loadableState={loadableState} {...props} />}
  </Context.Consumer>
)

const identity = v => v

function createLoadable({ resolve = identity, render }) {
  function loadable(loadableConstructor, options = {}) {
    const ctor = resolveConstructor(loadableConstructor)

    function prefetch(props) {
      ctor.requireAsync(props).catch(() => {})
    }

    class InnerPrefetch extends React.Component {
      constructor(props) {
        super(props)

        invariant(
          !props.loadableState || ctor.requireSync,
          'SSR requires `@loadable/babel`, please install it',
        )

        // Server-side
        if (props.loadableState) {
          props.loadableState.addPrefetchedChunk(ctor.chunkName(props))
        }
      }

      componentDidMount() {
        prefetch(this.props)
      }

      render() {
        return null
      }
    }

    const Prefetch = withLoadableState(InnerPrefetch)

    class InnerLoadable extends React.Component {
      constructor(props) {
        super(props)

        this.state = {
          result: null,
          error: null,
          loading: true,
        }

        invariant(
          !props.loadableState || ctor.requireSync,
          'SSR requires `@loadable/babel`, please install it',
        )

        // Server-side
        if (props.loadableState) {
          // We run load function, we assume that it won't fail and that it
          // triggers a synchronous loading of the module
          ctor.requireAsync(props).catch(() => {})

          // So we can require now the module synchronously
          this.loadSync()

          props.loadableState.addChunk(ctor.chunkName(props))
          return
        }

        // Client-side with `isReady` method present (SSR probably)
        // If module is already loaded, we use a synchronous loading
        if (ctor.isReady && ctor.isReady(props)) {
          this.loadSync()
        }
      }

      componentDidMount() {
        if (!this.state.result || !this.state.error) {
          this.loadAsync()
        }
      }

      loadSync() {
        try {
          const loadedModule = ctor.requireSync(this.props)
          this.state.result = resolve(loadedModule, { Loadable })
          this.state.loading = false
        } catch (error) {
          this.state.error = error
        }
      }

      loadAsync() {
        return ctor
          .requireAsync(this.props)
          .then(loadedModule => {
            this.setState({
              result: resolve(loadedModule, { Loadable }),
              loading: false,
            })
          })
          .catch(error => {
            this.setState({ error, loading: false })
          })
      }

      render() {
        const {
          forwardedRef: ref,
          fallback: propFallback,
          loadableState,
          ...props
        } = this.props
        const { error, loading, result } = this.state

        if (loading && options.suspense) {
          throw this.loadAsync()
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
          props: { ...props, ref },
        })
      }
    }

    const EnhancedInnerLoadable = withLoadableState(InnerLoadable)
    const Loadable = React.forwardRef((props, ref) => (
      <EnhancedInnerLoadable forwardedRef={ref} {...props} />
    ))
    Loadable.Prefetch = Prefetch
    Loadable.prefetch = prefetch

    return Loadable
  }

  function lazy(ctor, options) {
    return loadable(ctor, { ...options, suspense: true })
  }

  loadable.lazy = lazy

  return loadable
}

export default createLoadable
