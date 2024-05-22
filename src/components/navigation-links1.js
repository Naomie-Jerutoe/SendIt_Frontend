import React from 'react'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

import './navigation-links1.css'

const NavigationLinks1 = (props) => {
  return (
    <nav className={`navigation-links1-nav ${props.rootClassName} `}>
      <Link to="/about-page" className="navigation-links1-navlink navbar-link">
        {props.text1}
      </Link>
      <Link to="/services" className="navigation-links1-navlink1 navbar-link">
        {props.text2}
      </Link>
      <Link to="/maps" className="navigation-links-navlink3 navbar-link">
        {props.text4}
      </Link>
      <div
        data-thq="thq-dropdown"
        className="navigation-links1-thq-dropdown list-item"
      >
        <ul
          data-thq="thq-dropdown-list"
          className="navigation-links1-dropdown-list"
        >
          <li
            data-thq="thq-dropdown"
            className="navigation-links1-dropdown list-item"
          >
            <div
              data-thq="thq-dropdown-toggle"
              className="navigation-links1-dropdown-toggle"
            >
              <span className="navigation-links1-text1">{props.text6}</span>
            </div>
          </li>
          <li
            data-thq="thq-dropdown"
            className="navigation-links1-dropdown1 list-item"
          >
            <div
              data-thq="thq-dropdown-toggle"
              className="navigation-links1-dropdown-toggle1"
            >
              <span className="navigation-links1-text2">{props.text7}</span>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

NavigationLinks1.defaultProps = {
  text4: 'Tracking',
  text2: 'Service',
  text6: 'New Delivery Order',
  text: 'Home',
  text1: 'About',
  text3: 'Orders',
  text7: 'Delivery Order Summary',
  rootClassName: '',
}

NavigationLinks1.propTypes = {
  text4: PropTypes.string,
  text2: PropTypes.string,
  text6: PropTypes.string,
  text: PropTypes.string,
  text1: PropTypes.string,
  text3: PropTypes.string,
  text7: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default NavigationLinks1
