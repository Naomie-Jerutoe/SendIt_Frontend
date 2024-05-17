import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, Polyline, useLoadScript } from '@react-google-maps/api';
import { setKey, fromAddress } from 'react-geocode';
import ParcelDetails from './ParcelDetails';
import { jwtDecode } from 'jwt-decode';
import './MapWithGeocoding.css';

const MapWithGeocoding = () => {
  const [parcelData, setParcelData] = useState([]);
  const [selectedParcel, setSelectedParcel] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBOzf-XaussCXmQ7jdKxZriWMjLcqPZDbo", // Your Google Maps API key
  });

  useEffect(() => {
    setKey("AIzaSyBOzf-XaussCXmQ7jdKxZriWMjLcqPZDbo"); // Set your Google Maps API key using setKey method
    fetchParcelData();
  }, []);

  const getUserIdFromToken = (token) => {
    try {
      if (!token || typeof token !== 'string') {
        throw new Error('Invalid token specified: must be a string');
      }
  
      const decodedToken = jwtDecode(token);
  
      if (!decodedToken || !decodedToken.sub) {
        throw new Error('Invalid token: sub field missing');
      }
  
      return decodedToken.sub.userId;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };
  
  const API_BASE_URL = 'https://sendit-backend-qhth.onrender.com/'
  const fetchParcelData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('JWT token not found in local storage');
      }
  
      const userId = getUserIdFromToken(token);
      if (!userId) {
        throw new Error('Unable to extract user ID from token');
      }
  
      const response = await fetch(`${API_BASE_URL}/users/${userId}/parcels`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch parcel data');
      }
  
      const data = await response.json();
  
      if (!data || !data.parcels || data.parcels.length === 0) {
        setParcelData([]);
        return;
      }
  
      const parcelsWithCoordinates = await Promise.all(data.parcels.map(async parcel => {
        const pickupLatLng = await geocodeAddress(parcel.pickup_location);
        const destLatLng = await geocodeAddress(parcel.destination);
        return {
          id: parcel.id,
          pickupLat: pickupLatLng.lat,
          pickupLng: pickupLatLng.lng,
          destLat: destLatLng.lat,
          destLng: destLatLng.lng,
        };
      }));
  
      setParcelData(parcelsWithCoordinates);
    } catch (error) {
      console.error('Error fetching parcel data:', error);
    }
  };

  const geocodeAddress = async address => {
    try {
      const response = await fromAddress(address);
      const { lat, lng } = response.results[0].geometry.location;
      return { lat, lng };
    } catch (error) {
      console.error('Error geocoding address:', error);
      return { lat: 0, lng: 0 }; // Default to (0, 0) if geocoding fails
    }
  };

  const handleMarkerClick = parcel => {
    setSelectedParcel(parcel);
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div className="map-container">
    <div style={{ height: '600px', width: '100%' }}>
      <GoogleMap
        center={{ lat: 0, lng: 0 }}
        zoom={4}
      >
        {parcelData.map(parcel => (
          <React.Fragment key={parcel.id}>
            <Marker
              position={{ lat: parcel.pickupLat, lng: parcel.pickupLng }}
              onClick={() => handleMarkerClick(parcel)}
            />
            <Marker
              position={{ lat: parcel.destLat, lng: parcel.destLng }}
              onClick={() => handleMarkerClick(parcel)}
            />
            <Polyline
              path={[
                { lat: parcel.pickupLat, lng: parcel.pickupLng },
                { lat: parcel.destLat, lng: parcel.destLng }
              ]}
              options={{
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
              }}
            />
          </React.Fragment>
        ))}
      </GoogleMap>

      {selectedParcel && (
        <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'white', padding: '10px', borderRadius: '5px' }}>
          <ParcelDetails parcel={selectedParcel} />
        </div>
      )}
      </div>
    </div>
  );
};


export default MapWithGeocoding;
