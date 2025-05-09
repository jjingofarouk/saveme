
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import useFirestore from '../../hooks/useFirestore';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import '../App.css';
import 'leaflet/dist/leaflet.css';

const MatchResults = () => {
  const { user } = useContext(AuthContext);
  const { data: matches, loading, error } = useFirestore(`recipients/${user.uid}/matches`, true);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="match-results">
      <h2>Matched Donors</h2>
      <MapContainer center={[0.3476, 32.5825]} zoom={13} style={{ height: '400px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {matches.map((match) => (
          <Marker key={match.id} position={[match.donor.location.lat, match.donor.location.lng]}>
            <Popup>
              Donor: {match.donor.name}<br />
              Blood Type: {match.donor.bloodType}<br />
              Distance: {match.distance} km
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <ul>
        {matches.map((match) => (
          <li key={match.id}>
            {match.donor.name} ({match.donor.bloodType}) - {match.distance} km
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchResults;