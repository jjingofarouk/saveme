
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { createBloodRequest } from '../../services/recipientService';
import Button from '../common/Button';
import Input from '../common/Input';
import useGeolocation from '../../hooks/useGeolocation';
import { BLOOD_TYPES } from '../../utils/constants';
import '../../App.css';

const RequestBlood = () => {
  const { user } = useContext(AuthContext);
  const { location, error: geoError } = useGeolocation();
  const [formData, setFormData] = useState({
    bloodType: '',
    urgency: 1,
    quantity: 1,
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location) {
      setError('Location not available');
      return;
    }

    try {
      await createBloodRequest({
        ...formData,
        recipientId: user.uid,
        location,
      });
      alert('Blood request created');
      setFormData({ bloodType: '', urgency: 1, quantity: 1 });
    } catch (err) {
      setError(err.message || 'Failed to create request');
    }
  };

  return (
    <div className="request-blood">
      <h2>Request Blood</h2>
      {geoError && <p className="error">{geoError}</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <select name="bloodType" value={formData.bloodType} onChange={handleChange}>
          <option value="">Select Blood Type</option>
          {BLOOD_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <Input
          type="number"
          name="urgency"
          value={formData.urgency}
          onChange={handleChange}
          placeholder="Urgency (1-10)"
          min="1"
          max="10"
        />
        <Input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Quantity (units)"
          min="1"
        />
        <Button type="submit">Submit Request</Button>
      </form>
    </div>
  );
};

export default RequestBlood;