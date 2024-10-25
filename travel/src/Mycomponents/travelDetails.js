import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function TravelDetails() {
  const { id } = useParams(); // Get the ID from the URL
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const response = await fetch(`/api/travel/places/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch place details');
        }
        const data = await response.json();
        setPlace(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPlaceDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!place) {
    return <p>No place details found</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-4">{place.title}</h1>
      <p className="text-lg text-center mb-6">{place.description}</p>
      <div className="flex justify-center mb-6">
        <img
          src={place.img}
          alt={place.title}
          className="rounded-lg shadow-lg"
          style={{ width: '80%', height: 'auto' }}
        />
      </div>
      <div className="mb-6">
        <iframe
          title={`${place.title} Map`}
          src={place.map} // Using dynamic map URL
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
