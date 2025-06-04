import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import DashboardPage from './DashboardPage';
import MyDetailsPage from './MyDetailsPage';
import Navbar from './Navbar';

function LandingPage() {
  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h5 className="hero-tag">BEST DESTINATIONS AROUND THE WORLD</h5>
          <h1 className="hero-title">
            Travel, <span className="highlight">enjoy</span> and live a new and full life
          </h1>
          <p className="hero-desc">
            Built Wicket longer admire do barton vanity itself do in it. Preferred to sportsmen it engrossed listening. Park gate sell they west hard for the.
          </p>
          <div className="hero-cta">
            <button className="find-btn">Find out more</button>
            <button className="demo-btn">
              <span className="play-icon">▶</span> Play Demo
            </button>
          </div>
        </div>
        <img className="hero-img" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="Traveler" />
      </header>

      {/* Services/Features */}
      <section className="services">
        <h5 className="section-tag">CATEGORY</h5>
        <h2 className="section-title">We Offer Best Services</h2>
        <div className="service-cards">
          <div className="service-card">
            <span role="img" aria-label="weather">☀️</span>
            <h4>Calculated Weather</h4>
            <p>Built Wicket longer admire do barton vanity itself do in it.</p>
          </div>
          <div className="service-card">
            <span role="img" aria-label="flights">✈️</span>
            <h4>Best Flights</h4>
            <p>Engrossed listening. Park gate sell they west hard for the.</p>
          </div>
          <div className="service-card">
            <span role="img" aria-label="events">🎉</span>
            <h4>Local Events</h4>
            <p>Barton vanity itself do in it. Preferred to men it engrossed listening.</p>
          </div>
          <div className="service-card">
            <span role="img" aria-label="customization">⚙️</span>
            <h4>Customization</h4>
            <p>We deliver outsourced aviation services for military customers.</p>
          </div>
        </div>
      </section>

      {/* Top Destinations */}
      <section className="destinations">
        <h5 className="section-tag">Top Selling</h5>
        <h2 className="section-title">Top Destinations</h2>
        <div className="destination-cards">
          <div className="destination-card">
            <img src="https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=400&q=80" alt="Rome" />
            <div className="dest-info">
              <h4>Rome, Italy</h4>
              <p>$5.4k</p>
              <span>10 Days Trip</span>
            </div>
          </div>
          <div className="destination-card">
            <img src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=400&q=80" alt="London" />
            <div className="dest-info">
              <h4>London, UK</h4>
              <p>$4.2k</p>
              <span>12 Days Trip</span>
            </div>
          </div>
          <div className="destination-card">
            <img src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80" alt="Europe" />
            <div className="dest-info">
              <h4>Full Europe</h4>
              <p>$15k</p>
              <span>28 Days Trip</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Booking */}
      <section className="steps-section">
        <h5 className="section-tag">Easy and Fast</h5>
        <h2 className="section-title">Book your next trip in 3 easy steps</h2>
        <div className="steps-cards">
          <div className="step-card">
            <span className="step-icon">1</span>
            <div>
              <h4>Choose Destination</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
          <div className="step-card">
            <span className="step-icon">2</span>
            <div>
              <h4>Make Payment</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
          <div className="step-card">
            <span className="step-icon">3</span>
            <div>
              <h4>Reach Airport on Selected Date</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </div>
        <div className="trip-card">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80" alt="Trip to Greece" />
          <div className="trip-info">
            <h4>Trip To Greece</h4>
            <p>14-29 June | by Robbie</p>
            <div className="trip-progress">
              <span>Ongoing</span>
              <span className="progress-bar"><span className="progress" style={{width: '40%'}}></span></span>
              <span>Trip to Rome</span>
            </div>
            <span>24 people going</span>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <h5 className="section-tag">TESTIMONIALS</h5>
        <h2 className="section-title">What people say about Us.</h2>
        <div className="testimonials-carousel">
          <div className="testimonial-card">
            <img className="testimonial-avatar" src="https://randomuser.me/api/portraits/men/32.jpg" alt="Mike Taylor" />
            <p>"On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no."</p>
            <h4>Mike Taylor</h4>
            <span>Lahore, Pakistan</span>
          </div>
          <div className="testimonial-card">
            <img className="testimonial-avatar" src="https://randomuser.me/api/portraits/men/44.jpg" alt="Chris Thomas" />
            <p>"On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no."</p>
            <h4>Chris Thomas</h4>
            <span>CEO of Red Button</span>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="partners">
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Expedia_Logo.svg" alt="Expedia" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Qantas_Airways_Logo_2016.svg" alt="Qantas" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2d/Jetstar_Logo.svg" alt="Jetstar" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2e/Alitalia_Logo.svg" alt="Alitalia" />
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <h3>Subscribe to get information, latest news and other interesting offers about Jravel</h3>
        <form className="newsletter-form">
          <input type="email" placeholder="Your email" />
          <button type="submit">Subscribe</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-main">
          <div className="footer-logo">Jravel.</div>
          <div className="footer-links">
            <div>
              <h5>Company</h5>
              <ul>
                <li>About</li>
                <li>Careers</li>
                <li>Mobile</li>
              </ul>
            </div>
            <div>
              <h5>Contact</h5>
              <ul>
                <li>Help/FAQ</li>
                <li>Press</li>
                <li>Affiliates</li>
              </ul>
            </div>
            <div>
              <h5>More</h5>
              <ul>
                <li>Airlinefees</li>
                <li>Airline</li>
                <li>Low fare tips</li>
              </ul>
            </div>
          </div>
          <div className="footer-social">
            <a href="#"><span role="img" aria-label="facebook">📘</span></a>
            <a href="#"><span role="img" aria-label="instagram">📸</span></a>
            <a href="#"><span role="img" aria-label="twitter">🐦</span></a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>All rights reserved ©Jravel.co</span>
        </div>
      </footer>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<><Navbar /><DashboardPage /></>} />
        <Route path="/main" element={<><Navbar /><MainPage /></>} />
        <Route path="/my-details" element={<><Navbar /><MyDetailsPage /></>} />
      </Routes>
    </Router>
  );
}

export default App;
