import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import "./style.css";
import AboutPage from "./views/about-page";
import ContactUs from "./views/contact-us";
import Home from "./views/home";
import NotFound from "./views/not-found";
import SignUp from "./views/signup";
import Dashboard from "./components/Admin UI/Dashboard/Dashboard";
import Users from "./components/Admin UI/Users/Users";
import Parcels from "./components/Admin UI/Parcels/Parcels";
import Orders from "./components/Admin UI/Orders/Orders";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={AboutPage} exact path="/about-page" />
        <Route component={ContactUs} exact path="/contact-us" />
        <Route component={Home} exact path="/" />
        <Route component={SignUp} exact path="/signup" />
        <Route component={Dashboard} exact path="/admin_dashboard" />
        <Route component={Users} exact path="/admin_users" />
        <Route component={Parcels} exact path="/admin_parcels" />
        <Route component={Orders} exact path="/admin_orders" />
        <Route component={NotFound} path="**" />
        <Redirect to="**" />
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
