import Community from '../models/community.model.js';
import Message from '../models/message.js'; // Import the Message model

// Fetch all communities
export const getAllCommunities = async (req, res) => {
  try {
    const communities = await Community.find();
    res.json(communities);
  } catch (error) {
    console.error('Error fetching communities:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new community
export const createCommunity = async (req, res) => {
  const { name, description } = req.body; // Destructure the request body
  const userId = req.user._id; // Get user ID from the authenticated request

  try {
    const newCommunity = new Community({ name, description, members: [userId] }); // Create a new community instance
    await newCommunity.save(); // Save it to the database
    res.status(201).json(newCommunity); // Send the created community as a response
  } catch (error) {
    console.error('Error creating community:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch communities joined by the current user
export const getJoinedCommunities = async (req, res) => {
  try {
    const userId = req.user._id; // Get the current user's ID from the protectRoute middleware
    const joinedCommunities = await Community.find({ members: userId });
    res.json(joinedCommunities);
  } catch (error) {
    console.error('Error fetching joined communities:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Join a community
export const joinCommunity = async (req, res) => {
  const { communityId } = req.body;
  const userId = req.user._id; // Get the current user's ID from the protectRoute middleware

  try {
    const community = await Community.findById(communityId);

    if (!community) {
      return res.status(404).json({ message: 'Community not found' });
    }

    // Check if the user is already a member
    if (!community.members.includes(userId)) {
      community.members.push(userId);
      await community.save();
    }

    res.status(200).json({ message: 'Joined community successfully' });
  } catch (error) {
    console.error('Error joining community:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch messages for a community
export const getMessages = async (req, res) => {
  const { communityId } = req.params; // Get the communityId from the request parameters
  try {
    // Fetch messages based on communityId
    const messages = await Message.find({ communityId }).sort({ createdAt: 1 }); // Sort messages by creation date (newest first)
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Send a message to a community
export const sendMessage = async (req, res) => {
  const { communityId } = req.params; // Get the communityId from the request parameters
  const { text } = req.body; // Get message text from the request body
  const username = req.user.username; // Assuming the username is available in the user object

  try {
    const newMessage = new Message({
      communityId,
      username,
      text,
      createdAt: new Date(), // Set the createdAt field to the current date
    });

    await newMessage.save(); // Save the message to the database
    res.status(201).json(newMessage); // Send the created message as a response
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
