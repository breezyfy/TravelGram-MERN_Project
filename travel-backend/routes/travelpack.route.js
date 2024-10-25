// routes/travelRoutes.js
import express from 'express';
import { getAllTravelPacks, getTravelPackById, createTravelPack } from '../controllers/travelpack.controller.js';

const router = express.Router();

// Route to get all travel places
router.get('/packs', getAllTravelPacks);

// Route to get a specific travel place by ID
router.get('/packs/:id', getTravelPackById);

// Route to add a new travel place
router.post('/packs', createTravelPack);

// Get a specific place by ID
router.get('/:id', async (req, res) => {
  try {
    const pack = await place.findById(req.params.id);
    if (!pack) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.json(pack);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;