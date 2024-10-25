// import express from 'express';
// import { getAllCommunities, createCommunity, getJoinedCommunities, joinCommunity } from '../controllers/community.controller.js';
// import { protectRoute } from '../middleware/protectRoute.js';

// const router = express.Router();

// router.get('/communities', getAllCommunities); // Route to get all communities
// router.post('/communities',protectRoute, createCommunity); // Route to create a new community
// router.get('/communities/joined', protectRoute, getJoinedCommunities); // Get joined communities of the user
// router.post('/communities/join', protectRoute, joinCommunity); // Route to join a community

// export default router;
import express from 'express';
import { getAllCommunities, createCommunity, getJoinedCommunities, joinCommunity, getMessages, sendMessage } from '../controllers/community.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

// Community routes
router.get('/communities', protectRoute, getAllCommunities); // Route to get all communities
router.post('/communities', protectRoute, createCommunity); // Route to create a new community
router.get('/communities/joined', protectRoute, getJoinedCommunities); // Get joined communities of the user
router.post('/communities/join', protectRoute, joinCommunity); // Route to join a community

// Message routes
router.get('/messages/:communityId', protectRoute, getMessages); // Fetch messages for a community
router.post('/messages/:communityId', protectRoute, sendMessage); // Send a message to a community

export default router;

