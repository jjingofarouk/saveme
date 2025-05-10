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
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

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
            <Droplet className="navbar-logo-icon" />
            <span className="navbar-logo-text">BloodMatch</span>
          </Link>
          
          <button
            className={`navbar-toggle ${isOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <ul className="navbar-links">
            <li className={isActive('/')}>
              <Link to="/" onClick={closeMenu} className="navbar-link">
                <Home size={20} />
                <span>Home</span>
              </Link>
            </li>
            
            {user && user.role === 'donor' && (
              <li className={isActive('/donor')}>
                <Link to="/donor" onClick={closeMenu} className="navbar-link">
                  <Droplet size={20} />
                  <span>Donor Dashboard</span>
                </Link>
              </li>
            )}
            
            {user && user.role === 'recipient' && (
              <>
                <li className={isActive('/recipient')}>
                  <Link to="/recipient" onClick={closeMenu} className="navbar-link">
                    <Droplet size={20} />
                    <span>Request Blood</span>
                  </Link>
                </li>
                <li className={isActive('/requests')}>
                  <Link to="/requests" onClick={closeMenu} className="navbar-link">
                    <ClipboardList size={20} />
                    <span>Request Status</span>
                </Link>
              </li>
            </>
          )}
          
          {user && user.role === 'admin' && (
            <li className={isActive('/admin')}>
              <Link to="/admin" onClick={closeMenu} className="navbar-link">
                <User size={20} />
                <span>Admin</span>
              </Link>
            </li>
          )}
          
          {user && (
            <>
              <li className={isActive('/profile')}>
                <Link to="/profile" onClick={closeMenu} className="navbar-link">
                  <User size={20} />
                  <span>Profile</span>
                </Link>
              </li>
              <li className={isActive('/emergency')}>
                <Link to="/emergency" onClick={closeMenu} className="navbar-link emergency-link">
                  <AlertTriangle size={20} />
                  <span>Emergency</span>
                </Link>
              </li>
              <li className={isActive('/hospitals')}>
                <Link to="/hospitals" onClick={closeMenu} className="navbar-link">
                  <Building2 size={20} />
                  <span>Hospitals</span>
                </Link>
              </li>
              <li className={isActive('/pharmacies')}>
                <Link to="/pharmacies" onClick={closeMenu} className="navbar-link">
                  <PlusSquare size={20} />
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
              <LogOut size={20} />
              <span className="button-text">Logout</span>
            </button>
          ) : (
            <Link to="/login" onClick={closeMenu} className="navbar-button login-button">
              <LogIn size={20} />
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