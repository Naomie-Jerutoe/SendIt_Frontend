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
import Services from './views/services'
import UserDashboard from './views/user-dashboard'
import Home from './views/home'
import NotFound from './views/not-found'
import NewDeliveryOrder from './views/NewDeliveryOrder';
import DeliveryOrderSummary from './views/DeliveryOrderSummary';
import SignUp from './views/signup';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={Services} exact path="/services" />
        <Route component={UserDashboard} exact path="/user-dashboard" />
        <Route component={AboutPage} exact path="/about-page" />
        <Route component={ContactUs} exact path="/contact-us" />
        <Route component={SignUp} exact path="/signup" />
        <Route component={Home} exact path="/" />
        <Route component={NewDeliveryOrder} exact path="/new-delivery-order" />
        <Route component={DeliveryOrderSummary} exact path="/delivery-order-summary" />
        <Route component={SignUp} exact path="/signup" />
        <Route component={NotFound} path="**" />
        <Redirect to="**" />
      </Switch>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
);
