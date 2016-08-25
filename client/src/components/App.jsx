import React from 'react'
import ReactDOM from 'react-dom'
import {Route, Router, IndexRoute, hashHistory } from 'react-router'


require('../sass/style.scss')

export const App = React.createClass({
  render() {
    let children = React.cloneElement(this.props.children, { store: {} })
    return (
      <div>
        {children}
      </div>
    )
  }
})

const Index = require('./Index')

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
    </Route>
  </Router>
  ), document.getElementById('app'))
