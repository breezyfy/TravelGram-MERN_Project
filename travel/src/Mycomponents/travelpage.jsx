import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './travelpage.css';

export default function TravelPage() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState([]);

  // Card data including Goa, Manali, and Kochi
  const cardData = [
    { id: 'harihar-fort', title: 'Harihar Fort', category: 'Adventure', img: 'posts/Harihar1.jpg', description: 'Trekking experience at Harihar Fort.' },
    { id: 'chadar-trek', title: 'Chadar Trek, Ladakh', category: 'Adventure', img: 'posts/Chadar1.jpg', description: 'Frozen Zanskar River Trek.' },
    { id: 'valley-of-flowers', title: 'Valley of Flowers', category: 'Nature', img: 'posts/Flowers1.jpg', description: 'Vibrant blooms at Valley of Flowers.' },
    { id: 'goa', title: 'Goa', category: 'Cultural', img: 'posts/Goa1.jpg', description: 'Beaches, nightlife, and water sports in Goa.' },
    { id: 'manali', title: 'Manali, Himachal Pradesh', category: 'Adventure', img: 'posts/Manali1.jpg', description: 'Skiing, trekking, and paragliding in Manali.' },
    { id: 'kochi', title: 'Kochi (Cochin), Kerala', category: 'Cultural', img: 'posts/Kochi1.jpg', description: 'Backwaters, beaches, and heritage in Kochi.' },
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleFavoriteToggle = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  // Filter cards by search query, category, and favorites
  const filteredCards = cardData.filter((card) => {
    const matchesSearch = card.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = 
      selectedCategory === 'All' || 
      (selectedCategory === 'Favorites' && favorites.includes(card.id)) || 
      card.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4">
      {/* Search Box */}
      <input
        type="text"
        className="border border-gray-300 p-2 w-full rounded mb-4"
        placeholder="Search for a destination..."
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {/* Category Filter */}
      <div className="mb-4">
        {['All', 'Adventure', 'Nature', 'Cultural', 'Favorites'].map((category) => (
          <button
            key={category}
            className={`btn mr-2 ${
              selectedCategory === category ? 'btn-primary' : 'btn-secondary'
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid with cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <div key={card.id} className="card bg-base-100 w-96 shadow-xl">
              <figure className="px-10 pt-10">
                <img src={card.img} alt={card.title} className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{card.title}</h2>
                <p>{card.description}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/travel/${card.id}`)}
                >
                  Visit Now
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => handleFavoriteToggle(card.id)}
                >
                  {favorites.includes(card.id) ? 'Unfavorite' : 'Favorite'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No matching destinations found.</p>
        )}
      </div>
    </div>
  );
}
