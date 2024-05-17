import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import './style.css'
import AboutPage from './views/about-page'
import ContactUs from './views/contact-us'
import Home from './views/home'
import NotFound from './views/not-found'
import MapWithGeocoding from './components/MapWithGeocoding';
import GoogleMapsPage from './components/GoogleMapsPage';
import SignUp from './views/signup'


const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={AboutPage} exact path="/about-page" />
        <Route component={ContactUs} exact path="/contact-us" />
        <Route component={SignUp} exact path="/signup" />
        <Route component={Home} exact path="/" />
        <Route component={MapWithGeocoding} exact path="/map" />
        <Route component={GoogleMapsPage} exact path="/maps" />
        <Route component={NotFound} path="**" />
        <Redirect to="**" />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
