```javascript
import React from 'react';
import { contacts } from '../../data/emergencyServices';
import '../../App.css';

const EmergencyServices = () => {
  return (
    <div className="emergency-services">
      <h2>Emergency Services</h2>
      <ul>
        {contacts.map((service, index) => (
          <li key={index} className="service-item">
            <h3>{service.name}</h3>
            <p><strong>Address:</strong> {service.address}</p>
            <p><strong>Contact:</strong> {service.contact.join(', ')}</p>
            {service.tollFree && <p><strong>Toll Free:</strong> {service.tollFree}</p>}
            {service.emergencyContact && (
              <p><strong>Emergency Contact:</strong> {service.emergencyContact.join(', ')}</p>
            )}
            {service.email && (
              <p><strong>Email:</strong> <a href={`mailto:${service.email}`}>{service.email}</a></p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmergencyServices;
