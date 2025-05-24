import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { auth } from '../../services/firebaseConfig';
import NotificationPanel from './NotificationPanel';
import { 
  Home, 
  Droplet, 
  ClipboardList, 
  User, 
  LogOut, 
  LogIn, 
  Menu, 
  X, 
  AlertTriangle, 
  Building2, 
  PlusSquare 
} from 'lucide-react';
import '../../styles/Navbar.css';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const navbarRef = useRef(null);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
      setIsOpen(false);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Handle scroll effect for sticky navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target) && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav 
      ref={navbarRef}
      className={`navbar ${scrollPosition > 20 ? 'navbar-scrolled' : ''}`} 
      role="navigation" 
      aria-label="Main navigation"
    >
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <Droplet className="navbar-logo-icon" aria-hidden="true" />
            <span className="navbar-logo-text">BloodMatch</span>
          </Link>
          <button
            className="navbar-toggle"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <ul className="navbar-links">
            <li>
              <Link to="/" onClick={closeMenu} className={`navbar-link ${isActive('/')}`}>
                <Home size={20} aria-hidden="true" />
                <span>Home</span>
              </Link>
            </li>
            {user && user.role === 'donor' && (
              <li>
                <Link to="/donor" onClick={closeMenu} className={`navbar-link ${isActive('/donor')}`}>
                  <Droplet size={20} aria-hidden="true" />
                  <span>Donor Dashboard</span>
                </Link>
              </li>
            )}
            {user && user.role === 'recipient' && (
              <>
                <li>
                  <Link to="/recipient" onClick={closeMenu} className={`navbar-link ${isActive('/recipient')}`}>
                    <Droplet size={20} aria-hidden="true" />
                    <span>Request Blood</span>
                  </Link>
                </li>
                <li>
                  <Link to="/requests" onClick={closeMenu} className={`navbar-link ${isActive('/requests')}`}>
                    <ClipboardList size={20} aria-hidden="true" />
                    <span>Request Status</span>
                  </Link>
                </li>
              </>
            )}
            {user && user.role === 'admin' && (
              <li>
                <Link to="/admin" onClick={closeMenu} className={`navbar-link ${isActive('/admin')}`}>
                  <User size={20} aria-hidden="true" />
                  <span>Admin</span>
                </Link>
              </li>
            )}
            {user && (
              <>
                <li>
                  <Link to="/profile" onClick={closeMenu} className={`navbar-link ${isActive('/profile')}`}>
                    <User size={20} aria-hidden="true" />
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <Link to="/emergency" onClick={closeMenu} className={`navbar-link emergency-link ${isActive('/emergency')}`}>
                    <AlertTriangle size={20} aria-hidden="true" />
                    <span>Emergency</span>
                  </Link>
                </li>
                <li>
                  <Link to="/hospitals" onClick={closeMenu} className={`navbar-link ${isActive('/hospitals')}`}>
                    <Building2 size={20} aria-hidden="true" />
                    <span>Hospitals</span>
                  </Link>
                </li>
                <li>
                  <Link to="/pharmacies" onClick={closeMenu} className={`navbar-link ${isActive('/pharmacies')}`}>
                    <PlusSquare size={20} aria-hidden="true" />
                    <span>Pharmacies</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
          <div className="navbar-end">
            {user && (
              <div className="notification-wrapper">
                <NotificationPanel userId={user.uid} />
              </div>
            )}
            {user ? (
              <button className="navbar-button logout-button" onClick={handleLogout}>
                <LogOut size={20} aria-hidden="true" />
                <span className="button-text">Logout</span>
              </button>
            ) : (
              <Link to="/login" onClick={closeMenu} className="navbar-button login-button">
                <LogIn size={20} aria-hidden="true" />
                <span className="button-text">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;