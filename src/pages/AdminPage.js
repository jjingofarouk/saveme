import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AdminDashboard from '../components/admin/AdminDashboard';
import UserManagement from '../components/admin/UserManagement';
import Reports from '../components/admin/Reports';
import '../App.css';

const AdminPage = () => {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== 'admin') {
    return <p>Unauthorized</p>;
  }

  return (
    <div className="page">
      <h1>Admin Portal</h1>
      <AdminDashboard />
      <UserManagement />
      <Reports />
    </div>
  );
};

export default AdminPage;