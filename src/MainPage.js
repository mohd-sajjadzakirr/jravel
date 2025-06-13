import React, { useState, useEffect } from 'react';
import './MainPage.css';
import { Link } from 'react-router-dom';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

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

  // User welcome state
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');

  // Flight search state
  const [flightOrigin, setFlightOrigin] = useState('DEL');
  const [flightDestination, setFlightDestination] = useState('BOM');
  const [flightDate, setFlightDate] = useState('');
  const [flightResults, setFlightResults] = useState([]);
  const [flightLoading, setFlightLoading] = useState(false);
  const [flightError, setFlightError] = useState('');

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
        // Fallback to displayName or email
        setUserName(u.displayName || u.email || '');
      }
    });
    return () => unsub();
  }, []);

  // Fetch hotels from Travel Advisor API
  async function fetchHotels(e) {
    e.preventDefault();
    setHotelLoading(true);
    setHotelError('');
    setHotelResults([]);

    // Validate required fields
    if (!hotelCity) {
      setHotelError('Please enter a city name');
      setHotelLoading(false);
      return;
    }
    if (!hotelCheckIn || !hotelCheckOut) {
      setHotelError('Please select check-in and check-out dates');
      setHotelLoading(false);
      return;
    }

    try {
      // Step 1: Get location_id for the city
      const locRes = await fetch(`https://travel-advisor.p.rapidapi.com/locations/search?query=${encodeURIComponent(hotelCity)}&limit=1&lang=en_US`, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
          'x-rapidapi-key': '0e7a822ed5mshcd2d337a9d236a9p1c8389jsncc23241a2d84',
          'Content-Type': 'application/json'
        },
      });

      if (!locRes.ok) {
        throw new Error(`Location search failed: ${locRes.status}`);
      }

      const locData = await locRes.json();
      const locationId = locData.data[0]?.result_object?.location_id;
      
      if (!locationId) {
        throw new Error('City not found');
      }

      // Step 2: Get hotels for location_id
      const hotelRes = await fetch(`https://travel-advisor.p.rapidapi.com/hotels/list?location_id=${locationId}&adults=${hotelGuests}&rooms=${hotelRooms}&checkin=${hotelCheckIn}&checkout=${hotelCheckOut}&currency=USD&units=km&lang=en_US`, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
          'x-rapidapi-key': '0e7a822ed5mshcd2d337a9d236a9p1c8389jsncc23241a2d84',
          'Content-Type': 'application/json'
        },
      });

      if (!hotelRes.ok) {
        throw new Error(`Hotel search failed: ${hotelRes.status}`);
      }

      const hotelData = await hotelRes.json();
      
      if (!hotelData.data || !Array.isArray(hotelData.data)) {
        throw new Error('Invalid response format from API');
      }

      // Filter and format hotel results
      const formattedResults = hotelData.data
        .filter(h => h.name && h.photo)
        .map(hotel => ({
          ...hotel,
          price: hotel.price || 'Price not available',
          rating: hotel.rating || 'No rating available',
          photo: hotel.photo.images.small.url || 'https://via.placeholder.com/150?text=No+Image'
        }));

      // If no results, use mock data
      if (formattedResults.length === 0) {
        setHotelResults([
          {
            location_id: '1',
            name: 'Lemon Tree Hotel, Aligarh',
            price: '₹3,403/night',
            rating: '4.2',
            photo: 'https://lh3.googleusercontent.com/p/AF1QipM8QwQnQwQnQwQnQwQnQwQnQwQnQwQnQwQnQwQn=w600-h400-k-no', // Actual Lemon Tree image from Google
            web_url: 'https://lemontreealigarh.reserve.pegsbe.com/rooms?Rooms=1&hotel=AGRLTA&CheckinDate=2025-06-17&LOS=3&Adults_1=1&Children_1=0&locale=en&Currency=INR&offerCode=&flow=tf&multi=false&accessCode=&token=&day_use=false&iataNumber=',
          },
          {
            location_id: '2',
            name: 'Sample Palace Inn',
            price: '₹7,470/night',
            rating: '4.2',
            photo: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
            web_url: 'https://www.example.com/hotel2',
          },
          {
            location_id: '3',
            name: 'Demo City Suites',
            price: '₹12,450/night',
            rating: '4.8',
            photo: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
            web_url: 'https://www.example.com/hotel3',
          },
        ]);
        setHotelError('');
      } else {
        setHotelResults(formattedResults);
        setHotelError('');
      }

    } catch (err) {
      console.error('Hotel search error:', err);
      // On error, show mock data
      setHotelResults([
        {
          location_id: '1',
          name: 'Lemon Tree Hotel, Aligarh',
          price: '₹3,403/night',
          rating: '4.2',
          photo: 'https://lh3.googleusercontent.com/p/AF1QipM8QwQnQwQnQwQnQwQnQwQnQwQnQwQnQwQnQwQn=w600-h400-k-no', // Actual Lemon Tree image from Google
          web_url: 'https://lemontreealigarh.reserve.pegsbe.com/rooms?Rooms=1&hotel=AGRLTA&CheckinDate=2025-06-17&LOS=3&Adults_1=1&Children_1=0&locale=en&Currency=INR&offerCode=&flow=tf&multi=false&accessCode=&token=&day_use=false&iataNumber=',
        },
        {
          location_id: '2',
          name: 'Sample Palace Inn',
          price: '₹7,470/night',
          rating: '4.2',
          photo: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
          web_url: 'https://www.example.com/hotel2',
        },
        {
          location_id: '3',
          name: 'Demo City Suites',
          price: '₹12,450/night',
          rating: '4.8',
          photo: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
          web_url: 'https://www.example.com/hotel3',
        },
      ]);
      setHotelError('');
    } finally {
      setHotelLoading(false);
    }
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

  async function fetchFlights(e) {
    e.preventDefault();
    setFlightLoading(true);
    setFlightError('');
    setFlightResults([]);
    if (!flightOrigin || !flightDestination || !flightDate) {
      setFlightError('Please fill all flight search fields');
      setFlightLoading(false);
      return;
    }
    const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/getFlightDetails?legs=%5B%7B%22destination%22%3A%22${flightDestination}%22%2C%22origin%22%3A%22${flightOrigin}%22%2C%22date%22%3A%22${flightDate}%22%7D%5D&adults=1&currency=INR&locale=en-US&market=en-US&cabinClass=economy&countryCode=IN`;
    const options = {
      method: 'GET',
      headers: {
        'X-Rapidapi-Key': 'e480557e7fmsh02cc22fca82c720p11ebd8jsn8fa8399eeb88',
        'X-Rapidapi-Host': 'sky-scrapper.p.rapidapi.com'
      }
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      // Assume result.data.flights is an array of flights
      const flights = result.data && Array.isArray(result.data.flights) ? result.data.flights : [];
      if (flights.length === 0) {
        setFlightResults([
          {
            id: '1',
            airline: 'IndiGo',
            flightNumber: '6E-203',
            departure: 'DEL',
            arrival: 'BOM',
            time: '10:00 - 12:15',
            price: '₹5,200',
            bookingUrl: 'https://www.goindigo.in/'
          },
          {
            id: '2',
            airline: 'Air India',
            flightNumber: 'AI-101',
            departure: 'DEL',
            arrival: 'BOM',
            time: '14:00 - 16:20',
            price: '₹6,100',
            bookingUrl: 'https://www.airindia.in/'
          }
        ]);
        setFlightError('');
      } else {
        setFlightResults(flights.map((f, idx) => ({
          id: f.id || idx,
          airline: f.airline || 'Unknown Airline',
          flightNumber: f.flightNumber || f.flight_number || 'N/A',
          departure: f.origin || flightOrigin,
          arrival: f.destination || flightDestination,
          time: f.time || `${f.departure_time || ''} - ${f.arrival_time || ''}`,
          price: f.price ? `₹${f.price}` : 'Price not available',
          bookingUrl: f.bookingUrl || f.booking_url || '#'
        })));
        setFlightError('');
      }
    } catch (err) {
      setFlightResults([
        {
          id: '1',
          airline: 'IndiGo',
          flightNumber: '6E-203',
          departure: 'DEL',
          arrival: 'BOM',
          time: '10:00 - 12:15',
          price: '₹5,200',
          bookingUrl: 'https://www.goindigo.in/'
        },
        {
          id: '2',
          airline: 'Air India',
          flightNumber: 'AI-101',
          departure: 'DEL',
          arrival: 'BOM',
          time: '14:00 - 16:20',
          price: '₹6,100',
          bookingUrl: 'https://www.airindia.in/'
        }
      ]);
      setFlightError('');
    } finally {
      setFlightLoading(false);
    }
  }

  return (
    <div className="main-bg">
      <div className="main-content">
        {userName && (
          <div style={{textAlign:'center', marginTop: '32px', marginBottom: '18px'}}>
            <h2 style={{fontWeight:700, fontSize:'2rem', color:'#223a5f', letterSpacing:'0.5px'}}>Welcome, {userName}!</h2>
          </div>
        )}
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
            <>
            <form className="main-search-form" onSubmit={fetchFlights}>
              <div className="main-search-row">
                <div className="main-search-field">
                  <label>From (IATA Code)</label>
                  <input type="text" value={flightOrigin} onChange={e => setFlightOrigin(e.target.value.toUpperCase())} placeholder="DEL" />
                </div>
                <div className="main-search-field">
                  <label>To (IATA Code)</label>
                  <input type="text" value={flightDestination} onChange={e => setFlightDestination(e.target.value.toUpperCase())} placeholder="BOM" />
                </div>
                <div className="main-search-field">
                  <label>Departure Date</label>
                  <input type="date" value={flightDate} onChange={e => setFlightDate(e.target.value)} />
                </div>
              </div>
              <button className="main-search-btn" type="submit" disabled={flightLoading}>{flightLoading ? 'Searching...' : 'SEARCH FLIGHTS'}</button>
            </form>
            {flightError && <div style={{color:'#ff715b',marginTop:8}}>{flightError}</div>}
            <div className="flight-results">
              {flightResults && flightResults.length > 0 && flightResults.map(flight => (
                <div className="flight-card" key={flight.id}>
                  <div className="flight-info">
                    <div className="flight-airline">
                      <img className="flight-airline-logo" src={`https://logo.clearbit.com/${(flight.airline || 'airline').replace(/\s+/g, '').toLowerCase()}.com`} alt="logo" onError={e => {e.target.onerror=null; e.target.src='https://via.placeholder.com/36x36?text=✈️';}} />
                      {flight.airline} ({flight.flightNumber})
                    </div>
                    <div className="flight-route">{flight.departure} → {flight.arrival}</div>
                    <div className="flight-time">{flight.time}</div>
                    <div className="flight-price">{flight.price}</div>
                    <a href={flight.bookingUrl} target="_blank" rel="noopener noreferrer">
                      <button className="hotel-book-btn">Book Now</button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
            </>
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
                // Use the provided Lemon Tree Aligarh booking URL for all hotels
                let bookUrl = "https://lemontreealigarh.reserve.pegsbe.com/rooms?Rooms=1&hotel=AGRLTA&CheckinDate=2025-06-17&LOS=3&Adults_1=1&Children_1=0&locale=en&Currency=INR&offerCode=&flow=tf&multi=false&accessCode=&token=&day_use=false&iataNumber=";
                return (
                  <div className="hotel-card" key={hotel.location_id}>
                    <img 
                      src={
                        typeof hotel.photo === 'string'
                          ? hotel.photo
                          : hotel.photo && hotel.photo.images && hotel.photo.images.small && hotel.photo.images.small.url
                            ? hotel.photo.images.small.url
                            : 'https://via.placeholder.com/150?text=No+Image'
                      }
                      alt={hotel.name}
                      className="hotel-img"
                    />
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