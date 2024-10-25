import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './travelpage.css';

export default function Explore() {
  const navigate = useNavigate();
  const [packs, setPacks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPacks, setNewPacks] = useState({
    title: '',
    category: 'Adventure',
    imgUrl: '',
    description: '',
    mapUrl: '',
    price: '',
    duration: '',
    email:'',
    rating: ''
  });

  // Fetch places from the backend
  useEffect(() => {
    const fetchPacks = async () => {
      try {
        const response = await fetch('/api/packages/packs');
        const data = await response.json();
        setPacks(data);
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    };

    fetchPacks();
  }, []);

  // Filter based on search query and selected category
  const filteredPacks = packs.filter((packs) => {
    const matchesSearch = packs.title && packs.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' ||
      (selectedCategory === 'Favorites' && favorites.includes(packs._id)) ||
      packs.category === selectedCategory;

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
    setNewPacks((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new travel place
  const handleAddPacks = async () => {
    try {
      const response = await fetch('/api/packages/packs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPacks),
      });
      const data = await response.json();
      setPacks((prev) => [...prev, data]); // Add the new place to the list
      setNewPacks({ title: '', category: 'Adventure', imgUrl: '', description: '', mapUrl: '',email:'',rating:'',duration:'',price:'' });
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
            <legend>Title</legend>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={newPacks.title}
              onChange={handleInputChange}
              className="input input-bordered w-full mb-2"
            />
            <legend>image url</legend>
            <input
              type="text"
              placeholder="Image URL"
              name="imgUrl"
              value={newPacks.imgUrl}
              onChange={handleInputChange}
              className="input input-bordered w-full mb-2"
            />
            <legend>Description</legend>
            <textarea
              placeholder="Description"
              name="description"
              value={newPacks.description}
              onChange={handleInputChange}
              className="textarea textarea-bordered w-full mb-2"
            />
            <legend>map url</legend>
            <input
              type="text"
              placeholder="Google Maps Embed URL"
              name="mapUrl"
              value={newPacks.mapUrl}
              onChange={handleInputChange}
              className="input input-bordered w-full mb-2"
            />
            <legend>category</legend>
            <select
              name="category"
              value={newPacks.category}
              onChange={handleInputChange}
              className="select select-bordered w-full mb-4"
            >
              <option value="Adventure">Adventure</option>
              <option value="Nature">Nature</option>
              <option value="Cultural">Cultural</option>
            </select>
            <legend>email</legend>
            <input
              type="email"
              placeholder="Enter your Email here.."
              name="email"
              value={newPacks.email}
              onChange={handleInputChange}
              className="input input-bordered w-full mb-2"
            />
            <legend>price</legend>
            <input
              type="number"
              placeholder="Enter the Cost of package"
              name="price"
              value={newPacks.price}
              onChange={handleInputChange}
              className="input input-bordered w-full mb-2"
            />
            <legend>duration</legend>
            <input
              type="number"
              placeholder="Enter the duration of trip"
              name="duration"
              value={newPacks.duration}
              onChange={handleInputChange}
              className="input input-bordered w-full mb-2"
            />
            <legend>rating</legend>
            <input
              type="number"
              placeholder="Add the rating out of 5"
              name="rating"
              value={newPacks.rating}
              onChange={handleInputChange}
              className="input input-bordered w-full mb-2"
            />
            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleAddPacks}>
                Add Package
              </button>
              <button className="btn btn-secondary" onClick={toggleModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Box and Add Travel Pack Button */}
{/* Search Box and Add Travel Pack Button */}
<div className="flex items-center mb-4 mt-4">
    <input
        type="text"
        className="input input-bordered flex-grow mr-2"
        placeholder="Search for a destination..."
        value={searchQuery}
        onChange={handleSearchChange}
    />
    <button className="btn btn-warning" onClick={toggleModal}>
        Add Travel Pack
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
        {filteredPacks.length > 0 ? (
          filteredPacks.map((packs) => (
            <div key={packs._id} className="card bg-base-100 w-96 shadow-xl">
              <figure className="px-10 pt-10">
                <img src={packs.imgUrl} alt={packs.title} className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{packs.title}</h2>
                <p>Price: ₹{packs.price}</p>
                <p>Duration: {packs.duration}</p>
                <p>Rating: {packs.rating}/5</p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/packages/${packs._id}`)}
                >
                  Visit Now
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => handleFavoriteToggle(packs._id)}
                >
                  {favorites.includes(packs._id) ? 'Unfavorite' : 'Favorite'}
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
