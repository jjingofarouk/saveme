
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      element={
        user && roles.includes(user.role) ? (
          <Component user={user} />
        ) : (
          <Navigate to="/login" replace />
        )
      }
    />
  );
};

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <PrivateRoute path="/donor" component={DonorDashboard} roles={['donor']} />
          <PrivateRoute path="/recipient" component={RequestBlood} roles={['recipient']} />
          <PrivateRoute path="/admin" component={UserManagement} roles={['admin']} />
          <PrivateRoute path="/profile" component={Profile} roles={['donor', 'recipient', 'admin']} />
          <PrivateRoute path="/requests" component={RequestStatus} roles={['recipient']} />
          <PrivateRoute path="/emergency" component={EmergencyServices} roles={['donor', 'recipient', 'admin']} />
          <PrivateRoute path="/hospitals" component={Hospitals} roles={['donor', 'recipient', 'admin']} />
          <PrivateRoute path="/pharmacies" component={Pharmacies} roles={['donor', 'recipient', 'admin']} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;