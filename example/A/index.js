import React, { Component } from 'react'
import loadable from 'loadable-components'

const Loaded = loadable(() => import('./Component'))

export default Loaded
