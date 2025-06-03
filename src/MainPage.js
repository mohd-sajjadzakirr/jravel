import React, { useState } from 'react';
import './MainPage.css';
import { Link } from 'react-router-dom';

const tabs = [
  { label: 'Flights', icon: '✈️' },
  { label: 'Hotels', icon: '🏨' },
  { label: 'Homestays & Villas', icon: '🏡' },
  { label: 'Holiday Packages', icon: '🎒' },
  { label: 'Trains', icon: '🚄' },
  { label: 'Buses', icon: '🚌' },
  { label: 'Cabs', icon: '🚕' },
  { label: 'Visa', icon: '🛂' },
  { label: 'Forex Card & Currency', icon: '💳' },
  { label: 'Travel Insurance', icon: '🛡️' },
];

function MainPage() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="main-bg">
      <nav className="navbar">
        <Link to="/" className="logo">Jravel</Link>
        <ul className="nav-links">
          <li>Destinations</li>
          <li>Hotels</li>
          <li>Flights</li>
          <li>Bookings</li>
        </ul>
        <div className="nav-actions">
          <Link to="/" className="login-btn">Logout</Link>
        </div>
      </nav>
      <div className="main-content">
        <div className="main-tabs">
          {tabs.map((tab, idx) => (
            <button
              key={tab.label}
              className={`main-tab${activeTab === idx ? ' active' : ''}`}
              onClick={() => setActiveTab(idx)}
            >
              <span className="main-tab-icon">{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.label === 'Visa' && <span className="main-tab-new">new</span>}
            </button>
          ))}
        </div>
        <div className="main-search-card">
          <form className="main-search-form">
            <div className="main-search-row">
              <div className="main-search-field">
                <label>From</label>
                <input type="text" placeholder="Delhi" defaultValue="Delhi" />
              </div>
              <div className="main-search-field">
                <label>To</label>
                <input type="text" placeholder="Bengaluru" defaultValue="Bengaluru" />
              </div>
              <div className="main-search-field">
                <label>Departure</label>
                <input type="date" />
              </div>
              <div className="main-search-field">
                <label>Return</label>
                <input type="date" />
              </div>
              <div className="main-search-field">
                <label>Travellers</label>
                <input type="number" min="1" defaultValue="1" />
              </div>
            </div>
            <button className="main-search-btn" type="submit">SEARCH</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MainPage; 