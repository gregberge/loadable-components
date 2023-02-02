import path from 'path'
import React from 'react'

import { loadableEvents } from '@loadable/component'
import { renderToString } from 'react-dom/server'
import { ChunkExtractor } from '@loadable/server'

const nodeStats = path.resolve(
  __dirname,
  '../public/dist/node/loadable-stats.json',
)

const webStats = path.resolve(
  __dirname,
  '../public/dist/web/loadable-stats.json',
)

const eventsMock = jest.fn()

const renderEntrypoint = entrypoint => {
  const nodeExtractor = new ChunkExtractor({
    statsFile: nodeStats,
    entrypoints: [entrypoint || 'main'],
  })

  const { default: App } = nodeExtractor.requireEntrypoint(entrypoint || 'main')

  const webExtractor = new ChunkExtractor({
    statsFile: webStats,
    entrypoints: [entrypoint || 'main'],
  })
  const jsx = webExtractor.collectChunks(<App />)

  const html = renderToString(jsx)

  return { nodeExtractor, webExtractor, html }
}

describe('rendertest', () => {
  beforeAll(() => {
    loadableEvents.registerCallback(eventsMock)
  })

  describe('rennder entrypoints', () => {
    it('should render props entrypoint', () => {
      const result = renderEntrypoint('props')
      expect(result.html).toMatchInlineSnapshot(`"<div>A<br/>F</div>"`)
    })
    expect(eventsMock.toHaveBeenCalled)
  })
})
