import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import TripRecommendationForm from '../components/TripRecommendationForm';
import TripRecommendationView from '../components/TripRecommendationView';

function AITripPlanner() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tripId) {
      fetchTrip();
    }
  }, [tripId]);

  const fetchTrip = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, 'AiTrips', tripId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setTrip(docSnap.data());
      }
    } catch (error) {
      console.error('Error fetching trip:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {tripId ? (
        <TripRecommendationView trip={trip} />
      ) : (
        <TripRecommendationForm />
      )}
    </div>
  );
}

export default AITripPlanner; 