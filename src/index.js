import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import './style.css'
import Services from './views/services'
import AboutPage from './views/about-page'
import ContactUs from './views/contact-us'
import Home from './views/home'
import Signup from './views/signup'
import NotFound from './views/not-found'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={Services} exact path="/services" />
        <Route component={AboutPage} exact path="/about-page" />
        <Route component={ContactUs} exact path="/contact-us" />
        <Route component={Home} exact path="/" />
        <Route component={Signup} exact path="/signup" />
        <Route component={NotFound} path="**" />
        <Redirect to="**" />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
