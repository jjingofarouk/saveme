
import React from 'react';
import { pharmacies } from './DataPharmacies';
import '../../App.css';

const Pharmacies = () => {
  return (
    <div className="pharmacies">
      <h2>Pharmacies</h2>
      <ul>
        {pharmacies.map((pharmacy, index) => (
          <li key={index} className="pharmacy-item">
            <h3>{pharmacy.name}</h3>
            <p><strong>Address:</strong> {pharmacy.address}</p>
            <p><strong>Phone:</strong> {pharmacy.phone}</p>
            <p><strong>Specialties:</strong> {pharmacy.specialties}</p>
            {pharmacy.description && <p><strong>Description:</strong> {pharmacy.description}</p>}
            {pharmacy.image_url && (
              <img src={pharmacy.image_url} alt={pharmacy.name} className="pharmacy-img" />
            )}
            {pharmacy.link && (
              <p><strong>Profile:</strong> <a href={pharmacy.link} target="_blank" rel="noopener noreferrer">View Profile</a></p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pharmacies;