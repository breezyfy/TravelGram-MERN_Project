// controllers/travelController.js
import TravelPlace from '../models/travelplace.model.js';

// Get all travel places
export const getAllTravelPlaces = async (req, res) => {
  try {
    const places = await TravelPlace.find();
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Get a single travel place by ID
export const getTravelPlaceById = async (req, res) => {
  try {
    const place = await TravelPlace.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ error: 'Place not found' });
    }
    res.status(200).json(place);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Add a new travel place
export const createTravelPlace = async (req, res) => {
  const { title, category, img, description, map } = req.body;

  if (!title || !category || !img || !description || !map) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newPlace = new TravelPlace({
      title,
      category,
      img,
      description,
      map,
    });
    const place = await newPlace.save();
    res.status(201).json(place);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};
