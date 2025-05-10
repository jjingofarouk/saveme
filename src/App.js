
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
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
import Signup from './components/auth/Signup';
import './App.css';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        user && roles.includes(user.role) ? (
          <Component {...props} user={user} />
        ) : (
          <Redirect to="/login" />
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
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/donor" component={DonorDashboard} roles={['donor']} />
          <PrivateRoute path="/recipient" component={RequestBlood} roles={['recipient']} />
          <PrivateRoute path="/admin" component={UserManagement} roles={['admin']} />
          <PrivateRoute path="/profile" component={Profile} roles={['donor', 'recipient', 'admin']} />
          <PrivateRoute path="/requests" component={RequestStatus} roles={['recipient']} />
          <PrivateRoute path="/emergency" component={EmergencyServices} roles={['donor', 'recipient', 'admin']} />
          <PrivateRoute path="/hospitals" component={Hospitals} roles={['donor', 'recipient', 'admin']} />
          <PrivateRoute path="/pharmacies" component={Pharmacies} roles={['donor', 'recipient', 'admin']} />
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;