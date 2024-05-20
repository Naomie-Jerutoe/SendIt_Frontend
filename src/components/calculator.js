import React, { useState, useEffect } from 'react';
import './calculator.css';

const PriceCalculatorForm = ({ isOpen, onClose }) => {
  const [weight, setWeight] = useState('');
  const [distance, setDistance] = useState('');
  const [deliverySpeed, setDeliverySpeed] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
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
    // Calculate the estimated price based on weight, distance, delivery speed, and delivery location
    const calculatedPrice = calculatePrice(weight, distance, deliverySpeed, deliveryLocation);
    setEstimatedPrice(calculatedPrice);
  };


  const calculatePrice = (weight, distance, deliverySpeed, deliveryLocation) => {
  // Define base rate based on weight
  const weightBasedRate = getWeightBasedRate(weight);
  let baseRate = weightBasedRate;

  // Apply distance-based pricing
  const distanceRate = getDistanceRate(distance);
  baseRate += distanceRate;

  // Apply delivery speed pricing
  const speedRate = getDeliverySpeedRate(deliverySpeed);
  baseRate += speedRate;

  // Apply delivery location pricing
  const locationRate = getDeliveryLocationRate(deliveryLocation);
  baseRate += locationRate;

  // Round the final price to 2 decimal places
  return baseRate.toFixed(2);
};

// Helper function to calculate rate based on weight
const getWeightBasedRate = (weight) => {
  let rate;
  if (weight <= 1) {
    rate = 5; // Base rate for weight up to 1kg
  } else if (weight <= 5) {
    rate = 10; // Rate for weight between 1kg and 5kg
  } else if (weight <= 10) {
    rate = 15; // Rate for weight between 5kg and 10kg
  } else {
    rate = 20 + (weight - 10) * 2; // Rate for weight above 10kg, plus $2 per kg over 10kg
  }
  return rate;
};

// Helper function to calculate rate based on distance
const getDistanceRate = (distance) => {
  let rate;
  if (distance <= 10) {
    rate = 5; // Base rate for distances up to 10km
  } else if (distance <= 50) {
    rate = 10 + (distance - 10) * 0.5; // Rate for distances between 10km and 50km, plus $0.5 per km over 10km
  } else {
    rate = 25 + (distance - 50) * 0.8; // Rate for distances over 50km, plus $0.8 per km over 50km
  }
  return rate;
};

// Helper function to calculate rate based on delivery speed
const getDeliverySpeedRate = (deliverySpeed) => {
  let rate;
  if (deliverySpeed === 'standard') {
    rate = 0; // No additional charge for standard delivery
  } else if (deliverySpeed === 'express') {
    rate = 10; // Additional charge for express delivery
  } else if (deliverySpeed === 'sameday') {
    rate = 20; // Additional charge for same-day delivery
  }
  return rate;
};

// Helper function to calculate rate based on delivery location
const getDeliveryLocationRate = (deliveryLocation) => {
  let rate;
  if (deliveryLocation === 'urban') {
    rate = 0; // No additional charge for urban areas
  } else if (deliveryLocation === 'suburban') {
    rate = 5; // Additional charge for suburban areas
  } else if (deliveryLocation === 'rural') {
    rate = 10; // Additional charge for rural areas
  }
  return rate;
};

return (
    <div className={`price-calculator-modal ${isOpen ? 'open' : ''}`}>
      <div className="price-calculator-modal-content">
        <span className="price-calculator-close" onClick={onClose}>
          &times;
        </span>
        <h2>Get A Quote:</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="weight">
              <b>What is the weight? (in kg):</b>
            </label>
            <br />
            <br />
            <input
              type="number"
              id="weight"
              placeholder="What do you estimate the weight to be?"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </div>
          <br />
          <div>
            <label htmlFor="distance">
              <b>What is the distance? (in km):</b>
            </label>
            <br />
            <br />
            <input
              type="number"
              id="distance"
              placeholder="What do you estimate the distance to be?"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              required
            />
          </div>
          <br />
          <div className="delivery-options">
            <label>
              <b>Select Delivery Speed:</b>
            </label>
            <br />
            <br />
            <label>
              <input
                type="radio"
                value="standard"
                checked={deliverySpeed === 'standard'}
                onChange={() => setDeliverySpeed('standard')}
              />
              Standard
            </label>
            <label>
              <input
                type="radio"
                value="express"
                checked={deliverySpeed === 'express'}
                onChange={() => setDeliverySpeed('express')}
              />
              Express
            </label>
            <label>
              <input
                type="radio"
                value="sameday"
                checked={deliverySpeed === 'sameday'}
                onChange={() => setDeliverySpeed('sameday')}
              />
              Same Day
            </label>
          </div>
          <br />
          <div className="delivery-options">
            <label>
              <b>Select Delivery Location:</b>
            </label>
            <br />
            <br />
            <label>
              <input
                type="radio"
                value="urban"
                checked={deliveryLocation === 'urban'}
                onChange={() => setDeliveryLocation('urban')}
              />
              Urban
            </label>
            <label>
              <input
                type="radio"
                value="suburban"
                checked={deliveryLocation === 'suburban'}
                onChange={() => setDeliveryLocation('suburban')}
              />
              Suburban
            </label>
            <label>
              <input
                type="radio"
                value="rural"
                checked={deliveryLocation === 'rural'}
                onChange={() => setDeliveryLocation('rural')}
              />
              Rural
            </label>
          </div>
          <br />
          {estimatedPrice !== null && (
            <div className="estimated-price">
              <p>Estimated Price: {estimatedPrice} Ksh</p>
            </div>
          )}
          <br />
          <div className="calculate-button-container">
            <button type="submit" className="calculate-button">
              Calculate Price
            </button>
            <br />
            <button type="button" className="create-order-button">
              <a href="/new-delivery-order">Create Order</a>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PriceCalculatorForm;
