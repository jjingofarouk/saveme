import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import DonorDashboard from './components/donor/DonorDashboard';
import RequestBlood from './components/recipient/RequestBlood';
import UserManagement from './components/admin/UserManagement';
import Profile from './components/common/Profile';
import RequestStatus from './components/recipient/RequestStatus';
import EmergencyServices from './components/common/EmergencyServices';
import Hospitals from './components/common/Hospitals';
import Pharmacies from './components/common/Pharmacies';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';

const PrivateRoute = ({ element, roles }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" replace />;
  if (!roles.includes(user.role)) return <Navigate to="/login" replace />;

  return element;
};

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/donor"
            element={<PrivateRoute roles={['donor']} element={<DonorDashboard />} />}
          />
          <Route
            path="/recipient"
            element={<PrivateRoute roles={['recipient']} element={<RequestBlood />} />}
          />
          <Route
            path="/admin"
            element={<PrivateRoute roles={['admin']} element={<UserManagement />} />}
          />
          <Route
            path="/profile"
            element={<PrivateRoute roles={['donor', 'recipient', 'admin']} element={<Profile />} />}
          />
          <Route
            path="/requests"
            element={<PrivateRoute roles={['recipient']} element={<RequestStatus />} />}
          />
          <Route
            path="/emergency"
            element={<PrivateRoute roles={['donor', 'recipient', 'admin']} element={<EmergencyServices />} />}
          />
          <Route
            path="/hospitals"
            element={<PrivateRoute roles={['donor', 'recipient', 'admin']} element={<Hospitals />} />}
          />
          <Route
            path="/pharmacies"
            element={<PrivateRoute roles={['donor', 'recipient', 'admin']} element={<Pharmacies />} />}
          />

          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;