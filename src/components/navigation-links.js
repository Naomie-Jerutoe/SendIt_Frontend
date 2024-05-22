import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./navigation-links.css";
import NewDeliveryOrder from "../views/NewDeliveryOrder";
import DeliveryOrderSummary from "../views/DeliveryOrderSummary";
import Services from "../views/services";
import SignUp from "../views/signup";

const NavigationLinks = (props) => {
  return (
    <nav className={`navigation-links-nav ${props.rootClassName} `}>
      <Link to="/" className="navigation-links-navlink navbar-link">
        {props.text}
      </Link>
      <Link to="/about-page" className="navigation-links-navlink1 navbar-link">
        {props.text1}
      </Link>
      <Link to="/services" className="navigation-links-navlink2 navbar-link">
        {props.text2}
      </Link>

      <Link to="/maps" className="navigation-links-text1 navbar-link">
        {props.text4}
      </Link>
      <Link to="/contact-us" className="navigation-links-navlink2 navbar-link">
        {props.text5}
      </Link>

      <div
        data-thq="thq-dropdown"
        className="navigation-links-thq-dropdown list-item"
      >
        <div
          data-thq="thq-dropdown-toggle"
          className="navigation-links-dropdown-toggle"
        >
          <span className="navigation-links-text1">{props.text3}</span>
          <div
            data-thq="thq-dropdown-arrow"
            className="navigation-links-dropdown-arrow"
          >
            <svg viewBox="0 0 1024 1024" className="navigation-links-icon">
              <path d="M426 726v-428l214 214z" className=""></path>
            </svg>
          </div>
        </div>
        <ul
          data-thq="thq-dropdown-list"
          className="navigation-links-dropdown-list"
        >
          <li
            data-thq="thq-dropdown"
            className="navigation-links-dropdown list-item"
          >
            <Link to="/new-delivery-order">
              <div
                data-thq="thq-dropdown-toggle"
                className="navigation-links-dropdown-toggle1"
              >
                <span className="navigation-links-text2">{props.text6}</span>
              </div>
            </Link>
          </li>
          <li
            data-thq="thq-dropdown"
            className="navigation-links-dropdown1 list-item"
          >
            <Link to="/delivery-order-summary">
              <div
                data-thq="thq-dropdown-toggle"
                className="navigation-links-dropdown-toggle2"
              >
                <span className="navigation-links-text3">{props.text7}</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

NavigationLinks.defaultProps = {
  text5: "Contact us",
  text6: "New Delivery Order",
  text7: "Delivery Order Summary",
  text2: "Service",
  text3: "Orders",
  rootClassName: "",
  text4: "Tracking",
  text: "Home",
  text1: "About",
};

NavigationLinks.propTypes = {
  text5: PropTypes.string,
  text6: PropTypes.string,
  text7: PropTypes.string,
  text2: PropTypes.string,
  text3: PropTypes.string,
  rootClassName: PropTypes.string,
  text4: PropTypes.string,
  text: PropTypes.string,
  text1: PropTypes.string,
};

export default NavigationLinks;
