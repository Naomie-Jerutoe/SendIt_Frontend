import React from 'react'

import PropTypes from 'prop-types'

import './order-summary.css'

const OrderSummary = (props) => {
  return (
    <div className="order-summary-container">
      <h1 className="order-summary-text">{props.heading}</h1>
      <div className="order-summary-container01">
        <div className="order-summary-container02">
          <span className="order-summary-text1">{props.text}</span>
        </div>
        <div className="order-summary-container03">
          <span className="order-summary-text2">{props.text1}</span>
        </div>
        <div className="order-summary-container04">
          <span className="order-summary-text3">{props.text2}</span>
        </div>
        <div className="order-summary-container05">
          <span className="order-summary-text4">{props.text3}</span>
        </div>
      </div>
      <div className="order-summary-container06">
        <div className="order-summary-container07">
          <div className="order-summary-container08"></div>
          <div className="order-summary-container09"></div>
          <div className="order-summary-container10"></div>
          <div className="order-summary-container11"></div>
        </div>
        <div className="order-summary-container12">
          <div className="order-summary-container13"></div>
          <div className="order-summary-container14"></div>
          <div className="order-summary-container15"></div>
          <div className="order-summary-container16"></div>
        </div>
        <div className="order-summary-container17">
          <div className="order-summary-container18"></div>
          <div className="order-summary-container19"></div>
          <div className="order-summary-container20"></div>
          <div className="order-summary-container21"></div>
        </div>
      </div>
      <div className="order-summary-container22">
        <div className="order-summary-container23">
          <div className="order-summary-container24"></div>
          <div className="order-summary-container25"></div>
          <div className="order-summary-container26"></div>
          <div className="order-summary-container27"></div>
        </div>
      </div>
    </div>
  )
}

OrderSummary.defaultProps = {
  text: 'Parcel ID',
  text1: 'Pickup Location',
  text3: 'Destination',
  text2: 'Status',
  heading: 'Order Summary',
}

OrderSummary.propTypes = {
  text: PropTypes.string,
  text1: PropTypes.string,
  text3: PropTypes.string,
  text2: PropTypes.string,
  heading: PropTypes.string,
}

export default OrderSummary
