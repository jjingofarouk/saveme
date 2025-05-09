
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { updateDonorProfile } from '../../services/donorService';
import Button from '../common/Button';
import Input from '../common/Input';
import useFirestore from '../../hooks/useFirestore';
import '../../App.css';

const DonorProfile = () => {
  const { user } = useContext(AuthContext);
  const { data: profile, loading, error } = useFirestore(`donors/${user.uid}`);
  const [formData, setFormData] = useState({
    bloodType: '',
    lastDonation: '',
    medicalHistory: '',
    availability: true,
  });
  const [updateError, setUpdateError] = useState('');

  React.useEffect(() => {
    if (profile) {
      setFormData({
        bloodType: profile.bloodType || '',
        lastDonation: profile.lastDonation || '',
        medicalHistory: profile.medicalHistory || '',
        availability: profile.availability !== undefined ? profile.availability : true,
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDonorProfile(user.uid, formData);
      alert('Profile updated');
    } catch (err) {
      setUpdateError(err.message || 'Failed to update profile');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="profile">
      <h2>Donor Profile</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="bloodType"
          value={formData.bloodType}
          onChange={handleChange}
          placeholder="Blood Type (e.g., A+)"
        />
        <Input
          type="date"
          name="lastDonation"
          value={formData.lastDonation}
          onChange={handleChange}
          placeholder="Last Donation"
        />
        <Input
          type="text"
          name="medicalHistory"
          value={formData.medicalHistory}
          onChange={handleChange}
          placeholder="Medical History"
        />
        <label>
          Available to Donate:
          <input
            type="checkbox"
            name="availability"
            checked={formData.availability}
            onChange={handleChange}
          />
        </label>
        {updateError && <p className="error">{updateError}</p>}
        <Button type="submit">Update Profile</Button>
      </form>
    </div>
  );
};

export default DonorProfile;