/* eslint-env browser */
import ReactDOM from 'react-dom'
import React from 'react'
import { loadComponents } from 'loadable-components'
import App from './App'

loadComponents().then(() => {
  ReactDOM.hydrate(<App />, document.getElementById('root'))
})
