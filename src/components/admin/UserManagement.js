
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import useFirestore from '../../hooks/useFirestore';
import { updateUserRole, deleteUser } from '../../services/authService';
import Button from '../common/Button';
import { db } from '../../services/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import '../../App.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserManagement = () => {
  const { data: users, loading, error } = useFirestore('users', true);
  const [updateError, setUpdateError] = useState('');
  const [stats, setStats] = useState({ users: 0, requests: 0, donations: 0 });

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'stats', 'global'), (doc) => {
      if (doc.exists()) setStats(doc.data());
    });
    return () => unsub();
  }, []);

  const handleRoleChange = async (userId, role) => {
    try {
      await updateUserRole(userId, role);
    } catch (err) {
      setUpdateError(err.message || 'Failed to update role');
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
    } catch (err) {
      setUpdateError(err.message || 'Failed to delete user');
    }
  };

  const chartData = {
    labels: ['Users', 'Requests', 'Donations'],
    datasets: [
      {
        label: 'Platform Stats',
        data: [stats.users, stats.requests, stats.donations],
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
      },
    ],
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="user-management">
      <h2>User Management</h2>
      {updateError && <p className="error">{updateError}</p>}
      <div className="analytics">
        <h3>Platform Analytics</h3>
        <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  aria-label={`Change role for ${user.email}`}
                >
                  <option value="donor">Donor</option>
                  <option value="recipient">Recipient</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td>
                <Button onClick={() => handleDelete(user.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;