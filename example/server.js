import React from 'react'
import ReactDOMServer from 'react-dom/server'
import express from 'express'
import { getLoadableState } from 'loadable-components/server'
import App from './App'

const app = express()

app.get('/', async (req, res) => {
  try {
    const reactApp = <App />
    const loadableState = await getLoadableState(reactApp)
    const html = ReactDOMServer.renderToString(reactApp)
    res.send(`<!DOCTYPE html>
  <html>
    <body>
      <div id="root">${html}</div>
      ${loadableState.getScriptTag()}
      <script src="bundle.js"></script>
    </body>
  </html>`)
  } catch (err) {
    res.status(500)
    res.send(err)
  }
})

app.listen(3000, () => console.log('http://localhost:3000'))
