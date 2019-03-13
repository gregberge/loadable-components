import 'normalize.css'
import React from 'react'
import { hydrate } from 'react-dom'
import { loadableReady } from '@loadable/component'
import App from './App'

const root = document.getElementById('root')

loadableReady(() => {
  hydrate(<App />, root)
})

if (module.hot) {
  module.hot.accept()
}
