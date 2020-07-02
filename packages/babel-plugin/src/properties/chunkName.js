import vm from 'vm'
import { getImportArg } from '../util'

const JS_PATH_REGEXP = /^[./]+|(\.js$)/g
const MATCH_LEFT_HYPHENS_REPLACE_REGEX = /^-/g
// https://github.com/webpack/webpack/blob/master/lib/Template.js
const WEBPACK_CHUNK_NAME_REGEXP = /webpackChunkName/
const WEBPACK_PATH_NAME_NORMALIZE_REPLACE_REGEX = /[^a-zA-Z0-9_!§$()=\-^°]+/g
const WEBPACK_MATCH_PADDED_HYPHENS_REPLACE_REGEX = /^-|-$/g

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
  if (typeof str !== 'string') return ''
  return str
    .replace(JS_PATH_REGEXP, '')
    .replace(WEBPACK_PATH_NAME_NORMALIZE_REPLACE_REGEX, '-')
    .replace(WEBPACK_MATCH_PADDED_HYPHENS_REPLACE_REGEX, '')
}

function replaceQuasi(str, stripLeftHyphen) {
  if (!str) return ''
  const result = str.replace(WEBPACK_PATH_NAME_NORMALIZE_REPLACE_REGEX, '-')
  if (!stripLeftHyphen) return result
  return result.replace(MATCH_LEFT_HYPHENS_REPLACE_REGEX, '')
}

export default function chunkNameProperty({ types: t }) {
  function transformQuasi(quasi, first, single) {
    return t.templateElement(
      {
        raw: single
          ? moduleToChunk(quasi.value.raw)
          : replaceQuasi(quasi.value.raw, first),
        cooked: single
          ? moduleToChunk(quasi.value.cooked)
          : replaceQuasi(quasi.value.cooked, first),
      },
      quasi.tail,
    )
  }

  function sanitizeChunkNameTemplateLiteral(node) {
    return t.callExpression(t.memberExpression(node, t.identifier('replace')), [
      t.regExpLiteral(WEBPACK_PATH_NAME_NORMALIZE_REPLACE_REGEX.source, 'g'),
      t.stringLiteral('-'),
    ])
  }

  function combineExpressions(node) {
    const { expressions } = node
    const { length } = expressions

    if (length === 1) {
      return expressions[0]
    }

    return expressions
      .slice(1)
      .reduce((r, p) => t.binaryExpression('+', r, p), expressions[0])
  }

  function generateChunkNameNode(callPath, prefix) {
    const importArg = getImportArg(callPath)
    if (importArg.isTemplateLiteral()) {
      return prefix
        ? t.binaryExpression(
            '+',
            t.stringLiteral(prefix),
            sanitizeChunkNameTemplateLiteral(
              combineExpressions(importArg.node),
            ),
          )
        : t.templateLiteral(
            importArg.node.quasis.map((quasi, index) =>
              transformQuasi(
                quasi,
                index === 0,
                importArg.node.quasis.length === 1,
              ),
            ),
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

    importArg.addComment('leading', writeWebpackCommentValues(values))
  }

  function chunkNameFromTemplateLiteral(node) {
    const [q1] = node.quasis
    const v1 = q1 ? q1.value.cooked : ''
    if (!node.expressions.length) return v1
    return `${v1}[request]`
  }

  function getChunkNamePrefix(chunkName) {
    if (typeof chunkName !== 'string') return ''
    const match = chunkName.match(/(.+?)\[(request|index)\]$/)
    return match ? match[1] : ''
  }

  function replaceChunkName(callPath) {
    const agressiveImport = isAgressiveImport(callPath)
    const values = getExistingChunkNameComment(callPath)
    let { webpackChunkName } = values || {}

    if (!agressiveImport && values) {
      addOrReplaceChunkNameComment(callPath, values)
      return t.stringLiteral(webpackChunkName)
    }

    let chunkNameNode = generateChunkNameNode(
      callPath,
      getChunkNamePrefix(webpackChunkName),
    )

    if (t.isTemplateLiteral(chunkNameNode)) {
      webpackChunkName = chunkNameFromTemplateLiteral(chunkNameNode)
      chunkNameNode = sanitizeChunkNameTemplateLiteral(chunkNameNode)
    } else if (t.isStringLiteral(chunkNameNode)) {
      webpackChunkName = chunkNameNode.value
    }

    addOrReplaceChunkNameComment(callPath, { ...values, webpackChunkName })
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
