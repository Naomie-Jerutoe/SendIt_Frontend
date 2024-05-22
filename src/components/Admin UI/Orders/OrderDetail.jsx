import React, { useState } from 'react'

function OrderDetail({order, onClose}) {
  const [showForm, setShowForm] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  const handleUpdateStatusClick = () => {
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://sendit-backend-qhth.onrender.com/orders/${order.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        alert ('Status Updated Successfully. User will receive an email of the update.')
        setNewStatus('');
        setShowForm(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className='order'>
      <span className="close" onClick={onClose}>&times;</span>
      <h2>Order Details:</h2>
        <p>ID: {order.id}</p>
        <p>Status: {order.status}</p>
        <p>Parcel Id: {order.parcel_id}</p>
        <button onClick={handleUpdateStatusClick}>Update Status</button>
        {showForm && (
        <form onSubmit={handleSubmit}>
          <label>
            New Status:
            <input
              type="text"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  )
}

export default OrderDetail