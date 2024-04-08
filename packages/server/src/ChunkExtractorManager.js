import React from 'react'
import { Context } from './sharedInternals.js'

const ChunkExtractorManager = ({ extractor, children }) => (
  <Context.Provider value={extractor}>{children}</Context.Provider>
)

export default ChunkExtractorManager
