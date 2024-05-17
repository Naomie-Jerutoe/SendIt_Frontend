import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/navbar';
import './DeliveryOrderSummary.css';

const DeliveryOrderSummary = () => {
  const [orderData, setOrderData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const { parcelId, orderStatus } = location.state;
        const response = await fetch(`https://sendit-backend-qhth.onrender.com/orders/${parcelId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setOrderData({ ...data.order, status: orderStatus });
        } else {
          console.error('Failed to fetch order data:', data.message);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchOrderData();
  }, [location.state]);

  if (!orderData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="delivery-order-summary-navbar">
        <Navbar rootClassName="navbar-root-class-name"></Navbar>
      </div>
      <div className="delivery-order-summary-container">
        <h2>Delivery Order Summary</h2>
        <div>
          <h3>Customer Name</h3>
          {/* Add customer name here */}
        </div>
        <div>
          <h3>Delivery Address</h3>
          {/* Add delivery address here */}
        </div>
        <div>
          <h3>Items</h3>
          {/* Add items here */}
        </div>
        <div>
          <h3>Order Status</h3>
          <p>{orderData.status}</p>
        </div>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
};

export default DeliveryOrderSummary;