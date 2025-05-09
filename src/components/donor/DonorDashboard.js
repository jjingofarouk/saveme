
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import useGeolocation from '../../hooks/useGeolocation';
import { getNearbyRequests } from '../../services/donorService';
import Button from '../common/Button';
import NotificationPanel from '../common/NotificationPanel';
import { BLOOD_TYPES } from '../../utils/constants';
import '../../App.css';
import 'leaflet/dist/leaflet.css';

const DonorDashboard = ({ user }) => {
  const { location, error: geoError } = useGeolocation();
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(false);
  const [bloodTypeFilter, setBloodTypeFilter] = useState('');
  const [showDirections, setShowDirections] = useState(null);

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
    setRetry((prev) => !prev);
    setError('');
  };

  const filteredRequests = bloodTypeFilter
    ? requests.filter((req) => req.bloodType === bloodTypeFilter)
    : requests;

  const getDirections = (reqLocation) => {
    if (!location) return;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${location.lat},${location.lng}&destination=${reqLocation.lat},${reqLocation.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="dashboard">
      <h2>Donor Dashboard</h2>
      <NotificationPanel userId={user.uid} />
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
        <>
          <div className="map-controls">
            <label htmlFor="bloodTypeFilter">Filter by Blood Type:</label>
            <select
              id="bloodTypeFilter"
              value={bloodTypeFilter}
              onChange={(e) => setBloodTypeFilter(e.target.value)}
            >
              <option value="">All</option>
              {BLOOD_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <MapContainer center={[location.lat, location.lng]} zoom={13} style={{ height: '400px' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <Marker position={[location.lat, location.lng]} icon={L.icon({ iconUrl: '/marker-icon.png', iconSize: [25, 41] })}>
              <Popup>Your Location</Popup>
            </Marker>
            {filteredRequests.map((req) => (
              <Marker
                key={req.id}
                position={[req.coordinates?.latitude || 0, req.coordinates?.longitude || 0]}
                icon={L.icon({ iconUrl: '/request-icon.png', iconSize: [25, 41] })}
              >
                <Popup>
                  Blood Type: {req.bloodType}<br />
                  Urgency: {req.urgency}<br />
                  <Button onClick={() => getDirections({ lat: req.coordinates.latitude, lng: req.coordinates.longitude })}>
                    Get Directions
                  </Button>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </>
      ) : (
        <p>Waiting for location...</p>
      )}
    </div>
  );
};

export default DonorDashboard;