/* eslint-disable react/sort-comp */
import React from 'react'
import { LOADABLE } from './constants'
import resolveModuleDefault from './utils/resolveModuleDefault'
import * as componentTracker from './componentTracker'

const EmptyComponent = () => null

function loadable(
  getComponent,
  { ErrorComponent = EmptyComponent, LoadingComponent = EmptyComponent } = {},
) {
  class LoadableComponent extends React.Component {
    static Component = null

    static load() {
      return getComponent().then(module => {
        const Component = resolveModuleDefault(module)
        LoadableComponent.Component = Component
        return Component
      })
    }

    state = {
      Component: LoadableComponent.Component,
      error: null,
    }

    mounted = false

    componentWillMount() {
      if (typeof window === 'undefined' || this.state.Component !== null) return

      LoadableComponent.load()
        .then(Component => {
          this.safeSetState({ Component })
        })
        .catch(error => {
          this.safeSetState({ error })
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

      if (Component !== null) {
        return <Component {...this.props} />
      }

      if (error !== null) {
        return <ErrorComponent error={error} props={this.props} />
      }

      return <LoadingComponent {...this.props} />
    }
  }

  const id = componentTracker.track(LoadableComponent)
  LoadableComponent[LOADABLE] = () => LoadableComponent
  LoadableComponent.componentId = id

  return LoadableComponent
}

export default loadable
