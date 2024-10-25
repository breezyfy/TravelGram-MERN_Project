import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function TravelDetails() {
  const { id } = useParams(); // Get the ID from the URL
  const [packs, setPack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const response = await fetch(`/api/packages/packs/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch place details');
        }
        const data = await response.json();
        setPack(data);
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

  if (!packs) {
    return <p>No package details found</p>;
  }


  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-4">{packs.title}</h1>
      <h3 className="text-4xl font-bold text-center mb-4">Travel Details</h3>
      <p className="text-lg whitespace-pre-line text-center mb-6">{packs.description}</p>
      <p className="text-lg text-center mb-6">Price: ₹{packs.price}/per person</p>
      <p className="text-lg text-center mb-6">Duration: {packs.duration} days</p>
      <p className="text-lg text-center mb-6">Rating: {packs.rating}/5</p>
      <div className="flex justify-center mb-6">
    <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${packs.email}&su=Booking%20Enquiry%20for%20${packs.title}&body=Dear%20Team,%0A%0AI%20am%20interested%20in%20booking%20the%20${packs.title}%20package.%20Please%20let%20me%20know%20the%20next%20steps.%0A%0ARegards,%0AThe%20GlobeTrekker%20Team`} target="_blank" rel="noopener noreferrer">
        <button className="btn btn-primary">Book</button>
    </a>
</div>
      <div className="flex justify-center mb-6">
        <img
          src={packs.imgUrl}
          alt={packs.title}
          className="rounded-lg shadow-lg"
          style={{ width: '80%', height: 'auto' }}
        />
      </div>
      <div className="mb-6">
        <iframe
          title={`${packs.title} Map`}
          src={packs.mapUrl} // Using dynamic map URL
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
