import React from 'react'
import { Context } from './sharedInternals'

const ChunkExtractorManager = ({ extractor, children }) => (
  <Context.Provider value={extractor}>{children}</Context.Provider>
)

export default ChunkExtractorManager
