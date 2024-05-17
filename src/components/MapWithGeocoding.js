import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, Polyline, useLoadScript } from '@react-google-maps/api';
import Geocode from 'react-geocode';
import ParcelDetails from './ParcelDetails';

const MapWithGeocoding = () => {
  const [parcelData, setParcelData] = useState([]);
  const [selectedParcel, setSelectedParcel] = useState(null);
  
  // Load Google Maps script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Load the API key
  });

  useEffect(() => {
    fetchParcelData();
  }, []);

  const fetchParcelData = async () => {
    try {
      const token = localStorage.getItem('jwtToken');

      const response = await fetch('/parcels', {
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

      const parcelsWithCoordinates = await Promise.all(
        data.parcels.map(async parcel => {
          const { pickup_location, destination } = parcel;

          const pickupLatLng = await geocodeAddress(pickup_location);
          const destLatLng = await geocodeAddress(destination);

          return {
            ...parcel,
            pickupLat: pickupLatLng.lat,
            pickupLng: pickupLatLng.lng,
            destLat: destLatLng.lat,
            destLng: destLatLng.lng
          };
        })
      );

      setParcelData(parcelsWithCoordinates);
    } catch (error) {
      console.error('Error fetching parcel data:', error);
    }
  };

  const geocodeAddress = async address => {
    try {
      Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY); // Set the API key
      const response = await Geocode.fromAddress(address);
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
    <div style={{ height: '600px', width: '100%' }}>
      <GoogleMap
        center={{ lat: 0, lng: 0 }} // Center map initially
        zoom={4} // Initial zoom level
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
  );
};

export default MapWithGeocoding;
