import './GoogleMapsPage.css';
import MapWithGeocoding from './MapWithGeocoding'; // Import your Google Maps component

const GoogleMapsPage = () => {
  console.log("GoogleMapsPage component rendered");
  return (
    <div>
       <div className="maps-page">
      <h1>Google Maps Page</h1>
      <MapWithGeocoding /> {/* Render your Google Maps component here */}
      </div>
    </div>
  );
};

export default GoogleMapsPage;
