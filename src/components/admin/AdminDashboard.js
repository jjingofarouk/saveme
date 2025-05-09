import React, { useState, useEffect } from 'react';
import { getStats } from '../../services/adminService';
import '../../App.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, requests: 0, donations: 0 });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStats();
        setStats(data);
      } catch (err) {
        setError('Failed to load stats');
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      {error && <p className="error">{error}</p>}
      <div className="stats">
        <div>Total Users: {stats.users}</div>
        <div>Active Requests: {stats.requests}</div>
        <div>Total Donations: {stats.donations}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;