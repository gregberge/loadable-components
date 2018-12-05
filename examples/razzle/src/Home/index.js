import React from 'react'
import loadable from '@loadable/component'
import './Home.css'

const Intro = loadable(() => import('./Intro'))
const Welcome = loadable(() => import('./Welcome'))
const Logo = loadable(() => import('./Logo'))

const Home = () => (
  <div className="Home">
    <div className="Home-header">
      <Logo />
      <Welcome />
    </div>
    <Intro />
    <ul className="Home-resources">
      <li>
        <a href="https://github.com/jaredpalmer/razzle">Docs</a>
      </li>
      <li>
        <a href="https://github.com/jaredpalmer/razzle/issues">Issues</a>
      </li>
      <li>
        <a href="https://palmer.chat">Community Slack</a>
      </li>
    </ul>
  </div>
)

export default Home
