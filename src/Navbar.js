import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase';

function Navbar() {
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

  return (
    <nav className="navbar">
      <Link to="/" className="logo">Jravel</Link>
      {user && (
        <ul className="nav-links">
          <li><Link to="/main">Book</Link></li>
          <li><Link to="/itinerary-builder">Plan</Link></li>
        </ul>
      )}
      <div className="nav-actions">
        {user ? (
          <>
            <Link to="/my-details" className="login-btn">My Details</Link>
            <button className="login-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/login" className="signup-btn">Sign up</Link>
          </>
        )}
        <select className="lang-select">
          <option>EN</option>
          <option>FR</option>
          <option>DE</option>
        </select>
      </div>
    </nav>
  );
}

export default Navbar; 