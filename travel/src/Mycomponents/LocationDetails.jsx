import React from 'react';
import { useParams } from 'react-router-dom';

// Mock data for locations
const locationData = {
  "harihar-fort": {
    title: "Harihar Fort",
    description: "Get an amazing trekking experience.",
    imageUrl: "posts/hariharfort.jpeg",
  },
  "chadar-trek": {
    title: "Chadar Trek, Ladakh",
    description: "Walking on the frozen Zanskar River, stunning ice formations, and remote villages.",
    imageUrl: "posts/ladakh.jpeg",
  },
  "valley-of-flowers": {
    title: "Valley of Flowers Trek, Uttarakhand",
    description: "A UNESCO World Heritage site known for its vibrant blooms, rare Himalayan flora, and scenic beauty.",
    imageUrl: "posts/flowers.jpeg",
  },
  "goa": {
    title: "Goa",
    description: "Stunning beaches, vibrant nightlife, water sports, and delicious seafood.",
    imageUrl: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  },
  "manali": {
    title: "Manali, Himachal Pradesh",
    description: "Adventure activities like skiing, paragliding, and trekking. Scenic views of the Himalayas.",
    imageUrl: "/posts/post-2.jpg",
  },
  "kochi": {
    title: "Kochi (Cochin), Kerala",
    description: "Backwaters, beaches, and rich cultural experiences. Great for exploring local cuisine and heritage sites.",
    imageUrl: "/posts/post-1.jpg",
  },
};

const LocationDetails = () => {
  const { id } = useParams(); // Get the location ID from the URL

  // Find the location details based on the ID
  const location = locationData[id];

  // If the location doesn't exist, handle the case
  if (!location) {
    return (
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold">Location Not Found</h1>
        <p>Please check the URL or go back to the homepage.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">{location.title}</h1>
      <img src={location.imageUrl} alt={location.title} className="w-full rounded-lg" />
      <p className="mt-4">{location.description}</p>
    </div>
  );
};

export default LocationDetails;
