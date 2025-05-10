
import React, { useState, useEffect } from 'react';
import { db, storage } from '../../services/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../../App.css';

const Profile = ({ user }) => {
  const [profile, setProfile] = useState({ name: '', bloodType: '', photoURL: '' });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userDoc = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user.uid]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userDoc = doc(db, 'users', user.uid);
      let photoURL = profile.photoURL;
      if (file) {
        const storageRef = ref(storage, `profile_photos/${user.uid}`);
        await uploadBytes(storageRef, file);
        photoURL = await getDownloadURL(storageRef);
      }
      await updateDoc(userDoc, { ...profile, photoURL });
      setLoading(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="profile">
      <h2>Profile</h2>
      <form onSubmit={handleUpdate}>
        <label>
          Name:
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
        </label>
        <label>
          Blood Type:
          <select
            value={profile.bloodType}
            onChange={(e) => setProfile({ ...profile, bloodType: e.target.value })}
          >
            <option value="">Select</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </label>
        <label>
          Profile Photo:
          <input type="file" onChange={handleFileChange} />
        </label>
        {profile.photoURL && <img src={profile.photoURL} alt="Profile" className="profile-img" />}
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default Profile;