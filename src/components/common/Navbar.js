
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { auth } from '../../services/firebaseConfig';
import NotificationPanel from './NotificationPanel';
import '../../styles/Navbar.css';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const history = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      history.push('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          SaveMe
        </Link>
        <button
          className={`navbar-toggle ${isOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
        <ul className="navbar-links">
          <li>
            <Link to="/" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          {user && user.role === 'donor' && (
            <li>
              <Link to="/donor" onClick={toggleMenu}>
                Donor Dashboard
              </Link>
            </li>
          )}
          {user && user.role === 'recipient' && (
            <>
              <li>
                <Link to="/recipient" onClick={toggleMenu}>
                  Request Blood
                </Link>
              </li>
              <li>
                <Link to="/requests" onClick={toggleMenu}>
                  Request Status
                </Link>
              </li>
            </>
          )}
          {user && user.role === 'admin' && (
            <li>
              <Link to="/admin" onClick={toggleMenu}>
                Admin
              </Link>
            </li>
          )}
          {user && (
            <>
              <li>
                <Link to="/profile" onClick={toggleMenu}>
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/emergency" onClick={toggleMenu}>
                  Emergency Services
                </Link>
              </li>
              <li>
                <Link to="/hospitals" onClick={toggleMenu}>
                  Hospitals
                </Link>
              </li>
              <li>
                <Link to="/pharmacies" onClick={toggleMenu}>
                  Pharmacies
                </Link>
              </li>
              <li className="notification-item">
                <NotificationPanel userId={user.uid} />
              </li>
            </>
          )}
          <li>
            {user ? (
              <button className="navbar-button" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link to="/login" onClick={toggleMenu}>
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;