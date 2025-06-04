import React, { useState } from 'react';
import './MainPage.css';
import { Link } from 'react-router-dom';

const tabs = [
  { label: 'Flights', icon: '✈️' },
  { label: 'Hotels', icon: '🏨' },
  { label: 'Trains', icon: '🚄' },
];

function MainPage() {
  const [activeTab, setActiveTab] = useState(0);
  // Hotel search state
  const [hotelCity, setHotelCity] = useState('Goa');
  const [hotelCheckIn, setHotelCheckIn] = useState('');
  const [hotelCheckOut, setHotelCheckOut] = useState('');
  const [hotelRooms, setHotelRooms] = useState(1);
  const [hotelGuests, setHotelGuests] = useState(2);
  const [hotelResults, setHotelResults] = useState([]);
  const [hotelLoading, setHotelLoading] = useState(false);
  const [hotelError, setHotelError] = useState('');

  // Train search state
  const [trainStationName, setTrainStationName] = useState('New Delhi');
  const [trainStationCode, setTrainStationCode] = useState('NDLS');
  const [trainResults, setTrainResults] = useState([]);
  const [trainLoading, setTrainLoading] = useState(false);
  const [trainError, setTrainError] = useState('');

  // Fetch hotels from Travel Advisor API
  async function fetchHotels(e) {
    e.preventDefault();
    setHotelLoading(true);
    setHotelError('');
    setHotelResults([]);
    try {
      // Step 1: Get location_id for the city
      const locRes = await fetch(`https://travel-advisor.p.rapidapi.com/locations/search?query=${encodeURIComponent(hotelCity)}&limit=1&lang=en_US`, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
          'x-rapidapi-key': 'e480557e7fmsh02cc22fca82c720p11ebd8jsn8fa8399eeb88',
        },
      });
      const locData = await locRes.json();
      const locationId = locData.data[0]?.result_object?.location_id;
      if (!locationId) throw new Error('City not found');
      // Step 2: Get hotels for location_id
      const hotelRes = await fetch(`https://travel-advisor.p.rapidapi.com/hotels/list?location_id=${locationId}&adults=${hotelGuests}&rooms=${hotelRooms}&checkin=${hotelCheckIn}&checkout=${hotelCheckOut}&currency=INR&order=price&lang=en_US`, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
          'x-rapidapi-key': 'e480557e7fmsh02cc22fca82c720p11ebd8jsn8fa8399eeb88',
        },
      });
      const hotelData = await hotelRes.json();
      setHotelResults(hotelData.data?.filter(h => h.name && h.photo));
    } catch (err) {
      setHotelError('Could not fetch hotels. Try again.');
    }
    setHotelLoading(false);
  }

  async function fetchTrains(e) {
    e.preventDefault();
    setTrainLoading(true);
    setTrainError('');
    setTrainResults([]);
    try {
      // Step 1: Lookup station code from name
      const lookupRes = await fetch(`https://irctc1.p.rapidapi.com/api/v1/searchStation?query=${encodeURIComponent(trainStationName)}`, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'irctc1.p.rapidapi.com',
          'x-rapidapi-key': 'e480557e7fmsh02cc22fca82c720p11ebd8jsn8fa8399eeb88',
        },
      });
      const lookupData = await lookupRes.json();
      const code = lookupData.data && lookupData.data.length > 0 ? lookupData.data[0].code : null;
      if (!code) throw new Error('Station not found');
      setTrainStationCode(code);
      // Step 2: Fetch live trains for the code
      const res = await fetch(`https://irctc1.p.rapidapi.com/api/v3/getLiveStation?hours=1&stationCode=${code}`, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'irctc1.p.rapidapi.com',
          'x-rapidapi-key': 'e480557e7fmsh02cc22fca82c720p11ebd8jsn8fa8399eeb88',
        },
      });
      const data = await res.json();
      setTrainResults(data.data?.trains || []);
    } catch (err) {
      setTrainError('Could not fetch trains. Try again.');
    }
    setTrainLoading(false);
  }

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
            </button>
          ))}
        </div>
        <div className="main-search-card">
          {activeTab === 0 && (
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
              <button className="main-search-btn" type="submit">SEARCH FLIGHTS</button>
            </form>
          )}
          {activeTab === 1 && (
            <>
            <form className="main-search-form" onSubmit={fetchHotels}>
              <div className="main-search-row">
                <div className="main-search-field">
                  <label>City, Property Name Or Location</label>
                  <input type="text" value={hotelCity} onChange={e => setHotelCity(e.target.value)} />
                </div>
                <div className="main-search-field">
                  <label>Check-In</label>
                  <input type="date" value={hotelCheckIn} onChange={e => setHotelCheckIn(e.target.value)} />
                </div>
                <div className="main-search-field">
                  <label>Check-Out</label>
                  <input type="date" value={hotelCheckOut} onChange={e => setHotelCheckOut(e.target.value)} />
                </div>
                <div className="main-search-field">
                  <label>Rooms</label>
                  <input type="number" min="1" value={hotelRooms} onChange={e => setHotelRooms(e.target.value)} />
                </div>
                <div className="main-search-field">
                  <label>Guests</label>
                  <input type="number" min="1" value={hotelGuests} onChange={e => setHotelGuests(e.target.value)} />
                </div>
              </div>
              <button className="main-search-btn" type="submit" disabled={hotelLoading}>{hotelLoading ? 'Searching...' : 'SEARCH HOTELS'}</button>
            </form>
            {hotelError && <div style={{color:'#ff715b',marginTop:8}}>{hotelError}</div>}
            <div className="hotel-results">
              {hotelResults && hotelResults.length > 0 && hotelResults.map(hotel => {
                // Try to get INR price, else convert USD to INR (1 USD ≈ 83 INR)
                let price = hotel.price;
                if (price && price.includes('USD')) {
                  const usd = parseFloat(price.replace(/[^0-9.]/g, ''));
                  if (!isNaN(usd)) price = `₹${Math.round(usd * 83)} (approx)`;
                } else if (!price) {
                  price = 'Price not available';
                }
                // Use best available booking/partner URL if present
                let bookUrl = hotel.web_url || `https://www.tripadvisor.com/Hotel_Review-g${hotel.location_id}`;
                if (hotel.partner_urls && hotel.partner_urls.length > 0) {
                  bookUrl = hotel.partner_urls[0].url;
                } else if (hotel.booking && hotel.booking.url) {
                  bookUrl = hotel.booking.url;
                }
                return (
                  <div className="hotel-card" key={hotel.location_id}>
                    <img src={hotel.photo.images.small.url} alt={hotel.name} className="hotel-img" />
                    <div className="hotel-info">
                      <div className="hotel-name">{hotel.name}</div>
                      <div className="hotel-price">{price}</div>
                      <div className="hotel-rating">{hotel.rating ? `Rating: ${hotel.rating}` : ''}</div>
                      <a href={bookUrl} target="_blank" rel="noopener noreferrer">
                        <button className="hotel-book-btn">Book Now</button>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
            </>
          )}
          {activeTab === 2 && (
            <>
            <form className="main-search-form" onSubmit={fetchTrains}>
              <div className="main-search-row">
                <div className="main-search-field">
                  <label>Station Name</label>
                  <input type="text" value={trainStationName} onChange={e => setTrainStationName(e.target.value)} placeholder="New Delhi" />
                </div>
              </div>
              <button className="main-search-btn" type="submit" disabled={trainLoading}>{trainLoading ? 'Searching...' : 'SEARCH TRAINS'}</button>
            </form>
            {trainError && <div style={{color:'#ff715b',marginTop:8}}>{trainError}</div>}
            <div className="train-results">
              {trainResults && trainResults.length > 0 && trainResults.map(train => (
                <div className="train-card" key={train.train_number}>
                  <div className="train-name">{train.train_name} ({train.train_number})</div>
                  <div className="train-route">From: {train.source} To: {train.destination}</div>
                  <div className="train-time">Scheduled: {train.scharr} - {train.schdep}</div>
                  <div className="train-platform">Platform: {train.platform || 'N/A'}</div>
                </div>
              ))}
            </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainPage; 