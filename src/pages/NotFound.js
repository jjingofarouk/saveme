import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const NotFound = () => (
  <div className="page">
    <h1>404 - Page Not Found</h1>
    <Link to="/">Go Home</Link>
  </div>
);

export default NotFound;