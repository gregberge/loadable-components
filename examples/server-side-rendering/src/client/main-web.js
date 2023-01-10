import 'core-js'
import React from 'react'
import { hydrate } from 'react-dom'
// eslint-disable-next-line import/no-extraneous-dependencies
import { loadableReady } from '@loadable/component'
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
