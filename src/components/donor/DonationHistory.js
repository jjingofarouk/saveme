
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import useFirestore from '../../hooks/useFirestore';
import '../../App.css';

const DonationHistory = () => {
  const { user } = useContext(AuthContext);
  const { data: history, loading, error } = useFirestore(`donors/${user.uid}/donations`, true);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="history">
      <h2>Donation History</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Recipient</th>
            <th>Blood Type</th>
          </tr>
        </thead>
        <tbody>
          {history.map((donation) => (
            <tr key={donation.id}>
              <td>{new Date(donation.date).toLocaleDateString()}</td>
              <td>{donation.recipientName}</td>
              <td>{donation.bloodType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonationHistory;