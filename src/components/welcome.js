import React from 'react'

import PropTypes from 'prop-types'

import './welcome.css'

const Welcome = (props) => {
  return (
    <div className="welcome-container">
      <h1 className="welcome-text">{props.welcome}</h1>
    </div>
  )
}

Welcome.defaultProps = {
  welcome: 'Welcome [Jane Doe]',
}

Welcome.propTypes = {
  welcome: PropTypes.string,
}

export default Welcome
