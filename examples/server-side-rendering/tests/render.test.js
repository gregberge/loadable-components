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

  describe('render entrypoints', () => {
    it('should render props entrypoint', () => {
      const result = renderEntrypoint('props')
      expect(result.html).toMatchInlineSnapshot(`"<div>A<br/>F</div>"`)
      expect(result.webExtractor.getScriptTags()).toMatchInlineSnapshot(`
        "<script id=\\"__LOADABLE_REQUIRED_CHUNKS__\\" type=\\"application/json\\">[\\"vendors~letters-A~letters-B~moment\\",\\"letters-A\\",\\"letters-F\\"]</script><script id=\\"__LOADABLE_REQUIRED_CHUNKS___ext\\" type=\\"application/json\\">{\\"namedChunks\\":[\\"letters-A\\",\\"letters-F\\"]}</script>
        <script async data-chunk=\\"props\\" src=\\"/dist/web/props.js\\"></script>
        <script async data-chunk=\\"letters-A\\" src=\\"/dist/web/vendors~letters-A~letters-B~moment.js\\"></script>
        <script async data-chunk=\\"letters-A\\" src=\\"/dist/web/letters-A.js\\"></script>
        <script async data-chunk=\\"letters-F\\" src=\\"/dist/web/letters-F.js\\"></script>"
      `)
      expect(result.webExtractor.getLinkTags()).toMatchInlineSnapshot(`
        "<link data-chunk=\\"letters-A\\" rel=\\"preload\\" as=\\"style\\" href=\\"/dist/web/letters-A.css\\">
        <link data-chunk=\\"props\\" rel=\\"preload\\" as=\\"script\\" href=\\"/dist/web/props.js\\">
        <link data-chunk=\\"letters-A\\" rel=\\"preload\\" as=\\"script\\" href=\\"/dist/web/vendors~letters-A~letters-B~moment.js\\">
        <link data-chunk=\\"letters-A\\" rel=\\"preload\\" as=\\"script\\" href=\\"/dist/web/letters-A.js\\">
        <link data-chunk=\\"letters-F\\" rel=\\"preload\\" as=\\"script\\" href=\\"/dist/web/letters-F.js\\">
        <link data-parent-chunk=\\"props\\" rel=\\"preload\\" as=\\"script\\" href=\\"/dist/web/letters-C.js\\">
        <link data-parent-chunk=\\"props\\" rel=\\"prefetch\\" as=\\"script\\" href=\\"/dist/web/letters-D.js\\">"
      `)
      expect(result.webExtractor.getStyleTags()).toMatchInlineSnapshot(
        `"<link data-chunk=\\"letters-A\\" rel=\\"stylesheet\\" href=\\"/dist/web/letters-A.css\\">"`,
      )
      expect(eventsMock).toHaveBeenCalledTimes(2)
      expect(eventsMock).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'loadSync',
        }),
      )
    })
  })
})
