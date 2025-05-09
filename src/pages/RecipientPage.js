import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import RecipientProfile from '../components/recipient/RecipientProfile';
import RequestBlood from '../components/recipient/RequestBlood';
import MatchResults from '../components/recipient/MatchResults';
import '../App.css';

const RecipientPage = () => {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== 'recipient') {
    return <p>Unauthorized</p>;
  }

  return (
    <div className="page">
      <h1>Recipient Portal</h1>
      <RecipientProfile />
      <RequestBlood />
      <MatchResults />
    </div>
  );
};

export default RecipientPage;