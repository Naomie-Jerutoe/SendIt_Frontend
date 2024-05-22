import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import './style.css'
import Services from './views/services'
import UserDashboard from './views/user-dashboard'
import AboutPage from './views/about-page'
import ContactUs from './views/contact-us'
import Signup from './views/signup'
import Home from './views/home'
import NotFound from './views/not-found'
import Dashboard from './components/Admin UI/Dashboard/Dashboard'
import Users from './components/Admin UI/Users/Users'
import Parcels from './components/Admin UI/Parcels/Parcels'
import Orders from './components/Admin UI/Orders/Orders'
import DeliveryOrderDeliveryOrderSummary from "./views/NewDeliveryOrder"

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={Services} exact path="/services" />
        <Route component={UserDashboard} exact path="/user-dashboard" />
        <Route component={AboutPage} exact path="/about-page" />
        <Route component={ContactUs} exact path="/contact-us" />
        <Route component={Signup} exact path="/signup" />
        <Route component={Home} exact path="/" />
        <Route component={Dashboard} exact path="/admin_dashboard" />
        <Route component={Users} exact path="/admin_users" />
        <Route component={Parcels} exact path="/admin_parcels" />
        <Route component={Orders} exact path="/admin_orders" />
        <Route component={NewDeliveryOrder} exact path="/new-delivery-order" />
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
