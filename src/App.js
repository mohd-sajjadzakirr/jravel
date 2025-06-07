import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import DashboardPage from './DashboardPage';
import MyDetailsPage from './MyDetailsPage';
import Navbar from './Navbar';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

function LandingPage() {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (u) => {
      setUser(u);
      if (u) {
        // Try to get name from Firestore
        const ref = doc(db, 'users', u.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          if (data.firstName || data.lastName) {
            setUserName(`${data.firstName || ''} ${data.lastName || ''}`.trim());
            return;
          }
        }
        setUserName(u.displayName || u.email || '');
      } else {
        setUserName('');
      }
    });
    return () => unsub();
  }, []);

  return (
    <>
      {userName && (
        <div style={{textAlign:'center', marginTop: '32px', marginBottom: '18px'}}>
          <h2 style={{fontWeight:700, fontSize:'2rem', color:'#223a5f', letterSpacing:'0.5px'}}>Welcome, {userName}!</h2>
        </div>
      )}
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

function ItineraryBuilderPage() {
  const navigate = useNavigate();
  // Optionally, you can fetch user info here if needed for personalization
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #e0f7fa 60%, #fff 100%)', padding: '48px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: '40px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Plan Trip Card */}
        <div style={{ flex: '1 1 300px', background: 'linear-gradient(135deg, #47b5ff 0%, #2563eb 100%)', borderRadius: 24, boxShadow: '0 4px 24px rgba(71,181,255,0.10)', padding: 36, color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 280 }}>
          <span style={{ fontSize: 48, marginBottom: 18 }}>🗺️</span>
          <h2 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: 16 }}>Plan Your Trip</h2>
          <p style={{ marginBottom: 24, textAlign: 'center' }}>Create a custom itinerary, add destinations, and organize your travel schedule step by step.</p>
          <button onClick={() => navigate('/trips/new')} style={{ background: '#fff', color: '#2563eb', border: '2px solid #2563eb', borderRadius: 999, padding: '12px 36px', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(71,181,255,0.10)', transition: 'background 0.2s, color 0.2s' }}>Start Planning</button>
        </div>
        {/* AI Suggestions Card */}
        <div style={{ flex: '1 1 300px', background: 'linear-gradient(135deg, #ff715b 0%, #ff9472 100%)', borderRadius: 24, boxShadow: '0 4px 24px rgba(255,113,91,0.10)', padding: 36, color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 280 }}>
          <span style={{ fontSize: 48, marginBottom: 18 }}>🤖</span>
          <h2 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: 16 }}>AI Suggestions</h2>
          <p style={{ marginBottom: 24, textAlign: 'center' }}>Get smart recommendations for destinations, activities, and routes based on your interests and travel history.</p>
          <button style={{ background: '#fff', color: '#ff715b', border: 'none', borderRadius: 999, padding: '12px 36px', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(255,113,91,0.10)', transition: 'background 0.2s, color 0.2s' }}>Get AI Suggestions</button>
        </div>
        {/* Personalized Travel Ideas Card */}
        <div style={{ flex: '1 1 300px', background: 'linear-gradient(135deg, #4CA1AF 0%, #2C3E50 100%)', borderRadius: 24, boxShadow: '0 4px 24px rgba(44,161,175,0.10)', padding: 36, color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 280 }}>
          <span style={{ fontSize: 48, marginBottom: 18 }}>💡</span>
          <h2 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: 16 }}>Personalized Travel Ideas</h2>
          <p style={{ marginBottom: 24, textAlign: 'center' }}>Explore unique travel ideas and inspiration tailored just for you, based on your profile and preferences.</p>
          <button style={{ background: '#fff', color: '#2C3E50', border: 'none', borderRadius: 999, padding: '12px 36px', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(44,161,175,0.10)', transition: 'background 0.2s, color 0.2s' }}>Show Ideas</button>
        </div>
      </div>
    </div>
  );
}

function TripCreatePage() {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !startDate || !endDate) {
      setError('Please fill all fields.');
      return;
    }
    if (!user) {
      setError('You must be logged in.');
      return;
    }
    setLoading(true);
    try {
      const tripsRef = collection(db, 'trips');
      const docRef = await addDoc(tripsRef, {
        name,
        startDate,
        endDate,
        createdBy: user.uid,
        members: { [user.uid]: 'admin' },
        createdAt: serverTimestamp(),
      });
      navigate(`/trips/${docRef.id}`);
    } catch (err) {
      setError('Error creating trip.');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #e0f7fa 60%, #fff 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 24, boxShadow: '0 4px 24px rgba(71,181,255,0.10)', padding: 40, minWidth: 340, maxWidth: 400, width: '100%', display: 'flex', flexDirection: 'column', gap: 22 }}>
        <h2 style={{ textAlign: 'center', color: '#223a5f', fontWeight: 700, marginBottom: 12 }}>Create a New Trip</h2>
        <label style={{ fontWeight: 600, color: '#2563eb' }}>Trip Name</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Summer in Italy" style={{ padding: '12px 16px', borderRadius: 12, border: '1px solid #e0e0e0', fontSize: '1rem' }} />
        <label style={{ fontWeight: 600, color: '#2563eb' }}>Start Date</label>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={{ padding: '12px 16px', borderRadius: 12, border: '1px solid #e0e0e0', fontSize: '1rem' }} />
        <label style={{ fontWeight: 600, color: '#2563eb' }}>End Date</label>
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} style={{ padding: '12px 16px', borderRadius: 12, border: '1px solid #e0e0e0', fontSize: '1rem' }} />
        {error && <div style={{ color: '#ff715b', textAlign: 'center', marginTop: 8 }}>{error}</div>}
        <button type="submit" disabled={loading} style={{ background: 'linear-gradient(90deg, #47b5ff 0%, #2563eb 100%)', color: '#fff', border: 'none', borderRadius: 999, padding: '14px 0', fontWeight: 700, fontSize: '1.1rem', marginTop: 18, cursor: 'pointer', boxShadow: '0 2px 8px rgba(71,181,255,0.10)', transition: 'background 0.2s' }}>{loading ? 'Creating...' : 'Create Trip'}</button>
      </form>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/my-details" element={<MyDetailsPage />} />
        <Route path="/itinerary-builder" element={<ItineraryBuilderPage />} />
        <Route path="/trips/new" element={<TripCreatePage />} />
      </Routes>
    </Router>
  );
}

export default App;
