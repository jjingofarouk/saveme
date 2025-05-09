import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getRecipientProfile, updateRecipientProfile } from '../../services/recipientService';
import Button from '../common/Button';
import Input from '../common/Input';
import '../../App.css';

const RecipientProfile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    bloodType: '',
    medicalConditions: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getRecipientProfile(user.id);
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
      await updateRecipientProfile(user.id, profile);
      alert('Profile updated');
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  return (
    <div className="profile">
      <h2>Recipient Profile</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="bloodType"
          value={profile.bloodType}
          onChange={handleChange}
          placeholder="Blood Type (e.g., A+)"
        />
        <Input
          type="text"
          name="medicalConditions"
          value={profile.medicalConditions}
          onChange={handleChange}
          placeholder="Medical Conditions"
        />
        {error && <p className="error">{error}</p>}
        <Button type="submit">Update Profile</Button>
      </form>
    </div>
  );
};

export default RecipientProfile;