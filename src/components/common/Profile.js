
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { updateDonorProfile, updateRecipientProfile } from '../../services/donorService';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Input from './Input';
import Button from './Button';
import '../../App.css';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    bloodType: '',
    medicalHistory: '',
    photoURL: '',
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [eligibility, setEligibility] = useState(null);

  useEffect(() => {
    // Calculate donation eligibility (56 days since last donation)
    const checkEligibility = async () => {
      const donorDoc = await db.collection('donors').doc(user.uid).get();
      if (donorDoc.exists) {
        const { lastDonation } = donorDoc.data();
        if (lastDonation) {
          const daysSince = (Date.now() - lastDonation.toDate().getTime()) / (1000 * 60 * 60 * 24);
          setEligibility(daysSince >= 56 ? 'Eligible' : `Eligible in ${Math.ceil(56 - daysSince)} days`);
        } else {
          setEligibility('Eligible');
        }
      }
    };
    if (user.role === 'donor') checkEligibility();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let photoURL = formData.photoURL;
      if (file) {
        const storage = getStorage();
        const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
        await uploadBytes(storageRef, file);
        photoURL = await getDownloadURL(storageRef);
      }
      const profileData = { ...formData, photoURL };
      if (user.role === 'donor') {
        await updateDonorProfile(user.uid, profileData);
      } else {
        await updateRecipientProfile(user.uid, profileData);
      }
      alert('Profile updated');
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    }
  };

  return (
    <div className="profile">
      <h2>Update Profile</h2>
      {error && <p className="error">{error}</p>}
      {eligibility && <p>Donation Status: {eligibility}</p>}
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
          name="medicalHistory"
          value={formData.medicalHistory}
          onChange={handleChange}
          placeholder="Medical History"
        />
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          aria-label="Upload profile picture"
        />
        {formData.photoURL && <img src={formData.photoURL} alt="Profile" className="profile-img" />}
        <Button type="submit">Save Profile</Button>
      </form>
    </div>
  );
};

export default Profile;