import React from 'react'
import { hydrate } from 'react-dom'
// eslint-disable-next-line import/no-extraneous-dependencies
import { loadableReady } from '@loadable/component'
import App from './App'

loadableReady(() => {
  const root = document.getElementById('main')
  hydrate(<App />, root)
})
