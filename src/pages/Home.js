import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

const Home = () => (
  <div className="home">
    <h1>Welcome to BloodMatch Uganda</h1>
    <p>Connecting donors and recipients in real-time.</p>
    <div className="cta">
      <Link to="/register">Join as Donor</Link>
      <Link to="/login">Login</Link>
    </div>
  </div>
);

export default Home;