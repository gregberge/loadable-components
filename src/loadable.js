/* eslint-disable react/sort-comp */
import React from 'react'
import { LOADABLE } from './constants'
import resolveModuleDefault from './utils/resolveModuleDefault'
import * as componentTracker from './componentTracker'

const EmptyComponent = () => null

function loadable(
  getComponent,
  {
    ErrorComponent = EmptyComponent,
    LoadingComponent = EmptyComponent,
    render,
    modules,
  } = {},
) {
  class LoadableComponent extends React.Component {
    static Component = null
    static loadingPromise = null

    static load() {
      if (!LoadableComponent.loadingPromise) {
        LoadableComponent.loadingPromise = getComponent()
          .then(module => {
            const Component = resolveModuleDefault(module)
            LoadableComponent.Component = Component
            return Component
          })
          .catch(error => {
            LoadableComponent.loadingPromise = null
            throw error
          })
      }

      return LoadableComponent.loadingPromise
    }

    state = {
      Component: LoadableComponent.Component,
      error: null,
      loading: true,
    }

    mounted = false

    componentWillMount() {
      if (typeof window === 'undefined' || this.state.Component !== null) return

      LoadableComponent.load()
        .then(Component => {
          this.safeSetState({ Component, loading: false })
        })
        .catch(error => {
          this.safeSetState({ error, loading: false })
        })
    }

    componentDidMount() {
      this.mounted = true
    }

    componentWillUnmount() {
      this.mounted = false
    }

    safeSetState(state) {
      if (!this.mounted) return
      this.setState(state)
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
        return <ErrorComponent error={error} ownProps={this.props} />
      }

      return <LoadingComponent {...this.props} />
    }
  }
  // development mode load every time
  if(process.env.NODE_ENV === 'development'){
    LoadableComponent.load()
  }
  LoadableComponent[LOADABLE] = () => LoadableComponent

  if (modules) {
    const id = componentTracker.track(LoadableComponent, modules)
    LoadableComponent.componentId = id
  }

  return LoadableComponent
}

export default loadable
