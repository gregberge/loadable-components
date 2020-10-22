import 'core-js'
import React from 'react'
import { hydrate } from 'react-dom'
import { loadableReady } from '@loadable/component'
import App from './App.tsx'

console.log('waiting for application ready...')
loadableReady(() => {
  console.log('application is ready...')
  const root = document.getElementById('main')
  hydrate(<App />, root)
})
