import 'core-js'
import React from 'react'
import { hydrate } from 'react-dom'

import { performance } from 'perf_hooks'

// eslint-disable-next-line import/no-extraneous-dependencies
import { loadableReady, loadableEvents } from '@loadable/component'
import App from './App'

const asyncChunkLoadTimeMap = new Map()
window.loadableEvents = function (event) {
}
const loadableEventsCallback = function (event) {
  if (event.type === 'startAsyncLoad') {
    asyncChunkLoadTimeMap.set(event.chunkName, performance.now())
  }
  if (event.type === 'successAsyncLoad') {
    const t0 = asyncChunkLoadTimeMap.get(event.chunkName)
    if (t0) {
      event.time = performance.now() - t0
    }
  }
  window.loadableEvents(event)
}
loadableEvents.registerCallback(loadableEventsCallback)

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
