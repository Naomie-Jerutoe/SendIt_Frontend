import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Navbar from '../components/navbar';
import './DeliveryOrderSummary.css';

const DeliveryOrderSummary = () => {
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setErrorMessage('Token not found. Please sign in first.');
          history.push('/signup');
          return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user_id;

        const response = await axios.get(`https://sendit-backend-qhth.onrender.com/users/${userId}/parcels`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setOrders(response.data.parcels);
        } else {
          setErrorMessage('Failed to fetch orders.');
        }
      } catch (error) {
        console.error('An error occurred:', error);
        setErrorMessage('Failed to fetch orders.');
      }
    };

    fetchOrders();
  }, [history]);

  return (
    <div>
      <div className="delivery-order-summary-navbar">
        <Navbar rootClassName="navbar-root-class-name"></Navbar>
      </div>
      <div className="delivery-order-summary-container">
        <h2>Delivery Order Summary</h2>
        {errorMessage && <p>{errorMessage}</p>}
        {orders.length > 0 ? (
          <ul>
            {orders.map((order) => (
              <li key={order.id}>
                <h3>Order #{order.id}</h3>
                <p>Pickup Location: {order.pickup_location}</p>
                <p>Destination: {order.destination}</p>
                <p>Description: {order.description}</p>
                <p>Weight: {order.weight} kg</p>
                <p>Status: {order.status}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default DeliveryOrderSummary;




// import React, { useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import Navbar from '../components/navbar';
// import './DeliveryOrderSummary.css';

// const DeliveryOrderSummary = () => {
//   const [orderData, setOrderData] = useState(null);
//   const location = useLocation();

//   useEffect(() => {
//     const fetchOrderData = async () => {
//       try {
//         const { parcelId, orderStatus } = location.state;
//         const response = await fetch(`https://sendit-backend-qhth.onrender.com/orders/${parcelId}`, {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
//           },
//         });
//         const data = await response.json();
//         if (response.ok) {
//           setOrderData({ ...data.order, status: orderStatus });
//         } else {
//           console.error('Failed to fetch order data:', data.message);
//         }
//       } catch (error) {
//         console.error('An error occurred:', error);
//       }
//     };

//     fetchOrderData();
//   }, [location.state]);

//   if (!orderData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <div className="delivery-order-summary-navbar">
//         <Navbar rootClassName="navbar-root-class-name"></Navbar>
//       </div>
//       <div className="delivery-order-summary-container">
//         <h2>Delivery Order Summary</h2>
//         <div>
//           <h3>Customer Name</h3>
//           {/* Add customer name here */}
//         </div>
//         <div>
//           <h3>Delivery Address</h3>
//           {/* Add delivery address here */}
//         </div>
//         <div>
//           <h3>Description</h3>
//           {/* Add items here */}
//         </div>
//         <div>
//           <h3>Order Status</h3>
//           <p>{orderData.status}</p>
//         </div>
//         <Link to="/">Back to Home</Link>
//       </div>
//     </div>
//   );
// };

// export default DeliveryOrderSummary;