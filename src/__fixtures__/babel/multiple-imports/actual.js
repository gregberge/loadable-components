import React from 'react'
import loadable from 'loadable-components'

const What = loadable(async () => {
  const { default: DeepWord } = await import('./DeepWorld')
  const { default: DeepAmazing } = await import('./DeepAmazing')
  return () => (
    <React.Fragment>
      <DeepAmazing /> <DeepWord />
    </React.Fragment>
  )
})

export default What
