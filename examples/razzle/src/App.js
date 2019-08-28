import React from 'react'
import { Router, Link } from '@reach/router'
import loadable from '@loadable/component'
import './App.css'

const NotFound = loadable(() => import('./NotFound'))
const Home = loadable(() => import('./Home'))
const About = loadable(() => import('./About'))
const Contact = loadable(() => import('./Contact'))

const App = () => (
  <>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    <Link to="/contact">Contact</Link>
    <Router>
      <NotFound default fallback={<div>loading...</div>} />
      <Home path="/" fallback={<div>loading...</div>} />
      <About path="/about" fallback={<div>loading...</div>} />
      <Contact path="/contact" fallback={<div>loading...</div>} />
    </Router>
  </>
)

export default App
