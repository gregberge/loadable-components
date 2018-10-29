/* eslint-disable react/no-danger */
import React from 'react'
import {
  DEFAULT_LOADABLE_STATE_KEY,
  DATA_LOADABLE_CHUNK,
  invariant,
} from './sharedInternals'
import LoadableStateManager from './LoadableStateManager'

class LoadableState {
  constructor(manifest) {
    this.chunks = []
    this.prefetchedChunks = []
    this.manifest = manifest
  }

  addPrefetchedChunk(chunk) {
    if (this.prefetchedChunks.indexOf(chunk) !== -1) return
    this.prefetchedChunks.push(chunk)
  }

  addChunk(chunk) {
    if (this.chunks.indexOf(chunk) !== -1) return
    this.chunks.push(chunk)
  }

  collectChunks(app) {
    return <LoadableStateManager state={this}>{app}</LoadableStateManager>
  }

  getChunks() {
    return this.chunks
  }

  getScriptContent() {
    return `window.${DEFAULT_LOADABLE_STATE_KEY} = ${JSON.stringify(
      this.getChunks(),
    )};`
  }

  getChunkAsset(chunk) {
    const asset = this.manifest[chunk]
    invariant(asset, `cannot find ${chunk} in manifest`)
    return asset
  }

  getScriptTags() {
    if (this.manifest) {
      return this.chunks
        .map(
          chunk =>
            `<script ${DATA_LOADABLE_CHUNK}="${chunk}" src="${this.getChunkAsset(
              chunk,
            )}"></script>`,
        )
        .join('\n')
    }

    return `<script>${this.getScriptContent()}</script>`
  }

  getScriptElements() {
    if (this.prefetchMode) {
      return this.chunks.map(chunk => {
        const props = {
          src: this.getChunkAsset(chunk),
          [DATA_LOADABLE_CHUNK]: chunk,
        }
        return <script key={chunk} {...props} />
      })
    }

    return [
      <script
        key="state"
        dangerouslySetInnerHTML={{ __html: this.getScriptContent() }}
      />,
    ]
  }

  getPrefetchTags() {
    invariant(
      this.manifest,
      '`getPrefetchScriptTags()` requires static mode, please specify a manifest',
    )

    return this.prefetchedChunks
      .map(
        chunk =>
          `<link rel="preload" as="script" href="${this.getChunkAsset(
            chunk,
          )}">`,
      )
      .join('\n')
  }

  getPrefetchElements() {
    invariant(
      this.manifest,
      '`getPrefetchElements()` requires static mode, please specify a manifest',
    )

    return this.prefetchedChunks
      .map(chunk => (
        <link
          key={chunk}
          rel="preload"
          as="script"
          href={this.getChunkAsset(chunk)}
        />
      ))
      .join('\n')
  }
}

export default LoadableState
