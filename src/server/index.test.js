/* eslint-disable react/prop-types */
import React from 'react'
import { Route, StaticRouter } from 'react-router'
import { getLoadableState } from './'
import { Books } from '../__fixtures__/Routes'

describe('server side rendering', () => {
  let app

  beforeEach(() => {
    const App = () => (
      <div>
        <Route path="/books" component={Books} />
      </div>
    )

    app = (
      <StaticRouter location="/books/2" context={{}}>
        <App />
      </StaticRouter>
    )
  })

  it('should collect ids', async () => {
    const loadableState = await getLoadableState(app)
    expect(loadableState.tree).toEqual({
      children: [{ children: [{ id: './Book' }], id: './Books' }],
    })
  })

  describe('React.createContext', () => {
    beforeEach(() => {
      const Context = React.createContext(false)
      const App = () => (
        <StaticRouter location="/books/2" context={{}}>
          <Context.Provider value>
            <Context.Consumer>
              {value => value && <Route path="/books" component={Books} />}
            </Context.Consumer>
          </Context.Provider>
        </StaticRouter>
      )

      app = <App />
    })

    it.only('should traverse context', async () => {
      const loadableState = await getLoadableState(app)
      expect(loadableState.tree).toEqual({
        children: [{ children: [{ id: './Book' }], id: './Books' }],
      })
    })
  })

  describe('without any ids', () => {
    it('should return an empty deferred state', async () => {
      const context = {}
      app = (
        <StaticRouter location="/books/2" context={context}>
          <div />
        </StaticRouter>
      )
      const loadableState = await getLoadableState(app).then(x => x)
      expect(loadableState.tree).toEqual({})
    })
  })
})
