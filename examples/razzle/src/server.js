import path from 'path'
import React from 'react'
import express from 'express'
import { html as htmlTemplate, oneLineTrim } from 'common-tags'
import { renderToString } from 'react-dom/server'
import { ServerLocation } from '@reach/router'
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server'
import App from './App'

const server = express()
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const extractor = new ChunkExtractor({
      statsFile: path.resolve('build/loadable-stats.json'),
      entrypoints: ['client'],
    })

    const html = renderToString(
      <ChunkExtractorManager extractor={extractor}>
        <ServerLocation url={req.url}>
          <App />
        </ServerLocation>
      </ChunkExtractorManager>,
    )

    res.status(200).send(
      oneLineTrim(htmlTemplate`
      <!doctype html>
      <html lang="">
        <head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet='utf-8' />
          <title>Welcome to Razzle</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          ${extractor.getLinkTags()}
          ${extractor.getStyleTags()}
        </head>
        <body>
          <div id="root">${html}</div>
          ${extractor.getScriptTags()}
        </body>
      </html>
    `),
    )
  })

export default server
