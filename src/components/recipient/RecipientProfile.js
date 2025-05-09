
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { updateRecipientProfile } from '../../services/recipientService';
import Button from '../common/Button';
import Input from '../common/Input';
import useFirestore from '../../hooks/useFirestore';
import '../../App.css';

const RecipientProfile = () => {
  const { user } = useContext(AuthContext);
  const { data: profile, loading, error } = useFirestore(`recipients/${user.uid}`);
  const [formData, setFormData] = useState({
    bloodType: '',
    medicalConditions: '',
  });
  const [updateError, setUpdateError] = useState('');

  React.useEffect(() => {
    if (profile) {
      setFormData({
        bloodType: profile.bloodType || '',
        medicalConditions: profile.medicalConditions || '',
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateRecipientProfile(user.uid, formData);
      alert('Profile updated');
    } catch (err) {
      setUpdateError(err.message || 'Failed to update profile');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="profile">
      <h2>Recipient Profile</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="bloodType"
          value={formData.bloodType}
          onChange={handleChange}
          placeholder="Blood Type (e.g., A+)"
        />
        <Input
          type="text"
          name="medicalConditions"
          value={formData.medicalConditions}
          onChange={handleChange}
          placeholder="Medical Conditions"
        />
        {updateError && <p className="error">{updateError}</p>}
        <Button type="submit">Update Profile</Button>
      </form>
    </div>
  );
};

export default RecipientProfile;