import React from 'react';
import { Link } from 'react-router-dom';

function TripRecommendationView({ trip }) {
  if (!trip?.tripData) {
    return <div>No trip data available</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Trip Overview */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">{trip.userSelection?.location?.label}</h2>
        <div className="flex flex-wrap gap-3">
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
            📆 {trip.userSelection?.noOfDays} Days
          </span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
            💰 {trip.userSelection?.budget} Budget
          </span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
            👥 {trip.userSelection?.traveler} Travelers
          </span>
        </div>
      </div>

      {/* Hotel Recommendations */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">Recommended Hotels</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trip.tripData.hotelOptions?.map((hotel, index) => (
            <div key={index} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={hotel.hotelImageUrl || '/placeholder-hotel.jpg'}
                alt={hotel.hotelName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="font-bold text-lg mb-2">{hotel.hotelName}</h4>
                <p className="text-gray-600 text-sm mb-2">📍 {hotel.hotelAddress}</p>
                <p className="text-gray-600 text-sm mb-2">💰 {hotel.price}</p>
                <p className="text-gray-600 text-sm mb-2">⭐ {hotel.rating}</p>
                <p className="text-gray-600 text-sm">{hotel.descriptions}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Itinerary */}
      <div>
        <h3 className="text-2xl font-bold mb-4">Your Itinerary</h3>
        {Object.entries(trip.tripData.itinerary || {}).map(([day, info]) => (
          <div key={day} className="mb-8">
            <h4 className="text-xl font-bold mb-2">{day}</h4>
            <p className="text-orange-500 mb-4">Best time to visit: {info.best_time_to_visit}</p>
            <div className="space-y-4">
              {info.places.map((place, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h5 className="font-bold text-lg mb-2">{place.placeName}</h5>
                  <img
                    src={place.placeImageUrl || '/placeholder-place.jpg'}
                    alt={place.placeName}
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                  <p className="text-gray-600 mb-2">{place.placeDetails}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p>🎫 {place.ticketPricing}</p>
                    <p>⭐ {place.rating}</p>
                    <p>⏰ {place.timeTravel}</p>
                    <p>📍 {place.geoCoordinates}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TripRecommendationView; 