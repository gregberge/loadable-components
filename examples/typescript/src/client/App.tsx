import * as React from 'react'
import loadable from '@loadable/component'
import {StaticRouter, Switch, Route} from 'react-router-dom';

const X = loadable(() => import(`./Page`))

const App = () => (
  <div>
    <p>
      Lazy load letter A:<X/>
    </p>
    <p>
      <StaticRouter>
        <Switch>
          <Route component={X}/>
          <Route
            path="otherPath"
            render={routeProperties =>
            // @ts-expect-error
              <X {...routeProperties} />
            }
            />
        </Switch>
      </StaticRouter>
    </p>
  </div>
)

export default App
