/* eslint-disable import/prefer-default-export */
import vm from 'vm'

const WEBPACK_IGNORE_REGEXP = /webpackIgnore/
const WEBPACK_CHUNK_NAME_REGEXP = /webpackChunkName/

export function getImportArg(callPath) {
  return callPath.get('arguments.0')
}

export function hasWebpackIgnore(importArg) {
  if (!importArg.has('leadingComments')) return null

  return !!importArg
    .get('leadingComments')
    .find(comment => {
      return comment.node.value.match(WEBPACK_IGNORE_REGEXP)
    })
}


function readWebpackCommentValues(str) {
  try {
    const values = vm.runInNewContext(`(function(){return {${str}};})()`)
    return values
  } catch (e) {
    throw Error(`compilation error while processing: /*${str}*/: ${e.message}`)
  }
}

export function getChunkNameComment(importArg) {
  if (!importArg.has('leadingComments')) return null
  return importArg
    .get('leadingComments')
    .find(comment => comment.node.value.match(WEBPACK_CHUNK_NAME_REGEXP))
}

export function getRawChunkNameFromCommments(importArg) {
  const chunkNameComment = getChunkNameComment(importArg)
  if (!chunkNameComment) return null
  return readWebpackCommentValues(chunkNameComment.node.value)
}