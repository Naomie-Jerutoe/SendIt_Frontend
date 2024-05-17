import React from 'react';
import { Link } from 'react-router-dom';
import './DeliveryOrderSummary.css';

const DeliveryOrderSummary = () => {
  // Dummy data 
  const orderData = {
    customerName: 'Brian Kipkirui',
    deliveryAddress: '123 Moi Avenue, Nairobi County, Nairobi, 00100',
    items: 'Boiled Eggs, Smocha, Dondo',
  };

  return (
    <div className="delivery-order-summary-container">
      <h2>Delivery Order Summary</h2>
      <div>
        <h3>Customer Name</h3>
        <p>{orderData.customerName}</p>
      </div>
      <div>
        <h3>Delivery Address</h3>
        <p>{orderData.deliveryAddress}</p>
      </div>
      <div>
        <h3>Items</h3>
        <p>{orderData.items}</p>
      </div>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default DeliveryOrderSummary;