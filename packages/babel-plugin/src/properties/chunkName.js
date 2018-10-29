import vm from 'vm'
import { getImportArg } from '../util'

const WEBPACK_CHUNK_NAME_REGEXP = /webpackChunkName/

function readWebpackChunkNameValue(value) {
  // try compile only if webpack options comment is present
  try {
    const val = vm.runInNewContext(`(function(){return {${value}};})()`)
    return val.webpackChunkName
  } catch (e) {
    throw Error(
      `compilation error while processing: /*${value}*/: ${e.message}`,
    )
  }
}

function getChunkNameComment(importArg) {
  if (!importArg.has('leadingComments')) return null
  return importArg
    .get('leadingComments')
    .find(comment => comment.node.value.match(WEBPACK_CHUNK_NAME_REGEXP))
}

function getRawChunkNameFromCommments(importArg) {
  const chunkNameComment = getChunkNameComment(importArg)
  if (!chunkNameComment) return null
  return readWebpackChunkNameValue(chunkNameComment.node.value)
}

function moduleToChunk(str) {
  return str ? str.replace(/^[./]+|(\.js$)/g, '') : ''
}

function replaceQuasiValue(str) {
  return str ? str.replace(/\//g, '-') : str
}

export default function chunkNameProperty({ types: t }) {
  function transformQuasi(quasi, index) {
    if (index === 0) {
      return t.templateElement(
        {
          raw: moduleToChunk(quasi.value.raw),
          cooked: moduleToChunk(quasi.value.cooked),
        },
        quasi.tail,
      )
    }

    return t.templateElement(
      {
        raw: replaceQuasiValue(quasi.value.raw),
        cooked: replaceQuasiValue(quasi.value.cooked),
      },
      quasi.tail,
    )
  }

  function generateChunkName(callPath) {
    const importArg = getImportArg(callPath)
    if (importArg.isTemplateLiteral()) {
      return t.templateLiteral(
        importArg.node.quasis.map(transformQuasi),
        importArg.node.expressions,
      )
    }
    return t.stringLiteral(importArg.node.value.replace(/^\.\//, ''))
  }

  function getExistingChunkName(callPath) {
    const importArg = getImportArg(callPath)
    const chunkName = getRawChunkNameFromCommments(importArg)
    if (!chunkName) return null
    return t.stringLiteral(chunkName)
  }

  function isAgressiveImport(callPath) {
    const importArg = getImportArg(callPath)
    return (
      importArg.isTemplateLiteral() && importArg.node.expressions.length > 0
    )
  }

  function addChunkNameComment(callPath, chunkName) {
    const importArg = getImportArg(callPath)
    const chunkNameComment = getChunkNameComment(importArg)
    if (chunkNameComment) {
      chunkNameComment.remove()
    }

    if (isAgressiveImport(callPath)) {
      importArg.addComment('leading', ' webpackChunkName: "[request]" ')
      return
    }

    const value = t.isTemplateLiteral(chunkName)
      ? chunkName.quasis[0].value.cooked
      : chunkName.value

    importArg.addComment('leading', ` webpackChunkName: "${value}" `)
  }

  return ({ callPath, funcPath }) => {
    let chunkName
    const agressiveImport = isAgressiveImport(callPath)
    if (!agressiveImport) {
      chunkName = getExistingChunkName(callPath)
    }
    if (!chunkName) {
      chunkName = generateChunkName(callPath)
      addChunkNameComment(callPath, chunkName)
    }

    return t.objectMethod(
      'method',
      t.identifier('chunkName'),
      funcPath.node.params,
      t.blockStatement([t.returnStatement(chunkName)]),
    )
  }
}
