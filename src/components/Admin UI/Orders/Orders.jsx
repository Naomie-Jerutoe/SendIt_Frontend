import { Link } from "react-router-dom";
import "./Orders.css";
import help from "../Dashboard/help-web-button.png"
import dash from "../Dashboard/dashboard (2).png"
import { useState, useEffect } from "react";
import OrderDetail from "./OrderDetail";

function Orders() {
  const [orders, setOrders]= useState([])
  const [parcelId, setParcelId] = useState("")
  const [status, setStatus] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://sendit-backend-qhth.onrender.com/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ parcel_id: parcelId, status: status }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.msg) {
        setMessage(data.msg);
        setError('');
      } else {
        setError(data.error);
        setMessage('');
      }
    })
    .catch(error => {
      console.log(error)
      setError('Failed to create order');
      setMessage('');
    });
  };

  useEffect(() => {
    fetch(`https://sendit-backend-qhth.onrender.com/orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setOrders(data.order_statuses);
    })
    .catch(error => {
      setError(error.message);
    });
  }, []);

  const handleViewDetails = (orderId) => {
    fetch(`https://sendit-backend-qhth.onrender.com/orders/${orderId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }
        return response.json();
      })
      .then(data => {
        console.log(data.order_status)
        setSelectedOrder(data.order_status);
      })
      .catch(error => {
        console.log(error.message);
      });
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  return (
    <div className="main">
      <div className="side-menu">
        <div className="brand-name">
          <h1>SendIt</h1>
        </div>
        <ul>
          <Link to={'/admin_dashboard'}><li><img src={dash} alt="" />&nbsp; <span>Dashboard</span></li></Link>
          <Link to={'/admin_users'}><li><img src="" alt="" />&nbsp; <span>Users</span></li></Link>
          <Link to={'/admin_parcels'}><li><img src="" alt="" />&nbsp; <span>Parcels</span></li></Link>
          <Link to={'/admin_orders'}><li><img src="" alt="" />&nbsp; <span>Orders</span></li></Link>
          <Link to={'/help'}><li><img src={help} alt="" />&nbsp; <span>Help</span></li></Link>{" "}
        </ul>
      </div>
      <div className="container">
        <div>
          <h1>ORDERS</h1>
          <div className="center"> 
            <h3>Create Status Order</h3>
            <form onSubmit={handleSubmit}>
            <div className="inputbox">
              <input 
                  type="text" 
                  required="required"
                  value={parcelId}
                  onChange={(e) => setParcelId(e.target.value)}
                  />
              <span>Parcel Id</span>
            </div>
            <div className="inputbox">
              <input 
                  type="text" 
                  required="required" 
                  value={status}
                  onChange={(e) => setStatus(e.target.value)} 
                  />
              <span>Status</span>
            </div>
            <div className="inputbox">
              <button>Submit</button>
            </div>
          </form>
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
          </div>
          <div>
            <h2>All Orders</h2>
            <div>
            <div className="tableContainer">
            <table className="styled-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Status</th>
                    <th>Parcel_id</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.status}</td>
                      <td>{order.parcel_id}</td>
                      <td>
                        <button onClick={()=>{handleViewDetails(order.id)}}>View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              {selectedOrder && <OrderDetail order={selectedOrder} onClose={handleCloseModal} />}
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders