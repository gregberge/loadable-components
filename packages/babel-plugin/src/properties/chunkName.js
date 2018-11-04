import vm from 'vm'
import { getImportArg } from '../util'

const WEBPACK_CHUNK_NAME_REGEXP = /webpackChunkName/

function readWebpackCommentValues(str) {
  try {
    const values = vm.runInNewContext(`(function(){return {${str}};})()`)
    return values
  } catch (e) {
    throw Error(`compilation error while processing: /*${str}*/: ${e.message}`)
  }
}

function writeWebpackCommentValues(values) {
  try {
    const str = Object.keys(values)
      .map(key => `${key}: ${JSON.stringify(values[key])}`)
      .join(', ')
    return ` ${str} `
  } catch (e) {
    throw Error(
      `compilation error while processing: /*${values}*/: ${e.message}`,
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
  return readWebpackCommentValues(chunkNameComment.node.value)
}

function moduleToChunk(str) {
  return str ? str.replace(/^[./]+|(\.js$)/g, '').replace(/\//, '-') : ''
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

  function generateChunkNameNode(callPath) {
    const importArg = getImportArg(callPath)
    if (importArg.isTemplateLiteral()) {
      return t.templateLiteral(
        importArg.node.quasis.map(transformQuasi),
        importArg.node.expressions,
      )
    }
    return t.stringLiteral(moduleToChunk(importArg.node.value))
  }

  function getExistingChunkNameComment(callPath) {
    const importArg = getImportArg(callPath)
    const values = getRawChunkNameFromCommments(importArg)
    return values
  }

  function isAgressiveImport(callPath) {
    const importArg = getImportArg(callPath)
    return (
      importArg.isTemplateLiteral() && importArg.node.expressions.length > 0
    )
  }

  function addOrReplaceChunkNameComment(callPath, values) {
    const importArg = getImportArg(callPath)
    const chunkNameComment = getChunkNameComment(importArg)
    if (chunkNameComment) {
      chunkNameComment.remove()
    }

    if (isAgressiveImport(callPath)) {
      values.webpackChunkName = '[request]'
    }

    // const value = t.isTemplateLiteral(chunkName)
    // ? chunkName.quasis[0].value.cooked
    // : chunkName.value

    importArg.addComment('leading', writeWebpackCommentValues(values))
  }

  function replaceChunkName(callPath) {
    const agressiveImport = isAgressiveImport(callPath)
    const values = getExistingChunkNameComment(callPath)

    if (!agressiveImport && values) {
      addOrReplaceChunkNameComment(callPath, values)
      return t.stringLiteral(values.webpackChunkName)
    }

    const chunkNameNode = generateChunkNameNode(callPath)
    const webpackChunkName = t.isTemplateLiteral(chunkNameNode)
      ? chunkNameNode.quasis[0].value.cooked
      : chunkNameNode.value
    addOrReplaceChunkNameComment(callPath, { webpackChunkName })
    return chunkNameNode
  }

  return ({ callPath, funcPath }) => {
    const chunkName = replaceChunkName(callPath)

    return t.objectMethod(
      'method',
      t.identifier('chunkName'),
      funcPath.node.params,
      t.blockStatement([t.returnStatement(chunkName)]),
    )
  }
}
