import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import DonorProfile from '../components/donor/DonorProfile';
import DonorDashboard from '../components/donor/DonorDashboard';
import DonationHistory from '../components/donor/DonationHistory';
import '../../App.css';

const DonorPage = () => {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== 'donor') {
    return <p>Unauthorized</p>;
  }

  return (
    <div className="page">
      <h1>Donor Portal</h1>
      <DonorProfile />
      <DonorDashboard />
      <DonationHistory />
    </div>
  );
};

export default DonorPage;