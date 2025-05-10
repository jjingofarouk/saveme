import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, Droplet, MapPin } from 'lucide-react';
import '../styles/Home.css';

const Home = () => (
  <div className="home-container">
    <div className="hero-section">
      <h1>Welcome to BloodMatch Uganda</h1>
      <p>Connecting donors and recipients in real-time to save lives across Uganda.</p>
      <div className="cta">
        <Link to="/register">Join as Donor</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
    <div className="about-section">
      <h2>About BloodMatch</h2>
      <p>
        BloodMatch Uganda is an enterprise-grade platform designed to streamline blood donation and distribution. Our mission is to bridge the gap between blood donors and recipients, ensuring timely access to safe blood supplies across Uganda's healthcare system.
      </p>
      <div className="features">
        <div className="feature-card">
          <Droplet size={32} />
          <h3>Real-Time Matching</h3>
          <p>Instantly connect donors with hospitals and recipients based on blood type and location.</p>
        </div>
        <div className="feature-card">
          <Users size={32} />
          <h3>Community Driven</h3>
          <p>Join a network of thousands of donors and healthcare professionals dedicated to saving lives.</p>
        </div>
        <div className="feature-card">
          <Heart size={32} />
          <h3>Impact Tracking</h3>
          <p>Monitor your donation history and see the lives you've impacted through our platform.</p>
        </div>
        <div className="feature-card">
          <MapPin size={32} />
          <h3>Nationwide Coverage</h3>
          <p>Supporting hospitals and clinics across Uganda with a robust, scalable system.</p>
        </div>
      </div>
    </div>
    <div className="footer-section">
      <p>Contact us at <a href="mailto:support@bloodmatch.ug">support@bloodmatch.ug</a> or call +256 123 456 789</p>
      <p>&copy; 2025 BloodMatch Uganda. All rights reserved.</p>
    </div>
  </div>
);

export default Home;