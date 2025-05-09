import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getDonorProfile, updateDonorProfile } from '../../services/donorService';
import Button from '../common/Button';
import Input from '../common/Input';
import '../../App.css';

const DonorProfile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    bloodType: '',
    lastDonation: '',
    medicalHistory: '',
    availability: true,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getDonorProfile(user.id);
        setProfile(data);
      } catch (err) {
        setError('Failed to load profile');
      }
    };
    fetchProfile();
  }, [user.id]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDonorProfile(user.id, profile);
      alert('Profile updated');
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  return (
    <div className="profile">
      <h2>Donor Profile</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="bloodType"
          value={profile.bloodType}
          onChange={handleChange}
          placeholder="Blood Type (e.g., A+)"
        />
        <Input
          type="date"
          name="lastDonation"
          value={profile.lastDonation}
          onChange={handleChange}
          placeholder="Last Donation"
        />
        <Input
          type="text"
          name="medicalHistory"
          value={profile.medicalHistory}
          onChange={handleChange}
          placeholder="Medical History"
        />
        <label>
          Available to Donate:
          <input
            type="checkbox"
            name="availability"
            checked={profile.availability}
            onChange={(e) => setProfile({ ...profile, availability: e.target.checked })}
          />
        </label>
        {error && <p className="error">{error}</p>}
        <Button type="submit">Update Profile</Button>
      </form>
    </div>
  );
};

export default DonorProfile;