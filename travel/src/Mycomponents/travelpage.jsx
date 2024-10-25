import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './travelpage.css';

export default function TravelPage() {
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPlace, setNewPlace] = useState({
    title: '',
    category: 'Adventure',
    img: '',
    description: '',
    map: '',
  });

  // Fetch places from the backend
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch('/api/travel/places');
        const data = await response.json();
        setPlaces(data);
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    };

    fetchPlaces();
  }, []);

  // Filter based on search query and selected category
  const filteredPlaces = places.filter((place) => {
    const matchesSearch = place.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' ||
      (selectedCategory === 'Favorites' && favorites.includes(place._id)) ||
      place.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Toggle favorite status
  const handleFavoriteToggle = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  // Modal toggle
  const toggleModal = () => setShowModal(!showModal);

  // Handle input change for new place
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlace((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new travel place
  const handleAddPlace = async () => {
    try {
      const response = await fetch('/api/travel/places', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPlace),
      });
      const data = await response.json();
      setPlaces((prev) => [...prev, data]); // Add the new place to the list
      setNewPlace({ title: '', category: 'Adventure', img: '', description: '', map: '' });
      setShowModal(false); // Close the modal after adding
    } catch (error) {
      console.error('Error adding place:', error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      

      {/* Add Travel Place Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-lg font-bold mb-4">Add Travel Place</h2>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={newPlace.title}
              onChange={handleInputChange}
              className="input input-bordered w-full mb-2"
            />
            <input
              type="text"
              placeholder="Image URL"
              name="img"
              value={newPlace.img}
              onChange={handleInputChange}
              className="input input-bordered w-full mb-2"
            />
            <textarea
              placeholder="Description"
              name="description"
              value={newPlace.description}
              onChange={handleInputChange}
              className="textarea textarea-bordered w-full mb-2"
            />
            <input
              type="text"
              placeholder="Google Maps Embed URL"
              name="map"
              value={newPlace.map}
              onChange={handleInputChange}
              className="input input-bordered w-full mb-2"
            />
            <select
              name="category"
              value={newPlace.category}
              onChange={handleInputChange}
              className="select select-bordered w-full mb-4"
            >
              <option value="Adventure">Adventure</option>
              <option value="Nature">Nature</option>
              <option value="Cultural">Cultural</option>
            </select>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleAddPlace}>
                Add Place
              </button>
              <button className="btn btn-secondary" onClick={toggleModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

<div className="flex items-center mb-4 mt-4">
    <input
        type="text"
        className="input input-bordered flex-grow mr-2"
        placeholder="Search for a destination..."
        value={searchQuery}
        onChange={handleSearchChange}
    />
    <button className="btn btn-warning" onClick={toggleModal}>
        Add Travel Place
    </button>
</div>

      {/* Category Filter */}
      <div className="mb-4">
        {['All', 'Adventure', 'Nature', 'Cultural', 'Favorites'].map((category) => (
          <button
            key={category}
            className={`btn mr-2 ${selectedCategory === category ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid with filtered places */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredPlaces.length > 0 ? (
          filteredPlaces.map((place) => (
            <div key={place._id} className="card bg-base-100 w-96 shadow-xl">
              <figure className="px-10 pt-10">
                <img src={place.img} alt={place.title} className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{place.title}</h2>
                <p>{place.description}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/travel/${place._id}`)}
                >
                  Visit Now
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => handleFavoriteToggle(place._id)}
                >
                  {favorites.includes(place._id) ? 'Unfavorite' : 'Favorite'}
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
