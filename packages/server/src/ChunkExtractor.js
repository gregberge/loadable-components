/* eslint-disable react/no-danger */
import path from 'path'
import _ from 'lodash'
import React from 'react'
import { invariant, LOADABLE_REQUIRED_CHUNKS_KEY } from './sharedInternals'
import ChunkExtractorManager from './ChunkExtractorManager'
import { smartRequire, joinURLPath } from './util'

const EXTENSION_SCRIPT_TYPES = {
  '.js': 'script',
  '.css': 'style',
}

function extensionToScriptType(extension) {
  return EXTENSION_SCRIPT_TYPES[extension] || null
}

function getAssets(chunks, getAsset) {
  return _.uniqBy(_.flatMap(chunks, chunk => getAsset(chunk)), 'url')
}

function assetToScriptTag(asset) {
  return `<script async data-chunk="${asset.chunk}" src="${
    asset.url
  }"></script>`
}

function assetToScriptElement(asset) {
  return (
    <script key={asset.url} async data-chunk={asset.chunk} src={asset.url} />
  )
}

function assetToStyleTag(asset) {
  return `<link data-chunk="${asset.chunk}" rel="stylesheet" href="${
    asset.url
  }">`
}

function assetToStyleElement(asset) {
  return (
    <link
      key={asset.url}
      data-chunk={asset.chunk}
      rel="stylesheet"
      href={asset.url}
    />
  )
}

const LINK_ASSET_HINTS = {
  mainAsset: 'data-chunk',
  childAsset: 'data-parent-chunk',
}

function assetToLinkTag(asset) {
  const hint = LINK_ASSET_HINTS[asset.type]
  return `<link ${hint}="${asset.chunk}" rel="${asset.linkType}" as="${
    asset.scriptType
  }" href="${asset.url}">`
}

function assetToLinkElement(asset) {
  const hint = LINK_ASSET_HINTS[asset.type]
  const props = {
    key: asset.url,
    [hint]: asset.chunk,
    rel: asset.linkType,
    as: asset.scriptType,
    href: asset.url,
  }
  return <link {...props} />
}

function joinTags(tags) {
  return tags.join('\n')
}

class ChunkExtractor {
  constructor({ statsFile, stats, entrypoints = ['main'] } = []) {
    this.stats = stats || smartRequire(statsFile)
    this.statsFile = statsFile
    this.entrypoints = Array.isArray(entrypoints) ? entrypoints : [entrypoints]
    this.chunks = []
  }

  resolvePublicUrl(filename) {
    const { publicPath } = this.stats
    return joinURLPath(publicPath, filename)
  }

  getChunkGroup(chunk) {
    const chunkGroup = this.stats.namedChunkGroups[chunk]
    invariant(chunkGroup, `cannot find ${chunk} in stats`)
    return chunkGroup
  }

  createChunkAsset({ filename, chunk, type, linkType }) {
    return {
      filename,
      scriptType: extensionToScriptType(path.extname(filename).toLowerCase()),
      chunk,
      url: this.resolvePublicUrl(filename),
      path: path.join(this.stats.outputPath, filename),
      type,
      linkType,
    }
  }

  getChunkAssets(chunks) {
    const one = chunk => {
      const chunkGroup = this.getChunkGroup(chunk)
      return chunkGroup.assets.map(filename =>
        this.createChunkAsset({
          filename,
          chunk,
          type: 'mainAsset',
          linkType: 'preload',
        }),
      )
    }

    if (Array.isArray(chunks)) {
      return getAssets(chunks, one)
    }

    return one(chunks)
  }

  getChunkChildAssets(chunks, type) {
    const one = chunk => {
      const chunkGroup = this.getChunkGroup(chunk)
      const assets = chunkGroup.childAssets[type] || []
      return assets.map(filename =>
        this.createChunkAsset({
          filename,
          chunk,
          type: 'childAsset',
          linkType: type,
        }),
      )
    }

    if (Array.isArray(chunks)) {
      return getAssets(chunks, one)
    }

    return one(chunks)
  }

  getChunkDependencies(chunks) {
    const one = chunk => {
      const chunkGroup = this.getChunkGroup(chunk)
      return chunkGroup.chunks
    }

    if (Array.isArray(chunks)) {
      return _.uniq(_.flatMap(chunks, one))
    }

    return one(chunks)
  }

  getRequiredChunksScriptContent() {
    return `window.${LOADABLE_REQUIRED_CHUNKS_KEY} = ${JSON.stringify(
      this.getChunkDependencies(this.chunks),
    )};`
  }

  getRequiredChunksScriptTag() {
    return `<script>${this.getRequiredChunksScriptContent()}</script>`
  }

  getRequiredChunksScriptElement() {
    return (
      <script
        key="required"
        dangerouslySetInnerHTML={{
          __html: this.getRequiredChunksScriptContent(),
        }}
      />
    )
  }

  // Public methods
  // -----------------

  // Collect

  addChunk(chunk) {
    if (this.chunks.indexOf(chunk) !== -1) return
    this.chunks.push(chunk)
  }

  collectChunks(app) {
    return <ChunkExtractorManager extractor={this}>{app}</ChunkExtractorManager>
  }

  // Utilities

  requireEntrypoint(entrypoint) {
    entrypoint = entrypoint || this.entrypoints[0]
    const assets = this.getChunkAssets(entrypoint)
    const mainAsset = assets.find(asset => asset.scriptType === 'script')
    invariant(mainAsset, 'asset not found')
    return smartRequire(mainAsset.path)
  }

  // Main assets

  getMainAssets(scriptType) {
    const chunks = [...this.chunks, ...this.entrypoints]
    const assets = this.getChunkAssets(chunks)
    if (scriptType) {
      return assets.filter(asset => asset.scriptType === scriptType)
    }
    return assets
  }

  getScriptTags() {
    const requiredScriptTag = this.getRequiredChunksScriptTag()
    const mainAssets = this.getMainAssets('script')
    const assetsScriptTags = mainAssets.map(asset => assetToScriptTag(asset))
    return joinTags([requiredScriptTag, ...assetsScriptTags])
  }

  getScriptElements() {
    const requiredScriptElement = this.getRequiredChunksScriptElement()
    const mainAssets = this.getMainAssets('script')
    const assetsScriptElements = mainAssets.map(asset =>
      assetToScriptElement(asset),
    )
    return [requiredScriptElement, ...assetsScriptElements]
  }

  getStyleTags() {
    const mainAssets = this.getMainAssets('style')
    return joinTags(mainAssets.map(asset => assetToStyleTag(asset)))
  }

  getStyleElements() {
    const mainAssets = this.getMainAssets('style')
    return mainAssets.map(asset => assetToStyleElement(asset))
  }

  // Pre assets

  getPreAssets() {
    const mainAssets = this.getMainAssets()
    const chunks = [...this.chunks, ...this.entrypoints]
    const preloadAssets = this.getChunkChildAssets(chunks, 'preload')
    const prefetchAssets = this.getChunkChildAssets(chunks, 'prefetch')
    return [...mainAssets, ...preloadAssets, ...prefetchAssets]
  }

  getLinkTags() {
    const assets = this.getPreAssets()
    const linkTags = assets.map(asset => assetToLinkTag(asset))
    return joinTags(linkTags)
  }

  getLinkElements() {
    const assets = this.getPreAssets()
    return assets.map(asset => assetToLinkElement(asset))
  }
}

export default ChunkExtractor
