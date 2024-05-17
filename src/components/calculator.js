import React, { useState, useEffect } from 'react';
import './calculator.css';

const PriceCalculatorForm = ({ isOpen, onClose }) => {
  const [distance, setDistance] = useState('');
  const [fragility, setFragility] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const modalOverlayRef = React.useRef(null);

  useEffect(() => {
    const modalOverlay = modalOverlayRef.current;

    if (modalOverlay) {
      if (isOpen) {
        modalOverlay.classList.add('open');
      } else {
        modalOverlay.classList.remove('open');
      }
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Calculate the estimated price based on distance and fragility
    const calculatedPrice = calculatePrice(distance, fragility);
    setEstimatedPrice(calculatedPrice);
  };

  const calculatePrice = (distance, fragility) => {
  let basePrice;
  let additionalPricePerKm;

  // Determine base price based on fragility
  if (fragility === 'low') {
    basePrice = 300; // Base price for low fragility items
    additionalPricePerKm = 50; // Additional price per km after 1 km
  } else if (fragility === 'medium') {
    basePrice = 500; // Base price for medium fragility items
    additionalPricePerKm = 80; // Additional price per km after 1 km
  } else if (fragility === 'high') {
    basePrice = 700; // Base price for high fragility items
    additionalPricePerKm = 120; // Additional price per km after 1 km
  } else {
    basePrice = 300; // Default base price for any item
    additionalPricePerKm = 0; // No additional price per km
  }

  // Calculate price based on distance
  let distancePrice;
  if (distance <= 1) {
    distancePrice = 0; // No additional price for the first kilometer
  } else {
    distancePrice = (distance - 1) * additionalPricePerKm; // Additional price for distance beyond 1 km
  }

  const totalPrice = basePrice + distancePrice;
  return totalPrice.toFixed(2); // Return the calculated price rounded to 2 decimal places
};

  return (
    <div className={`price-calculator-modal ${isOpen ? 'open' : ''}`}>
      <div className="price-calculator-modal-content">
        <span className="price-calculator-close" onClick={onClose}>
          &times;
        </span>
        <h2>Get A Quote:</h2><br />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="distance">What is the distance? (in km):</label><br /><br />
            <input
              type="number"
              id="distance"
              // placeholder="how far is it?"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              required
            />
          </div>
          <br />
          <div>
            <label htmlFor="fragility">How fragile are the items?</label><br /><br />
            <select
              id="fragility"
              value={fragility}
              onChange={(e) => setFragility(e.target.value)}
              required
            >
              <option value="">Select Fragility</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High (Glass) </option>
            </select>
          </div>
          <br /> <br />

          <button type="submit" className="calculate-button">Calculate Price</button>
          <br /><br /><br />
          {estimatedPrice !== null && (
          <div className="estimated-price">
            <p>Estimated Price: {estimatedPrice} Ksh</p>
          </div>
        )}
        </form>
      </div>
    </div>
  );
};

export default PriceCalculatorForm;