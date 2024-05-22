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
import PasswordReset from "./components/PasswordReset";
import ResetPassword from "./components/ResetPassword";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={ResetPassword} exact path="/reset-password" />
        <Route component={PasswordReset} exact path="/password-reset" />
        <Route component={SignUp} exact path="/signup" />
        <Route component={AboutPage} exact path="/about-page" />
        <Route component={ContactUs} exact path="/contact-us" />
        <Route component={Home} exact path="/" />
        <Route component={NotFound} path="**" />
        <Redirect to="**" />
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
