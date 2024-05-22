import React from 'react'

function ParcelDetail({parcel, onClose}) {
  return (
    <div>
      <span className="close" onClick={onClose}>&times;</span>
      <h1>Parcel Details: </h1>
      <p>ID: {parcel.id}</p>
      <p>Pickup Location: {parcel.pickup_location}</p>
      <p>Destination: {parcel.destination}</p>
      <p>Weight: {parcel.weight}</p>
      <p>Price: {parcel.price}</p>
      <p>Description: {parcel.description}</p>
      <p>Status: {parcel.status}</p>
      <p>User ID: {parcel.user_id}</p>
    </div>
  );
}

export default ParcelDetail
