import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const SelectTravelList = [
  { id: 1, title: 'Just Me', desc: "A sole traveler", icon: '🙋🏾‍♀️', people: '1' },
  { id: 2, title: 'A couple', desc: "Two travelers", icon: '👫🏾', people: '2' },
  { id: 3, title: 'Family', desc: "A group of fun loving adventurers", icon: '🏡', people: '3 to 5 people' },
  { id: 4, title: 'Friends', desc: "A bunch of thrill-seekers", icon: '👩‍👩‍👦‍👦', people: '5 to 12 people' },
];

const SelectBudgetOptions = [
  { id: 1, title: 'Cheap', desc: "Stay conscious of costs", icon: '💵' },
  { id: 2, title: 'Moderate', desc: "Keep cost on the average side", icon: '💰' },
  { id: 3, title: 'Luxury', desc: "Don't worry about cost", icon: '💎' },
];

const AI_PROMPT = 'Generate Travel Plan for Location: {location} for {totalDays} Days for {traveler} with a {budget} budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.';

function TripRecommendationForm() {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const generateTrip = async () => {
    setError('');
    setSuccess('');
    if (!formData.location || !formData.noOfDays || !formData.budget || !formData.traveler) {
      setError('Please fill all details!');
      return;
    }
    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', formData.location.label)
        .replaceAll('{totalDays}', formData.noOfDays)
        .replace('{traveler}', formData.traveler)
        .replace('{budget}', formData.budget);
      const result = await model.generateContent(FINAL_PROMPT);
      const response = await result.response;
      let tripData;
      try {
        tripData = JSON.parse(response.text());
      } catch (e) {
        setError('AI response was not valid JSON. Try again.');
        setLoading(false);
        return;
      }
      // Save to Firestore
      const docId = Date.now().toString();
      await setDoc(doc(db, "AiTrips", docId), {
        userSelection: formData,
        tripData: tripData,
        createdAt: new Date(),
        id: docId
      });
      setSuccess('Trip plan generated and saved!');
      setFormData({});
      setPlace(null);
    } catch (err) {
      setError('Failed to generate trip plan. ' + (err.message || ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Tell us your travel preferences</h2>
      <p className="text-gray-600 mb-8">Just provide some basic information, and our AI trip planner will generate a customized itinerary based on your preferences.</p>
      {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}
      {success && <div className="mb-4 text-green-600 font-semibold">{success}</div>}
      <div className="space-y-8">
        {/* Destination */}
        <div>
          <h3 className="text-xl font-medium mb-3">What is your destination of choice?</h3>
          <GooglePlacesAutocomplete
            apiKey={process.env.REACT_APP_GOOGLE_PLACES_API_KEY}
            selectProps={{
              value: place,
              onChange: (v) => { setPlace(v); handleInputChange('location', v); },
              placeholder: 'Search for a place...'
            }}
          />
        </div>
        {/* Number of Days */}
        <div>
          <h3 className="text-xl font-medium mb-3">How many days are you planning for your trip?</h3>
          <input
            type="number"
            className="w-full p-2 border rounded"
            placeholder="Ex. 3"
            value={formData.noOfDays || ''}
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
            min={1}
            max={30}
          />
        </div>
        {/* Budget */}
        <div>
          <h3 className="text-xl font-medium mb-3">What is Your Budget?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SelectBudgetOptions.map((item) => (
              <div
                key={item.id}
                onClick={() => handleInputChange('budget', item.title)}
                className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg transition-all ${formData.budget === item.title ? 'border-blue-500 shadow-lg' : ''}`}
              >
                <div className="text-4xl mb-2">{item.icon}</div>
                <h4 className="font-bold text-lg">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Travel Companions */}
        <div>
          <h3 className="text-xl font-medium mb-3">Who are you traveling with?</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {SelectTravelList.map((item) => (
              <div
                key={item.id}
                onClick={() => handleInputChange('traveler', item.people)}
                className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg transition-all ${formData.traveler === item.people ? 'border-blue-500 shadow-lg' : ''}`}
              >
                <div className="text-4xl mb-2">{item.icon}</div>
                <h4 className="font-bold text-lg">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Generate Button */}
        <div className="flex justify-end">
          <button
            onClick={generateTrip}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate Trip Plan'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TripRecommendationForm;