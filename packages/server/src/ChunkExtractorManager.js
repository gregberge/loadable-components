import React from 'react'
import { PrerenderedControler } from 'react-prerendered-component';
import { Context } from './sharedInternals'

const ChunkExtractorManager = ({ extractor, children }) => (
  <PrerenderedControler>
    <Context.Provider value={extractor}>{children}</Context.Provider>
  </PrerenderedControler>
)

export default ChunkExtractorManager
