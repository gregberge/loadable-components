import 'core-js'
import React from 'react'
import { hydrateRoot } from 'react-dom/client'
// eslint-disable-next-line import/no-extraneous-dependencies
import { loadableReady } from '@loadable/component'
import App from './App'

loadableReady(() => {
  const el = document.getElementById('main');
  hydrateRoot(el, <App />);
})
