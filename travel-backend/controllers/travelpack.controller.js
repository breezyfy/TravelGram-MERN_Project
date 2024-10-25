// controllers/travelController.js
import TravelPackages from '../models/travelpack.model.js';

// Get all travel places
export const getAllTravelPacks = async (req, res) => {
  try {
    const packs = await TravelPackages.find();
    res.status(200).json(packs);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Get a single travel pack by ID
export const getTravelPackById = async (req, res) => {
  try {
    const pack = await TravelPackages.findById(req.params.id);
    if (!pack) {
      return res.status(404).json({ error: 'Pack not found' });
    }
    res.status(200).json(pack);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Add a new travel place
export const createTravelPack = async (req, res) => {
  const { title, category, imgUrl, description, mapUrl,price,rating,duration ,email} = req.body;

  if (!title || !category || !imgUrl || !description || !mapUrl || !price || !duration || !rating || !email) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newPackage = new TravelPackages({
      title,
      category,
      imgUrl,
      description,
      mapUrl,
      price,
      duration,
      rating,
      email
    });
    const pack = await newPackage.save();
    res.status(201).json(pack);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};
