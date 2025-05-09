import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getDonationHistory } from '../../services/donorService';
import '../../App.css';

const DonationHistory = () => {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getDonationHistory(user.id);
        setHistory(data);
      } catch (err) {
        setError('Failed to load history');
      }
    };
    fetchHistory();
  }, [user.id]);

  return (
    <div className="history">
      <h2>Donation History</h2>
      {error && <p className="error">{error}</p>}
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