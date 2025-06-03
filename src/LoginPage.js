import React from 'react';
import './LoginPage.css';

function LoginPage() {
  return (
    <div className="login-bg">
      <div className="login-container">
        <div className="login-left">
          <img className="login-image" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="Travel" />
          <div className="login-quote">TRAVEL IS THE ONLY THING YOU BUY THAT MAKES YOU RICHER</div>
        </div>
        <div className="login-right">
          <div className="login-title">TRAVEL BLOGGER</div>
          <div className="login-socials">
            <span className="login-social-icon">f</span>
            <span className="login-social-icon">G</span>
            <span className="login-social-icon">in</span>
          </div>
          <form className="login-form">
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <div className="login-links">
              <a href="#">Forgot your password?</a>
            </div>
            <button type="submit" className="login-submit">ENTER</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage; 