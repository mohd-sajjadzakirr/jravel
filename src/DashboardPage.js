import React, { useEffect, useState } from 'react';
import './DashboardPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase';

function DashboardPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(u => setUser(u));
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  const username = user?.displayName || 'Traveler';
  const email = user?.email || 'sajjadzaki@gmail.com';

  return (
    <div className="dashboard-bg">
      <nav className="navbar dashboard-navbar">
        <Link to="/" className="logo">Jravel</Link>
        <div className="dashboard-profile">
          <span className="dashboard-email">{email}</span>
          <div className="dashboard-avatar">{username.charAt(0)}</div>
          <div className="dashboard-actions">
            <Link to="/my-details" className="login-btn">My Details</Link>
            <button className="login-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
      <div className="dashboard-content">
        <h2 className="dashboard-welcome">Welcome back, {username}!</h2>
        <div className="dashboard-cards">
          {/* Plan Your Adventure Card */}
          <div className="dashboard-card adventure-card">
            <div className="dashboard-card-icon">
              {/* Animated Compass SVG */}
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="compass-svg">
                <circle cx="24" cy="24" r="20" stroke="#fff" strokeWidth="4" fill="#4CA1AF" className="compass-pulse" />
                <polygon points="24,12 28,28 24,24 20,28" fill="#fff" stroke="#2C3E50" strokeWidth="2" />
              </svg>
            </div>
            <h3>Plan Your Adventure</h3>
            <ul>
              <li>AI-Powered Itinerary Generator</li>
              <li>Collaborative Trip Planning</li>
              <li>Personalized Travel Ideas</li>
            </ul>
            <button className="dashboard-btn adventure-btn" onClick={() => navigate('/itinerary-builder')}>Design Your Journey</button>
          </div>
          {/* Book Your Trip Card */}
          <div className="dashboard-card booking-card">
            <div className="dashboard-card-icon">
              {/* Animated Suitcase SVG */}
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="suitcase-svg">
                <rect x="10" y="18" width="28" height="18" rx="4" fill="#FF7E5F" stroke="#fff" strokeWidth="3" />
                <rect x="18" y="12" width="12" height="6" rx="2" fill="#FEB47B" stroke="#fff" strokeWidth="2" className="suitcase-handle" />
              </svg>
            </div>
            <h3>Book Your Trip</h3>
            <ul>
              <li>Hotel Reservations</li>
              <li>Flight Bookings</li>
              <li>Train Tickets</li>
            </ul>
            <button className="dashboard-btn booking-btn" onClick={() => navigate('/main')}>Book Now</button>
          </div>
        </div>
      </div>
      <footer className="dashboard-footer">
        <span>© 2025 Jravel. All rights reserved.</span>
        <div className="dashboard-socials">
          <a href="#" aria-label="Facebook">📘</a>
          <a href="#" aria-label="Instagram">📸</a>
          <a href="#" aria-label="Twitter">🐦</a>
        </div>
      </footer>
    </div>
  );
}

export default DashboardPage; 