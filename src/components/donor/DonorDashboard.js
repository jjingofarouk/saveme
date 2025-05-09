
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import useGeolocation from '../../hooks/useGeolocation';
import { getNearbyRequests } from '../../services/donorService';
import '../../App.css';
import 'leaflet/dist/leaflet.css';

const DonorDashboard = () => {
  const { location, error: geoError } = useGeolocation();
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (location) {
      const fetchRequests = async () => {
        try {
          const data = await getNearbyRequests(location);
          setRequests(data);
        } catch (err) {
          setError(err.message || 'Failed to load requests');
        }
      };
      fetchRequests();
    }
  }, [location]);

  return (
    <div className="dashboard">
      <h2>Donor Dashboard</h2>
      {geoError && <p className="error">{geoError}</p>}
      {error && <p className="error">{error}</p>}
      {location && (
        <MapContainer center={[location.lat, location.lng]} zoom={13} style={{ height: '400px' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <Marker position={[location.lat, location.lng]}>
            <Popup>Your Location</Popup>
          </Marker>
          {requests.map((req) => (
            <Marker key={req.id} position={[req.location.lat, req.location.lng]}>
              <Popup>
                Blood Type: {req.bloodType}<br />
                Urgency: {req.urgency}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
};

export default DonorDashboard;