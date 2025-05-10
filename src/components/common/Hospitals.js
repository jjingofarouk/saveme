
import React from 'react';
import { hospitals } from './DataHospitals';
import '../../App.css';

const Hospitals = () => {
  return (
    <div className="hospitals">
      <h2>Hospitals</h2>
      <ul>
        {hospitals.map((hospital, index) => (
          <li key={index} className="hospital-item">
            <h3>{hospital.name}</h3>
            <p><strong>Address:</strong> {hospital.address}</p>
            <p><strong>Phone:</strong> {hospital.phone}</p>
            {hospital.description && <p><strong>Description:</strong> {hospital.description}</p>}
            {hospital.photo && (
              <img src={hospital.photo} alt={hospital.name} className="hospital-img" />
            )}
            {hospital.profile_url && (
              <p><strong>Profile:</strong> <a href={hospital.profile_url} target="_blank" rel="noopener noreferrer">View Profile</a></p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Hospitals;