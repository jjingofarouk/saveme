
import React from 'react';
import useFirestore from '../../hooks/useFirestore';
import '../../App.css';

const AdminDashboard = () => {
  const { data: stats, loading, error } = useFirestore('stats');

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <div className="stats">
        <div>Total Users: {stats.users || 0}</div>
        <div>Active Requests: {stats.requests || 0}</div>
        <div>Total Donations: {stats.donations || 0}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;