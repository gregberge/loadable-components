import React from 'react'
import { hot } from 'react-hot-loader'
import { Link, Route } from 'react-router-dom'
import Home from './Home'
import Nesting from './nesting/Nesting'
import SameModules from './same-modules/SameModules'
import MultipleLoad from './multiple-load/MultipleLoad'
import HotReloadingSandbox from './hot-reloading-sandbox/HotReloadingSandbox'
import AsyncMode from './async-mode/AsyncMode'

const App = () => (
  <div>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/nesting">Nesting</Link>
        </li>
        <li>
          <Link to="/same-modules">Same modules</Link>
        </li>
        <li>
          <Link to="/multiple-load">Multiple Load</Link>
        </li>
        <li>
          <Link to="/hot-reloading-sandbox">Hot Reloading Sandbox</Link>
        </li>
        <li>
          <Link to="/async-mode">Async Mode</Link>
        </li>
      </ul>
    </nav>
    <main>
      <Route exact path="/" component={Home} />
      <Route path="/nesting" component={Nesting} />
      <Route path="/same-modules" component={SameModules} />
      <Route path="/multiple-load" component={MultipleLoad} />
      <Route path="/hot-reloading-sandbox" component={HotReloadingSandbox} />
      <Route path="/async-mode" component={AsyncMode} />
    </main>
  </div>
)

export default hot(module)(App)
