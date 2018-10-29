/* eslint-disable no-use-before-define, react/no-multi-comp */
import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { invariant } from './util'
import Context from './Context'

function resolveConstructor(ctor) {
  if (typeof ctor === 'function') {
    return { requireAsync: ctor }
  }

  return ctor
}

function loadable(
  loadableConstructor,
  {
    ErrorComponent = ({ error }) => `${error.message}`,
    LoadingComponent = () => null,
    render,
    suspense,
  } = {},
) {
  const ctor = resolveConstructor(loadableConstructor)

  function resolveComponent(result) {
    const Component = result.default || result
    hoistNonReactStatics(Loadable, Component, {
      prefetch: true,
      Prefetch: true,
    })
    return Component
  }

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

  const Prefetch = props => (
    <Context.Consumer>
      {loadableState => (
        <InnerPrefetch loadableState={loadableState} {...props} />
      )}
    </Context.Consumer>
  )

  class InnerLoadable extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        Component: null,
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
      if (!this.state.Component || !this.state.error) {
        this.loadAsync()
      }
    }

    loadSync() {
      try {
        const result = ctor.requireSync(this.props)
        this.state.Component = resolveComponent(result)
        this.state.loading = false
      } catch (error) {
        this.state.error = error
      }
    }

    loadAsync() {
      ctor
        .requireAsync(this.props)
        .then(result => {
          this.setState({ Component: resolveComponent(result), loading: false })
        })
        .catch(error => {
          this.setState({ error, loading: false })
        })
    }

    render() {
      const { Component, error } = this.state

      if (typeof render === 'function') {
        return render({
          ...this.state,
          ownProps: this.props,
        })
      }

      if (Component !== null) {
        return <Component {...this.props} />
      }

      if (error !== null) {
        return <ErrorComponent error={error} {...this.props} />
      }

      if (suspense) {
        throw this.loadingPromise
      }

      return <LoadingComponent {...this.props} />
    }
  }

  const Loadable = props => (
    <Context.Consumer>
      {loadableState => (
        <InnerLoadable loadableState={loadableState} {...props} />
      )}
    </Context.Consumer>
  )

  Loadable.Prefetch = Prefetch
  Loadable.prefetch = prefetch

  return Loadable
}

export default loadable
