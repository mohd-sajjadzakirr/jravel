import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import DashboardPage from './DashboardPage';
import MyDetailsPage from './MyDetailsPage';
import Navbar from './Navbar';
import { auth, db } from './firebase';
import { doc, getDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { AppBar, Toolbar, Typography, Tabs, Tab, Box, Avatar, IconButton, Drawer, List, ListItem, ListItemText, Button, Divider, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { onSnapshot, query, where, orderBy } from 'firebase/firestore';
import dayjs from 'dayjs';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloseIcon from '@mui/icons-material/Close';
import { updateDoc } from 'firebase/firestore';
import Menu from '@mui/material/Menu';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

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

function TripCreateModal({ open, onClose, onCreated }) {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(u => setUser(u));
    return () => unsub();
  }, []);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !startDate || !endDate) {
      setError('Please fill all fields.');
      return;
    }
    if (!user) {
      setError('You must be logged in to create a trip.');
      return;
    }
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, 'trips'), {
        name,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        createdBy: user.uid,
        createdAt: new Date(),
        updatedAt: new Date(),
        members: {
          [user.uid]: { role: 'admin', email: user.email }
        }
      });
      setName('');
      setStartDate('');
      setEndDate('');
      onClose && onClose();
      navigate(`/trips/${docRef.id}`);
    } catch (err) {
      setError('Error creating trip: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(34,58,95,0.18)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: 24, boxShadow: '0 4px 24px rgba(71,181,255,0.10)', padding: 40, minWidth: 340, maxWidth: 400, width: '100%', display: 'flex', flexDirection: 'column', gap: 22, position: 'relative' }}>
        <button type="button" onClick={onClose} style={{ position: 'absolute', top: 16, right: 18, background: 'none', border: 'none', fontSize: 22, color: '#888', cursor: 'pointer' }}>&times;</button>
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

function ItineraryBuilderPage() {
  const navigate = useNavigate();
  const [showTripModal, setShowTripModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [showPersonalizedModal, setShowPersonalizedModal] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #e0f7fa 60%, #fff 100%)', padding: '48px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: '40px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Plan Trip Card */}
        <div style={{ flex: '1 1 300px', background: 'linear-gradient(135deg, #47b5ff 0%, #2563eb 100%)', borderRadius: 24, boxShadow: '0 4px 24px rgba(71,181,255,0.10)', padding: 36, color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 280 }}>
          <span style={{ fontSize: 48, marginBottom: 16 }}>🗺️</span>
          <h2 style={{ fontWeight: 700, fontSize: 28, margin: '16px 0 8px 0' }}>Plan Your Trip</h2>
          <p style={{ fontSize: 16, marginBottom: 32, textAlign: 'center', color: '#eaf6fb' }}>
            Create a custom itinerary, add destinations, and organize your travel schedule step by step.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', width: '100%', justifyContent: 'center' }}>
            <button
              style={{
                background: '#fff',
                color: '#2563eb',
                border: 'none',
                borderRadius: 999,
                padding: '14px 36px',
                fontWeight: 700,
                fontSize: 18,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(71,181,255,0.10)',
                marginBottom: 8,
                transition: 'background 0.2s, color 0.2s, transform 0.2s',
              }}
              onClick={() => setShowTripModal(true)}
            >
              Create Trip
            </button>
            <button
              style={{
                background: 'linear-gradient(90deg, #47b5ff 0%, #2563eb 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: 999,
                padding: '14px 36px',
                fontWeight: 700,
                fontSize: 18,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(71,181,255,0.10)',
                marginBottom: 8,
                transition: 'background 0.2s, color 0.2s, transform 0.2s',
              }}
              onClick={() => navigate('/my-trips')}
            >
              My Trips
            </button>
          </div>
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
      <TripCreateModal open={showTripModal} onClose={() => setShowTripModal(false)} />
    </div>
  );
}

function AddActivityModal({ open, onClose, tripId, selectedDay, activity, onSave }) {
  const [title, setTitle] = useState(activity?.title || '');
  const [type, setType] = useState(activity?.type || '');
  const [time, setTime] = useState(activity ? dayjs(activity.date).format('HH:mm') : '');
  const [notes, setNotes] = useState(activity?.notes || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setTitle(activity?.title || '');
    setType(activity?.type || '');
    setTime(activity ? dayjs(activity.date).format('HH:mm') : '');
    setNotes(activity?.notes || '');
  }, [activity, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!title || !type || !time) {
      setError('Please fill all required fields');
      return;
    }
    setLoading(true);
    try {
      const activityDate = dayjs(selectedDay).format('YYYY-MM-DD') + 'T' + time;
      if (activity) {
        // Edit existing
        await updateDoc(doc(db, 'itineraryItems', activity.id), {
          title,
          type,
          date: activityDate,
          notes,
          updatedAt: new Date()
        });
      } else {
        // Add new
        await addDoc(collection(db, 'itineraryItems'), {
          tripId,
          title,
          type,
          date: activityDate,
          notes,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
      setTitle('');
      setType('');
      setTime('');
      setNotes('');
      onClose();
      if (onSave) onSave();
    } catch (err) {
      setError('Error saving activity: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{activity ? 'Edit Activity' : 'Add New Activity'}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Activity Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
          />
          <FormControl fullWidth required>
            <InputLabel>Activity Type</InputLabel>
            <Select
              value={type}
              label="Activity Type"
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="Flight">Flight</MenuItem>
              <MenuItem value="Hotel">Hotel</MenuItem>
              <MenuItem value="Sightseeing">Sightseeing</MenuItem>
              <MenuItem value="Restaurant">Restaurant</MenuItem>
              <MenuItem value="Transportation">Transportation</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            multiline
            rows={3}
            fullWidth
          />
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={loading}
        >
          {loading ? (activity ? 'Saving...' : 'Adding...') : (activity ? 'Save' : 'Add Activity')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function BudgetModal({ open, onClose, tripId, expense, onSave }) {
  const [amount, setAmount] = useState(expense?.amount || '');
  const [description, setDescription] = useState(expense?.description || '');
  const [date, setDate] = useState(expense ? dayjs(expense.date).format('YYYY-MM-DD') : '');
  const [category, setCategory] = useState(expense?.category || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setAmount(expense?.amount || '');
    setDescription(expense?.description || '');
    setDate(expense ? dayjs(expense.date).format('YYYY-MM-DD') : '');
    setCategory(expense?.category || '');
  }, [expense, open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!amount || !description || !date || !category) {
      setError('Please fill all fields.');
      return;
    }
    setLoading(true);
    try {
      if (expense) {
        await updateDoc(doc(db, 'tripExpenses', expense.id), {
          amount: parseFloat(amount),
          description,
          date,
          category,
          updatedAt: new Date()
        });
      } else {
        await addDoc(collection(db, 'tripExpenses'), {
          tripId,
          amount: parseFloat(amount),
          description,
          date,
          category,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
      setAmount('');
      setDescription('');
      setDate('');
      setCategory('');
      onClose();
      if (onSave) onSave();
    } catch (err) {
      setError('Error saving expense: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{expense ? 'Edit Expense' : 'Add Expense'}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Amount"
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
            fullWidth
            InputProps={{ startAdornment: <AttachMoneyIcon sx={{ mr: 1 }} /> }}
          />
          <TextField
            label="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <FormControl fullWidth required>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={e => setCategory(e.target.value)}
            >
              <MenuItem value="Lodging">Lodging</MenuItem>
              <MenuItem value="Transport">Transport</MenuItem>
              <MenuItem value="Food">Food</MenuItem>
              <MenuItem value="Activity">Activity</MenuItem>
              <MenuItem value="Shopping">Shopping</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {loading ? (expense ? 'Saving...' : 'Adding...') : (expense ? 'Save' : 'Add Expense')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function generateInviteCode() {
  // Use crypto.randomUUID if available, else fallback
  if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}

function TripItineraryPage() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [activities, setActivities] = useState([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [days, setDays] = useState([]);
  const [isAddActivityModalOpen, setIsAddActivityModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 900);
  const [tab, setTab] = useState(0); // 0: Itinerary, 1: Budget, 2: Documents, 3: Collaborators, 4: Settings
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteError, setInviteError] = useState('');
  const [inviteLoading, setInviteLoading] = useState(false);
  const [roleMenuAnchor, setRoleMenuAnchor] = useState(null);
  const [roleMenuMember, setRoleMenuMember] = useState(null);
  const [editActivity, setEditActivity] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [budgetTabExpenses, setBudgetTabExpenses] = useState([]);
  const [budgetLoading, setBudgetLoading] = useState(true);
  const [budgetModalOpen, setBudgetModalOpen] = useState(false);
  const [editExpense, setEditExpense] = useState(null);
  const [inviteSuccessCode, setInviteSuccessCode] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 900) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch trip data
  useEffect(() => {
    if (!tripId) return;
    const unsub = onSnapshot(doc(db, 'trips', tripId), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setTrip({ id: docSnap.id, ...data });
        // Calculate days array
        const start = dayjs(data.startDate);
        const end = dayjs(data.endDate);
        const daysArr = [];
        for (let d = 0; d <= end.diff(start, 'day'); d++) {
          daysArr.push(start.add(d, 'day'));
        }
        setDays(daysArr);
      }
    });
    return () => unsub();
  }, [tripId]);

  // Fetch activities for this trip
  useEffect(() => {
    if (!tripId) return;
    const q = query(
      collection(db, 'itineraryItems'),
      where('tripId', '==', tripId),
      orderBy('date', 'asc')
    );
    const unsub = onSnapshot(q, (snap) => {
      setActivities(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, [tripId]);

  // Fetch expenses for this trip
  useEffect(() => {
    if (!tripId) return;
    setBudgetLoading(true);
    const q = query(collection(db, 'tripExpenses'), where('tripId', '==', tripId), orderBy('date', 'asc'));
    const unsub = onSnapshot(q, (snap) => {
      setBudgetTabExpenses(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setBudgetLoading(false);
    });
    return () => unsub();
  }, [tripId]);

  // Group activities by day
  const activitiesByDay = days.map(day =>
    activities.filter(act => dayjs(act.date).isSame(day, 'day'))
  );

  // Invite member handler
  const handleInvite = async () => {
    setInviteError('');
    if (!inviteEmail) {
      setInviteError('Please enter an email.');
      return;
    }
    setInviteLoading(true);
    try {
      // Generate unique code
      const code = generateInviteCode();
      // Add to trip members as before
      const tripRef = doc(db, 'trips', tripId);
      await updateDoc(tripRef, {
        [`members.${inviteEmail.replace(/\./g, '_')}`]: { role: 'contributor', email: inviteEmail, inviteCode: code }
      });
      setInviteOpen(false);
      setInviteEmail('');
      setInviteSuccessCode(code);
      // Copy to clipboard
      if (navigator.clipboard) {
        navigator.clipboard.writeText(code);
      }
    } catch (err) {
      setInviteError('Error inviting member: ' + err.message);
    } finally {
      setInviteLoading(false);
    }
  };

  // Get members from trip
  const members = trip?.members ? Object.entries(trip.members).map(([key, value]) => ({ id: key, ...value })) : [];

  // Get current user ID
  const currentUserId = auth.currentUser?.uid;
  const isAdmin = trip?.members && currentUserId && trip.members[currentUserId]?.role === 'admin';

  // Change member role
  const handleRoleMenuOpen = (event, member) => {
    setRoleMenuAnchor(event.currentTarget);
    setRoleMenuMember(member);
  };
  const handleRoleMenuClose = () => {
    setRoleMenuAnchor(null);
    setRoleMenuMember(null);
  };
  const handleChangeRole = async (role) => {
    if (!roleMenuMember) return;
    try {
      const tripRef = doc(db, 'trips', tripId);
      await updateDoc(tripRef, {
        [`members.${roleMenuMember.id}`]: { ...roleMenuMember, role }
      });
      handleRoleMenuClose();
    } catch (err) {
      alert('Error changing role: ' + err.message);
    }
  };

  // Remove member
  const handleRemoveMember = async (member) => {
    if (!window.confirm(`Remove ${member.email || member.id} from this trip?`)) return;
    try {
      const tripRef = doc(db, 'trips', tripId);
      const updatedMembers = { ...trip.members };
      delete updatedMembers[member.id];
      await updateDoc(tripRef, { members: updatedMembers });
    } catch (err) {
      alert('Error removing member: ' + err.message);
    }
  };

  // Delete activity
  const handleDeleteActivity = async (activityId) => {
    if (!window.confirm('Delete this activity?')) return;
    try {
      await deleteDoc(doc(db, 'itineraryItems', activityId));
    } catch (err) {
      alert('Error deleting activity: ' + err.message);
    }
  };

  // Delete expense
  const handleDeleteExpense = async (expenseId) => {
    if (!window.confirm('Delete this expense?')) return;
    try {
      await deleteDoc(doc(db, 'tripExpenses', expenseId));
    } catch (err) {
      alert('Error deleting expense: ' + err.message);
    }
  };

  // Calculate total spent
  const totalSpent = budgetTabExpenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);

  if (!trip) {
    return <Box sx={{ p: 8, textAlign: 'center' }}><Typography variant="h5">Loading trip...</Typography></Box>;
  }

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(120deg, #e0f7fa 60%, #fff 100%)' }}>
      {/* Header */}
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #e0e0e0', background: 'rgba(255,255,255,0.95)' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#223a5f' }}>Jravel</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#2563eb', mr: 2 }}>{trip.name}</Typography>
            <Typography variant="body1" sx={{ color: '#888', mr: 2 }}>{dayjs(trip.startDate).format('MMM D, YYYY')} - {dayjs(trip.endDate).format('MMM D, YYYY')}</Typography>
            <IconButton color="primary"><EditIcon /></IconButton>
            <Avatar sx={{ bgcolor: '#47b5ff', ml: 2 }}>U</Avatar>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Tabs */}
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ background: 'rgba(255,255,255,0.95)', borderBottom: '1px solid #e0e0e0', px: 4 }}>
        <Tab label="Itinerary" />
        <Tab label="Budget" />
        <Tab label="Documents" />
        <Tab label={<span><GroupAddIcon sx={{ mr: 1, fontSize: 20 }} />Collaborators</span>} />
        <Tab label="Settings" />
      </Tabs>
      {/* Tab Content */}
      {tab === 3 ? (
        <Box sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>Collaborators</Typography>
            {isAdmin && (
              <Button variant="outlined" startIcon={<PersonAddIcon />} onClick={() => setInviteOpen(true)}>
                Invite Member
              </Button>
            )}
          </Box>
          <List>
            {members.length === 0 ? (
              <Typography>No collaborators yet.</Typography>
            ) : members.map(m => (
              <ListItem key={m.id} sx={{ bgcolor: '#fff', borderRadius: 3, mb: 2, boxShadow: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {/* Avatar: show initials or fallback */}
                  <Avatar sx={{ bgcolor: '#47b5ff' }}>{m.email ? m.email[0].toUpperCase() : m.id[0].toUpperCase()}</Avatar>
                  <Box>
                    <Typography sx={{ fontWeight: 600 }}>{m.email || m.id}</Typography>
                    <Typography sx={{ color: '#888', fontSize: 14 }}>{m.role}</Typography>
                  </Box>
                </Box>
                {isAdmin && m.id !== currentUserId && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Button size="small" variant="outlined" onClick={e => handleRoleMenuOpen(e, m)} sx={{ textTransform: 'none', minWidth: 90 }}>{m.role}</Button>
                    <IconButton color="error" onClick={() => handleRemoveMember(m)} title="Remove Member">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                )}
              </ListItem>
            ))}
          </List>
          {/* Role Menu */}
          <Menu anchorEl={roleMenuAnchor} open={Boolean(roleMenuAnchor)} onClose={handleRoleMenuClose}>
            <MenuItem onClick={() => handleChangeRole('admin')}>Admin</MenuItem>
            <MenuItem onClick={() => handleChangeRole('contributor')}>Contributor</MenuItem>
            <MenuItem onClick={() => handleChangeRole('viewer')}>Viewer</MenuItem>
          </Menu>
          {/* Invite Modal */}
          <Dialog open={inviteOpen} onClose={() => setInviteOpen(false)} maxWidth="xs" fullWidth>
            <DialogTitle>Invite Member</DialogTitle>
            <IconButton onClick={() => setInviteOpen(false)} sx={{ position: 'absolute', right: 8, top: 8 }}><CloseIcon /></IconButton>
            <DialogContent>
              <TextField
                label="Email"
                value={inviteEmail}
                onChange={e => setInviteEmail(e.target.value)}
                fullWidth
                required
                sx={{ mt: 2 }}
              />
              {inviteError && <Typography color="error" sx={{ mt: 1 }}>{inviteError}</Typography>}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setInviteOpen(false)}>Cancel</Button>
              <Button onClick={handleInvite} variant="contained" disabled={inviteLoading}>
                {inviteLoading ? 'Inviting...' : 'Invite'}
              </Button>
            </DialogActions>
          </Dialog>
          {/* Invite Success Dialog */}
          <Dialog open={!!inviteSuccessCode} onClose={() => setInviteSuccessCode(null)} maxWidth="xs" fullWidth>
            <DialogTitle>Invite Code Generated</DialogTitle>
            <DialogContent>
              <Typography sx={{ mb: 2 }}>Share this code with the invited member. They can use it to join the trip.</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#f5f5f5', borderRadius: 2, p: 2, mb: 2 }}>
                <Typography sx={{ fontWeight: 700, fontSize: 18 }}>{inviteSuccessCode}</Typography>
                <IconButton size="small" onClick={() => navigator.clipboard.writeText(inviteSuccessCode)}><ContentCopyIcon fontSize="small" /></IconButton>
              </Box>
              <Typography sx={{ color: '#2563eb', fontWeight: 500 }}>Code copied to clipboard!</Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  href={`mailto:?subject=Jravel Trip Invite&body=Join my trip "${trip?.name || ''}" on Jravel! Use this code: ${inviteSuccessCode}`}
                  target="_blank"
                >
                  Share via Email
                </Button>
                <Button
                  variant="outlined"
                  color="success"
                  href={`https://wa.me/?text=Join my trip "${trip?.name || ''}" on Jravel! Use this code: ${inviteSuccessCode}`}
                  target="_blank"
                >
                  Share via WhatsApp
                </Button>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setInviteSuccessCode(null)} variant="contained">Close</Button>
            </DialogActions>
          </Dialog>
        </Box>
      ) : tab === 1 ? (
        <Box sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>Budget</Typography>
            <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setBudgetModalOpen(true)}>
              Add Expense
            </Button>
          </Box>
          <Typography sx={{ mb: 2, fontWeight: 600 }}>Total Spent: <span style={{ color: '#2563eb' }}>₹{totalSpent.toFixed(2)}</span></Typography>
          {budgetLoading ? (
            <Typography>Loading expenses...</Typography>
          ) : budgetTabExpenses.length === 0 ? (
            <Typography>No expenses yet. Add your first expense!</Typography>
          ) : (
            <List>
              {budgetTabExpenses.map(exp => (
                <ListItem key={exp.id} sx={{ bgcolor: '#fff', borderRadius: 3, mb: 2, boxShadow: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography sx={{ fontWeight: 600 }}>₹{exp.amount.toFixed(2)} - {exp.category}</Typography>
                    <Typography sx={{ color: '#888' }}>{exp.description}</Typography>
                    <Typography sx={{ color: '#bbb', fontSize: 13 }}>{dayjs(exp.date).format('MMM D, YYYY')}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button size="small" variant="outlined" onClick={() => setEditExpense(exp)} sx={{ textTransform: 'none' }}>Edit</Button>
                    <IconButton color="error" onClick={() => handleDeleteExpense(exp.id)} title="Delete Expense">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </ListItem>
              ))}
            </List>
          )}
          <BudgetModal
            open={budgetModalOpen || !!editExpense}
            onClose={() => { setBudgetModalOpen(false); setEditExpense(null); }}
            tripId={tripId}
            expense={editExpense}
            onSave={() => setEditExpense(null)}
          />
        </Box>
      ) : (
        <>
          {/* Day Navigation */}
          <Box sx={{ display: 'flex', gap: 2, px: 4, py: 2, overflowX: 'auto', background: 'rgba(255,255,255,0.95)' }}>
            {days.map((day, i) => (
              <Button key={i} variant={i === selectedDay ? 'contained' : 'outlined'} sx={{ borderRadius: 999, minWidth: 100, fontWeight: 700 }} onClick={() => setSelectedDay(i)}>
                Day {i + 1}<br />{day.format('MMM D')}
              </Button>
            ))}
          </Box>
          {/* Main Content */}
          <Box sx={{ display: 'flex', px: 4, py: 3, gap: 4 }}>
            {/* Timeline/Activities */}
            <Box sx={{ flex: 1, transition: 'margin-right 0.3s', marginRight: sidebarOpen ? 0 : 0 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Itinerary for {days[selectedDay]?.format('MMM D, YYYY')}</Typography>
              <List>
                {activitiesByDay[selectedDay]?.length ? activitiesByDay[selectedDay].map(act => (
                  <ListItem key={act.id} sx={{ bgcolor: '#fff', borderRadius: 3, mb: 2, boxShadow: 1, cursor: 'pointer' }}
                    onClick={() => setSelectedActivity(act)}
                    secondaryAction={
                      <IconButton edge="end" color="error" onClick={e => { e.stopPropagation(); handleDeleteActivity(act.id); }}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={dayjs(act.date).format('h:mm A') + ' - ' + act.title} secondary={act.type} />
                    <IconButton edge="end" color="primary" onClick={e => { e.stopPropagation(); setEditActivity(act); }}>
                      <EditIcon />
                    </IconButton>
                  </ListItem>
                )) : <Typography sx={{ color: '#888', mt: 2 }}>No activities for this day.</Typography>}
              </List>
              <Button 
                variant="outlined" 
                startIcon={<AddIcon />} 
                sx={{ borderRadius: 999, mt: 2 }}
                onClick={() => setIsAddActivityModalOpen(true)}
              >
                Add Activity
              </Button>
            </Box>
            {/* Sidebar for activity details */}
            <Drawer
              variant="persistent"
              anchor="right"
              open={sidebarOpen}
              sx={{
                width: sidebarOpen ? 340 : 0,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                  width: 340,
                  boxSizing: 'border-box',
                  borderLeft: '1px solid #e0e0e0',
                  background: '#f8fafd',
                  transition: 'width 0.3s',
                  overflowX: 'hidden',
                  ...(sidebarOpen ? {} : { width: 0, minWidth: 0, padding: 0, border: 'none' })
                },
              }}
            >
              <Toolbar sx={{ minHeight: 48, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: 1 }}>
                <IconButton onClick={() => setSidebarOpen(false)} size="small"><ChevronRightIcon /></IconButton>
              </Toolbar>
              <Box sx={{ p: 3, display: sidebarOpen ? 'block' : 'none' }}>
                {selectedActivity ? (
                  <>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{selectedActivity.title}</Typography>
                    <Typography sx={{ color: '#2563eb', fontWeight: 600, mb: 1 }}>{selectedActivity.type}</Typography>
                    <Typography sx={{ color: '#888', mb: 1 }}>{dayjs(selectedActivity.date).format('MMM D, YYYY, h:mm A')}</Typography>
                    {selectedActivity.notes && <Typography sx={{ mb: 2 }}>{selectedActivity.notes}</Typography>}
                    <Button variant="outlined" startIcon={<EditIcon />} onClick={() => setEditActivity(selectedActivity)} sx={{ borderRadius: 999, mt: 2 }}>
                      Edit Activity
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Activity Details</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="body1" color="text.secondary">Select an activity to view or edit details here.</Typography>
                  </>
                )}
              </Box>
            </Drawer>
            {/* Sidebar open button (when collapsed) */}
            {!sidebarOpen && (
              <IconButton onClick={() => setSidebarOpen(true)} sx={{ position: 'fixed', right: 8, top: 120, zIndex: 1201, bgcolor: '#fff', border: '1px solid #e0e0e0', boxShadow: 1 }}>
                <ChevronLeftIcon />
              </IconButton>
            )}
          </Box>
        </>
      )}

      <AddActivityModal
        open={isAddActivityModalOpen || !!editActivity}
        onClose={() => { setIsAddActivityModalOpen(false); setEditActivity(null); }}
        tripId={tripId}
        selectedDay={days[selectedDay]}
        activity={editActivity}
        onSave={() => setEditActivity(null)}
      />
    </Box>
  );
}

function MyTripsPage() {
  const [createdTrips, setCreatedTrips] = useState([]);
  const [joinedTrips, setJoinedTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [joinCode, setJoinCode] = useState('');
  const [joinLoading, setJoinLoading] = useState(false);
  const [joinError, setJoinError] = useState('');
  const [joinSuccess, setJoinSuccess] = useState('');

  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged(u => setUser(u));
    return () => unsubAuth();
  }, []);

  useEffect(() => {
    if (!user) return;
    setError('');
    setLoading(true);
    try {
      const tripsCol = collection(db, 'trips');
      // Listen to all trips where the user is a member
      const unsub = onSnapshot(tripsCol, (snap) => {
        const allTrips = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const emailKey = user.email.replace(/\./g, '_');
        const created = [];
        const joined = [];
        allTrips.forEach(trip => {
          if (trip.createdBy === user.uid) {
            created.push(trip);
          } else if (trip.members && trip.members[emailKey]) {
            joined.push(trip);
          }
        });
        setCreatedTrips(created);
        setJoinedTrips(joined);
        setLoading(false);
        console.log('User:', user);
        console.log('Created Trips:', created);
        console.log('Joined Trips:', joined);
      }, (err) => {
        setError('Error loading trips: ' + err.message);
        setLoading(false);
      });
      return () => unsub();
    } catch (err) {
      setError('Query error: ' + err.message);
      setLoading(false);
    }
  }, [user]);

  const handleDelete = async (tripId) => {
    if (!window.confirm('Are you sure you want to delete this trip? This cannot be undone.')) return;
    try {
      await deleteDoc(doc(db, 'trips', tripId));
    } catch (err) {
      alert('Error deleting trip: ' + err.message);
    }
  };

  // Join trip by code
  const handleJoinTrip = async (e) => {
    e.preventDefault();
    setJoinError('');
    setJoinSuccess('');
    setJoinLoading(true);
    try {
      console.log('[JoinTrip] Current user:', user); // Debug log
      if (!user || !user.email) {
        setJoinError('Please log in to join a trip.');
        setJoinLoading(false);
        return;
      }
      // Find invite by code
      const q = query(collection(db, 'tripInvites'), where('code', '==', joinCode));
      const snap = await getDocs(q);
      if (snap.empty) {
        setJoinError('Invalid invite code.');
        setJoinLoading(false);
        console.log('[JoinTrip] No invite found for code:', joinCode);
        return;
      }
      const invite = snap.docs[0].data();
      const inviteId = snap.docs[0].id;
      console.log('[JoinTrip] Invite data:', invite); // Debug log
      console.log('[JoinTrip] Comparing emails:', { userEmail: user.email, inviteEmail: invite.email }); // Debug log
      // Check if the logged-in user's email matches the invited email
      if (!invite.email || user.email.toLowerCase() !== invite.email.toLowerCase()) {
        setJoinError(`This invite code is only valid for ${invite.email}. Please log in with that email.`);
        setJoinLoading(false);
        console.log('[JoinTrip] Email mismatch. BLOCKED.');
        return; // HARD BLOCK
      }
      const tripId = invite.tripId;
      const role = invite.role || 'contributor';
      // Add user to trip members
      const tripRef = doc(db, 'trips', tripId);
      await updateDoc(tripRef, {
        [`members.${user.email.replace(/\./g, '_')}`]: { role, email: user.email, joinedViaCode: joinCode }
      });
      console.log('[JoinTrip] User added.');
      setJoinSuccess('Successfully joined the trip! Redirecting...');
      setTimeout(() => {
        navigate(`/trips/${tripId}`);
      }, 1500);
    } catch (err) {
      console.error('[JoinTrip] Error:', err); // Debug log
      setJoinError('Error joining trip: ' + err.message);
    } finally {
      setJoinLoading(false);
    }
  };

  if (!user) return <Box sx={{ p: 8, textAlign: 'center' }}><Typography variant="h6">Please log in to view your trips.</Typography></Box>;
  if (loading) return <Box sx={{ p: 8, textAlign: 'center' }}><Typography>Loading trips...</Typography></Box>;
  if (error) return <Box sx={{ p: 8, textAlign: 'center' }}><Typography color="error">{error}</Typography></Box>;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 6, p: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4, color: '#2563eb' }}>My Trips</Typography>
      {/* Join Trip Section */}
      <Box sx={{ mb: 4, p: 3, bgcolor: '#f5faff', borderRadius: 3, boxShadow: 1 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Join a Trip with Invite Code</Typography>
        <form onSubmit={handleJoinTrip} style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            label="Invite Code"
            value={joinCode}
            onChange={e => setJoinCode(e.target.value)}
            required
            sx={{ minWidth: 220 }}
            size="small"
          />
          <Button type="submit" variant="contained" disabled={joinLoading} sx={{ borderRadius: 999 }}>
            {joinLoading ? 'Joining...' : 'Join Trip'}
          </Button>
        </form>
        {joinError && <Typography color="error" sx={{ mt: 1 }}>{joinError}</Typography>}
        {joinSuccess && <Typography color="success.main" sx={{ mt: 1 }}>{joinSuccess}</Typography>}
      </Box>
      {/* Created Trips Section */}
      <Typography variant="h6" sx={{ mt: 4, mb: 2, color: '#2563eb' }}>Created by Me</Typography>
      {createdTrips.length === 0 ? (
        <Typography>No trips found for your account. Make sure your trips have a <b>createdBy</b> field with your user ID.</Typography>
      ) : (
        <List>
          {createdTrips.map(trip => (
            <ListItem key={trip.id} sx={{ bgcolor: '#fff', borderRadius: 3, mb: 2, boxShadow: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>{trip.name}</Typography>
                <Typography sx={{ color: '#888' }}>{dayjs(trip.startDate).format('MMM D, YYYY')} - {dayjs(trip.endDate).format('MMM D, YYYY')}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="contained" sx={{ borderRadius: 999 }} onClick={() => navigate(`/trips/${trip.id}`)}>Open</Button>
                {trip.createdBy === user.uid && (
                  <IconButton color="error" onClick={() => handleDelete(trip.id)} title="Delete Trip">
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            </ListItem>
          ))}
        </List>
      )}
      {/* Joined Trips Section */}
      <Typography variant="h6" sx={{ mt: 4, mb: 2, color: '#2563eb' }}>Joined Trips</Typography>
      {joinedTrips.length === 0 ? (
        <Typography>No joined trips found. Join a trip using an invite code!</Typography>
      ) : (
        <List>
          {joinedTrips.map(trip => (
            <ListItem key={trip.id} sx={{ bgcolor: '#f8faff', borderRadius: 3, mb: 2, boxShadow: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>{trip.name}</Typography>
                <Typography sx={{ color: '#888' }}>{dayjs(trip.startDate).format('MMM D, YYYY')} - {dayjs(trip.endDate).format('MMM D, YYYY')}</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="contained" sx={{ borderRadius: 999 }} onClick={() => navigate(`/trips/${trip.id}`)}>Open</Button>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
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
        <Route path="/trips/:tripId" element={<TripItineraryPage />} />
        <Route path="/my-trips" element={<MyTripsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
