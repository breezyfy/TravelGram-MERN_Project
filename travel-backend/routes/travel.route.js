// routes/travelRoutes.js
import express from 'express';
import { getAllTravelPlaces, getTravelPlaceById, createTravelPlace } from '../controllers/travel.controller.js';

const router = express.Router();

// Route to get all travel places
router.get('/places', getAllTravelPlaces);

// Route to get a specific travel place by ID
router.get('/places/:id', getTravelPlaceById);

// Route to add a new travel place
router.post('/places', createTravelPlace);

// Get a specific place by ID
router.get('/:id', async (req, res) => {
  try {
    const place = await place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.json(place);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

