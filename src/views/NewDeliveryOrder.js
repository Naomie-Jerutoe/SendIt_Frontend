import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NewDeliveryOrder.css';

const NewDeliveryOrder = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    deliveryAddress: '',
    items: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="new-delivery-order-container">
      <h2>New Delivery Order</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="customerName">Customer Name</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="deliveryAddress">Delivery Address</label>
          <textarea
            id="deliveryAddress"
            name="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="items">Items</label>
          <textarea
            id="items"
            name="items"
            value={formData.items}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Delivery Order</button>
      </form>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default NewDeliveryOrder;