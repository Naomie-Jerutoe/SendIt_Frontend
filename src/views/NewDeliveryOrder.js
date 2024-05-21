import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
// import FloatingButton from '../components/floatingbutton';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import './NewDeliveryOrder.css';
// import SignUp from './signup';


const NewDeliveryOrder = () => {
  const [formData, setFormData] = useState({
    deliveryAddress: '',
    description: '',
    weight: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const getUserEmail = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.email;
  }
  return null;
  };

  const userEmail = getUserEmail();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('Token not found. Please sign in first.');
        return;
      }

      const response = await axios.post(
        'https://sendit-backend-qhth.onrender.com/parcels',
        {
          pickup_location: formData.pickupLocation,
          destination: formData.deliveryAddress,
          weight: formData.weight,
          description: formData.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage('Order created successfully!');
        clearForm();
      } else {
        setErrorMessage('Failed to create order.');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      setErrorMessage('Failed to create order.');
    }
  };

  const clearForm = () => {
    setFormData({
      pickupLocation: '',
      deliveryAddress: '',
      description: '',
      weight: '',
    });
  };

  return (
    <div className="new-delivery-order-container">
      <div className="new-delivery-order-navbar">
        <Navbar rootClassName="navbar-root-class-name"></Navbar>
        <button className="back-button">
      <Link to="user-dashboard" > Go to previous page</Link>
      </button>
      </div>
      {userEmail && <p>Logged in as: {userEmail}</p>}
      <h2>Create New Delivery Order</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="pickupLocation">Pick Up Location</label>
          <textarea
            id="pickupLocation"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            placeholder="e.g Mali Safi Goods, Shop 1B, Ground Floor, Imenti House"
          />
        </div>
        <div>
          <label htmlFor="deliveryAddress">Delivery Address / Drop Off Point</label>
          <textarea
            id="deliveryAddress"
            name="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={handleChange}
            placeholder="e.g Marsabit Plaza, Ngong Road"
          />
        </div>
        <div>
          <label htmlFor="items">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief description of the Item(s) above. e.g 1 HP, 2 Dell, 3 Acer"
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
        <div className="button-container">
          <button type="submit">Create Delivery Order</button>
          <button type="button" onClick={clearForm}>Clear Form</button>
        </div>
      </form>
      <div className="new-delivery-order-footer">
        <Footer rootClassName="footer-root-class-name"></Footer>
      </div>
    </div>
  );
};

export default NewDeliveryOrder;