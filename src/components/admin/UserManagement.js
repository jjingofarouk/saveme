
import React from 'react';
import useFirestore from '../../hooks/useFirestore';
import { updateUserRole, deleteUser } from '../../services/authService';
import Button from '../common/Button';
import '../App.css';

const UserManagement = () => {
  const { data: users, loading, error } = useFirestore('users', true);
  const [updateError, setUpdateError] = useState('');

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="user-management">
      <h2>User Management</h2>
      {updateError && <p className="error">{updateError}</p>}
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
