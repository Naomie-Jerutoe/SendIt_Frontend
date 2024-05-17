import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FloatingButton from '../components/floatingbutton';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import './NewDeliveryOrder.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const NewDeliveryOrder = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    deliveryAddress: '',
    items: '',
    weight: '',
    phoneNumber: '',
    email: '',
  });

  const[orderStatus, setOrderStatus] = useState('');
  const history = useHistory();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Create a new parcel
    const parcelResponse = await fetch('https://sendit-backend-qhth.onrender.com/parcels', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(formData),
    });

    if (parcelResponse.ok) {
      const parcelData = await parcelResponse.json();
      const parcelId = parcelData.id;

      // Create a new order
      const orderResponse = await fetch('https://sendit-backend-qhth.onrender.com/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ parcelId, status: 'enroute' }),
      });

      if (orderResponse.ok) {
        const orderData = await orderResponse.json();
        setOrderStatus(orderData.status);
        history.push('/delivery-order-summary', { parcelId, orderStatus: orderData.status });
      } else {
        console.error('Failed to create order');
      }
    } else {
      console.error('Failed to create parcel');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

  const clearForm = () => {
    setFormData({
      customerName: '',
      pickupLocation: '',
      deliveryAddress: '',
      items: '',
      weight: '',
      phoneNumber: '',
      email: '',
    });
  };

  return (
    <div className="new-delivery-order-container">
      <div className="new-delivery-order-navbar">
        <Navbar rootClassName="navbar-root-class-name"></Navbar>
      </div>
      <h2>Create New Delivery Order</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="customerName">Customer Name</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="What's your name?"
          />
        </div>
        <div>
          <label htmlFor="customerName">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="What's your phone number?"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="What's your email address?"
          />
        </div>
        <div>
          <label htmlFor="pickupLocation">Pick Up Location</label>
          <textarea
            id="pickupLocation"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            placeholder="Where do you want us to pick it up?"
          />
        </div>
        <div>
          <label htmlFor="deliveryAddress">Delivery Address / Drop Off Point</label>
          <textarea
            id="deliveryAddress"
            name="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={handleChange}
            placeholder="Where do we take it to?"
          />
        </div>
        <div>
          <label htmlFor="items">Items</label>
          <textarea
            id="items"
            name="items"
            value={formData.items}
            onChange={handleChange}
            placeholder="What items are we delivering for you?"
          />
        </div>
        <div>
          <label htmlFor="weight">Approximate Weight<span className="weight-description"> (in kgs.)</span></label>
          <textarea
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="What is the approximate weight of your goods? (If less than 1kg just input 1kg)"
          />
        </div>
        <button type="submit">Create Delivery Order</button>
        <button type="button" onClick={clearForm}>Clear Form</button>
      </form>
      {/**<Link to="/">Back to Home</Link>**/}
      <div className="new-delivery-order-footer">
        <Footer rootClassName="footer-root-class-name"></Footer>
      </div>
    </div>
  );
};

export default NewDeliveryOrder;