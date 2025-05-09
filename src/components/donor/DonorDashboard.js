
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import useGeolocation from '../../hooks/useGeolocation';
import { getNearbyRequests } from '../../services/donorService';
import Button from '../common/Button';
import '../../App.css';
import 'leaflet/dist/leaflet.css';

const DonorDashboard = () => {
  const { location, error: geoError } = useGeolocation();
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(false);

  useEffect(() => {
    if (location) {
      const fetchRequests = async () => {
        try {
          const data = await getNearbyRequests(location);
          setRequests(data);
          setError('');
        } catch (err) {
          setError(err.message || 'Failed to load requests');
        }
      };
      fetchRequests();
    }
  }, [location, retry]);

  const handleRetry = () => {
    setRetry((prev) => !prev); // Trigger useEffect to retry fetching location
    setError('');
  };

  return (
    <div className="dashboard">
      <h2>Donor Dashboard</h2>
      {geoError && (
        <div className="error">
          <p>{geoError}</p>
          {geoError.includes('denied') && (
            <Button onClick={handleRetry}>Enable Location and Retry</Button>
          )}
        </div>
      )}
      {error && <p className="error">{error}</p>}
      {location ? (
        <MapContainer center={[location.lat, location.lng]} zoom={13} style={{ height: '400px' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <Marker position={[location.lat, location.lng]}>
            <Popup>Your Location</Popup>
          </Marker>
          {requests.map((req) => (
            <Marker key={req.id} position={[req.location?.lat || 0, req.location?.lng || 0]}>
              <Popup>
                Blood Type: {req.bloodType}<br />
                Urgency: {req.urgency}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <p>Waiting for location...</p>
      )}
    </div>
  );
};

export default DonorDashboard;