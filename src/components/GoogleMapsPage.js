import './GoogleMapsPage.css';
import { Link } from 'react-router-dom';
import MapWithGeocoding from './MapWithGeocoding'; // Import your Google Maps component

const GoogleMapsPage = () => {
  console.log("GoogleMapsPage component rendered");
  return (
    <div>
       <div className="maps-page">
        <p><button className="back-button">
      <Link to="user-dashboard" > Go to previous page</Link>
      </button>
      </p>
      <h1>Google Maps Page</h1>
      <p>To see estimated travel distance and duration, click on the marker.</p>
      <MapWithGeocoding /> {/* Render your Google Maps component here */}
      </div>
    </div>
  );
};

export default GoogleMapsPage;
