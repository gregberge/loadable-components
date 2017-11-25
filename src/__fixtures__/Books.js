/* eslint-disable react/prop-types, import/no-extraneous-dependencies */
import React from 'react'
import { Route } from 'react-router'
import { Book } from './Routes'

const Books = ({ match }) => (
  <div>
    <h1>Books</h1>
    <Route path={`${match.url}/:bookId`} component={Book} />
  </div>
)

export default Books
