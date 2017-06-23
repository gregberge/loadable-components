/* eslint-disable react/prop-types */
import React from 'react'
import { Route, StaticRouter } from 'react-router'
import { getLoadableState } from './'
import { Books } from '../__fixtures__/Routes'

describe('server side rendering', () => {
  let app

  beforeEach(() => {
    const App = () =>
      <div>
        <Route path="/books" component={Books} />
      </div>

    const context = {}

    app = (
      <StaticRouter location="/books/2" context={context}>
        <App />
      </StaticRouter>
    )
  })

  it('should collect ids', async () => {
    const loadableState = await getLoadableState(app)
    expect(loadableState.componentIds).toEqual([1, 0])
  })
})
