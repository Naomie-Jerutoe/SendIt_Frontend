import React, { useState, useEffect } from 'react';

const ParcelDetails = ({ parcelId }) => {
  const [parcel, setParcel] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchParcelDetails = async () => {
      try {
        const response = await fetch(`/parcels/${parcelId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch parcel details');
        }
        const data = await response.json();
        setParcel(data.parcel);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchParcelDetails();
  }, [parcelId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!parcel) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Parcel Details</h2>
      <p>Pickup Location: {parcel.pickup_location}</p>
      <p>Destination: {parcel.destination}</p>
    </div>
  );
};

export default ParcelDetails;
