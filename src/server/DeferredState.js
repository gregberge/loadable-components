/* eslint-disable react/no-danger */
import React from 'react'
import { COMPONENT_IDS } from '../constants'

class DeferredState {
  constructor(componentIds) {
    this.componentIds = componentIds
  }

  getScriptContent() {
    return `window.${COMPONENT_IDS} = ${JSON.stringify(this.componentIds)};`
  }

  getScriptTag() {
    return `<script>${this.getScriptContent()}</script>`
  }

  getScriptElement() {
    return (
      <script dangerouslySetInnerHTML={{ __html: this.getScriptContent() }} />
    )
  }
}

export default DeferredState
