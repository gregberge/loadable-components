import 'core-js'
import React from 'react'
import { hydrate } from 'react-dom'
import { loadableReady } from '@loadable/component'

import './cypress_hooks'

// eslint-disable-next-line import/no-extraneous-dependencies
import App from './App'

const start = () => {
  loadableReady(() => {
    const root = document.getElementById('main')
    hydrate(<App />, root)
  })
}

if (!window.Cypress) {
  start();
}
else {
  setTimeout(() => {
    start();
  }, 1000)
}
