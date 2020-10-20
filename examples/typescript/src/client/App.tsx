import * as React from 'react'
import loadable from '@loadable/component'
import {StaticRouter, Switch, Route} from 'react-router-dom';

const X = loadable(() => import(`./Page`))
const Y = loadable(() => import(`./PageWithParam`))

const App = () => (
  <div>
    <p>
      Components loaded directly:
      <X/>
      <Y x={42}/>
    </p>
    <hr/>
    <div>
      <StaticRouter>
        <Switch>
          <Route component={X}/>
          <Route path="route-accepts-any" component={Y}/>
          <Route
            path="otherPath"
            render={routeProperties =>
            // @ts-expect-error routeProperties do not exists on X - it accepts no props at all
              <X {...routeProperties} />
            }
            />
        </Switch>
        <hr/>
        <Switch>
          <Route component={Y}/>
        </Switch>
      </StaticRouter>
    </div>
  </div>
)

export default App
