import React, { useState, useEffect } from 'react';
import { getUsers, updateUserRole, deleteUser } from '../../services/adminService';
import Button from '../common/Button';
import '../../App.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setError('Failed to load users');
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, role) => {
    try {
      await updateUserRole(userId, { role });
      setUsers(users.map((u) => (u.id === userId ? { ...u, role } : u)));
    } catch (err) {
      setError('Failed to update role');
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((u) => u.id !== userId));
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>
      {error && <p className="error">{error}</p>}
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