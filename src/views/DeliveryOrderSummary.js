import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Navbar from '../components/navbar';
import './DeliveryOrderSummary.css';

const getUserId = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.userId; // Assuming the user ID is stored in the 'userId' field of the token
  }
  return null;
};

const DeliveryOrderSummary = () => {
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [userId, setUserId] = useState(null); // Initialize userId with null

  useEffect(() => {
    const fetchUserId = async () => {
      const id = getUserId();
      setUserId(id); // Update userId state with the retrieved value
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setErrorMessage('Token not found. Please sign in first.');
          return;
        }

        if (userId === null) {
          // If userId is still null, return from the function
          return;
        }

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
  }, [userId]);

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
                <p>Cost: {order.price} Ksh</p>
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






// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const OrderSummary = () => {
//   const { userId } = useParams();
//   const [parcels, setParcels] = useState([]);

//   useEffect(() => {
//     const fetchUserParcels = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(`https://sendit-backend-qhth.onrender.com/users/${userId}/parcels`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setParcels(response.data);
//       } catch (error) {
//         console.error('Error fetching user parcels:', error);
//       }
//     };

//     fetchUserParcels();
//   }, [userId]);

//   return (
//     <div>
//       <h2>Order Summary</h2>
//       {parcels.length > 0 ? (
//         <ul>
//           {parcels.map((parcel) => (
//             <li key={parcel.id}>
//               <h3>Order ID: {parcel.id}</h3>
//               <p>Pickup Location: {parcel.pickup_location}</p>
//               <p>Destination: {parcel.destination}</p>
//               <p>Weight: {parcel.weight}</p>
//               <p>Description: {parcel.description}</p>
//               <p>Price: {parcel.price}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No parcels found.</p>
//       )}
//     </div>
//   );
// };

// export default OrderSummary;






// import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import Navbar from '../components/navbar';
// import './DeliveryOrderSummary.css';

// const DeliveryOrderSummary = () => {
//   const [orders, setOrders] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');
//   const history = useHistory();

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           setErrorMessage('Token not found. Please sign in first.');
//           history.push('/signup');
//           return;
//         }

//         const decodedToken = jwtDecode(token);
//         const userId = decodedToken.user_id;

//         const response = await axios.get(`https://sendit-backend-qhth.onrender.com/users/${userId}/parcels`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.status === 200) {
//           setOrders(response.data.parcels);
//         } else {
//           setErrorMessage('Failed to fetch orders.');
//         }
//       } catch (error) {
//         console.error('An error occurred:', error);
//         setErrorMessage('Failed to fetch orders.');
//       }
//     };

//     fetchOrders();
//   }, [history]);



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import Navbar from '../components/navbar';
// import './DeliveryOrderSummary.css';

// const getUserId = () => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     const decodedToken = jwtDecode(token);
//     return decodedToken.userId; // Assuming the user ID is stored in the 'userId' field of the token
//   }
//   return null;
// };

// const DeliveryOrderSummary = () => {
//   const [orders, setOrders] = useState([]);
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           setErrorMessage('Token not found. Please sign in first.');
//           return;
//         }

//         const userId = getUserId();

//         const response = await axios.get(`https://sendit-backend-qhth.onrender.com/users/${userId}/parcels`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.status === 200) {
//           setOrders(response.data.parcels);
//         } else {
//           setErrorMessage('Failed to fetch orders.');
//         }
//       } catch (error) {
//         console.error('An error occurred:', error);
//         setErrorMessage('Failed to fetch orders.');
//       }
//     };

//     fetchOrders();
//   }, []);


//   return (
//     <div>
//       <div className="delivery-order-summary-navbar">
//         <Navbar rootClassName="navbar-root-class-name"></Navbar>
//       </div>
//       <div className="delivery-order-summary-container">
//         <h2>Delivery Order Summary</h2>
//         {errorMessage && <p>{errorMessage}</p>}
//         {orders.length > 0 ? (
//           <ul>
//             {orders.map((order) => (
//               <li key={order.id}>
//                 <h3>Order #{order.id}</h3>
//                 <p>Pickup Location: {order.pickup_location}</p>
//                 <p>Destination: {order.destination}</p>
//                 <p>Description: {order.description}</p>
//                 <p>Weight: {order.weight} kg</p>
//                 <p>Cost: {order.price} Ksh</p>
//                 <p>Status: {order.status}</p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No orders found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DeliveryOrderSummary;



