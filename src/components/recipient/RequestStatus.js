
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../services/firebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import '../../App.css';

const RequestStatus = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'requests'), where('recipientId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reqs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRequests(reqs);
    });
    return () => unsubscribe();
  }, [user.uid]);

  const getStatus = (req) => {
    if (req.fulfilled) return 'Fulfilled';
    if (req.matched) return 'Matched';
    return 'Pending';
  };

  return (
    <div className="request-status">
      <h2>Your Blood Requests</h2>
      {requests.length === 0 ? (
        <p>No requests found</p>
      ) : (
        <ul>
          {requests.map((req) => (
            <li key={req.id} className="request-item">
              <p>Blood Type: {req.bloodType}</p>
              <p>Urgency: {req.urgency}</p>
              <p>Status: {getStatus(req)}</p>
              <p>Created: {new Date(req.createdAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RequestStatus;