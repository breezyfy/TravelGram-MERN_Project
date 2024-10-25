import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { VscSignOut } from "react-icons/vsc";

function CommunityPage() {
  const [communities, setCommunities] = useState([]);
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeCommunityId, setActiveCommunityId] = useState(null);
  const [activeTab, setActiveTab] = useState('allCommunities');
  const [searchTerm, setSearchTerm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [newCommunityName, setNewCommunityName] = useState('');
  const [newCommunityDescription, setNewCommunityDescription] = useState('');

  const navigate = useNavigate();
  const { communityId: paramsCommunityId } = useParams();

  // Fetch all communities
  const fetchCommunities = async () => {
    try {
      const response = await fetch('/api/community/communities');
      const data = await response.json();
      setCommunities(data);
    } catch (error) {
      console.error('Error fetching communities:', error);
    }
  };

  useEffect(() => {
    fetchCommunities(); // Call to fetch communities on component mount
  }, []);

  // Fetch joined communities
  const fetchJoinedCommunities = async () => {
    try {
      const response = await fetch('/api/community/communities/joined', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      setJoinedCommunities(data);
    } catch (error) {
      console.error('Error fetching joined communities:', error);
    }
  };

  // Fetch joined communities when the user switches to the 'Joined Communities' tab
  useEffect(() => {
    if (activeTab === 'joinedCommunities') {
      fetchJoinedCommunities();
    }
  }, [activeTab]);

  // Fetch messages for the selected community
  const fetchMessages = async (communityId) => {
    try {
      const response = await fetch(`/api/community/messages/${communityId}`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

 // Handle community join
 const handleJoinCommunity = async (communityId) => {
  try {
    await fetch('/api/community/communities/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ communityId }),
    });

    // Fetch messages for the joined community (optional)
    fetchMessages(communityId); // This won't trigger the chatbox

    // Update the joined communities state
    const community = communities.find((community) => community._id === communityId);
    if (community && !joinedCommunities.includes(community)) {
      setJoinedCommunities([...joinedCommunities, community]);
    }

    // Do NOT set the activeCommunityId here
    // This prevents the chatbox from opening when the join button is clicked
  } catch (error) {
    console.error('Error joining community:', error);
  }
};

// Handle opening chat
const openChat = (communityId) => {
  setActiveCommunityId(communityId); // This opens the chatbox
  fetchMessages(communityId); // Fetch messages when opening chat
};

// Filtered communities based on search term and whether they are joined
const filteredCommunities = communities.filter((community) =>
  (community.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
  community.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
  !joinedCommunities.some(joinedCommunity => joinedCommunity._id === community._id) // Exclude joined communities
);

 // Handle leaving a community
 const handleLeaveCommunity = async (communityId) => {
  try {
    await fetch('/api/community/communities/leave', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ communityId }),
    });

    // Update the joined communities state
    setJoinedCommunities(joinedCommunities.filter((community) => community._id !== communityId));
  } catch (error) {
    console.error('Error leaving community:', error);
  }
};

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return; // Don't send empty messages

    try {
      await fetch(`/api/community/messages/${activeCommunityId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ text: newMessage }), // Send the text only
      });

      // Optionally, you can refetch messages after sending
      const newMsg = { sender: 'You', content: newMessage, createdAt: new Date() }; // Create a new message object
      setMessages((prevMessages) => [...prevMessages, newMsg]); // Append the new message to the local state
      setNewMessage(''); // Clear the input
      fetchMessages(activeCommunityId); // Fetch messages after sending
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Handle creating a new community
  const createCommunity = async () => {
    if (!newCommunityName || !newCommunityDescription) {
      return; // Ensure name and description are provided
    }

    try {
      const response = await fetch('/api/community/communities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCommunityName, description: newCommunityDescription }),
        credentials: 'include',
      });

      if (response.ok) {
        // Refresh communities after creation
        fetchCommunities();
        setModalVisible(false); // Close the modal
        setNewCommunityName(''); // Reset input fields
        setNewCommunityDescription('');
      } else {
        console.error('Error creating community:', await response.text());
      }
    } catch (error) {
      console.error('Error creating community:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 relative">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold">Communities</h1>
        <div className="flex items-center">
          <input
            type="text"
            className="input input-bordered input-sm w-full max-w-xs"
            placeholder="Search communities"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-sm btn-primary ml-2" onClick={() => setModalVisible(true)}>Create Community</button>
        </div>
      </div>
      <div className="tabs">
        <a className={`tab ${activeTab === 'allCommunities' ? 'tab-active' : ''}`} onClick={() => setActiveTab('allCommunities')}>
          All Communities
        </a>
        <a className={`tab ${activeTab === 'joinedCommunities' ? 'tab-active' : ''}`} onClick={() => setActiveTab('joinedCommunities')}>
          Joined Communities
        </a>
      </div>

      {activeTab === 'allCommunities' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filteredCommunities.map((community) => (
            <div key={community._id} className="card w-full bg-base-100 shadow-md">
              <div className="card-body">
                <h2 className="card-title">{community.name}</h2>
                <p>{community.description}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-sm btn-primary" onClick={() => handleJoinCommunity(community._id)}>Join</button>
                  {/* <button className="btn btn-sm btn-secondary ml-2" onClick={() => openChat(community._id)}>Chat</button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {joinedCommunities.map((community) => (
            <div key={community._id} className="card w-full bg-base-100 shadow-md">
              <div className="card-body">
                <h2 className="card-title">{community.name}</h2>
                <p>{community.description}</p>
                <div className="card-actions justify-end">
                <button className="btn btn-sm btn-secondary" onClick={() => openChat(community._id)}>Chat</button>
                <button className="btn btn-sm btn-danger ml-2" onClick={() => handleLeaveCommunity(community._id)}>
                 <VscSignOut /> Leave
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Community Modal */}
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-neutral-950 rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-lg font-semibold mb-4">Create Community</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium">Community Name</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={newCommunityName}
                onChange={(e) => setNewCommunityName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Description</label>
              <textarea
                className="textarea textarea-bordered w-full"
                value={newCommunityDescription}
                onChange={(e) => setNewCommunityDescription(e.target.value)}
                rows="3"
              />
            </div>
            <div className="flex justify-end">
              <button className="btn btn-secondary mr-2" onClick={() => setModalVisible(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={createCommunity}>Create</button>
            </div>
          </div>
        </div>
      )}

      {/* Chatbox Modal */}
      {activeCommunityId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white text-stone-950 rounded-lg shadow-lg w-full max-w-lg h-full flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Chat</h2>
              <button onClick={() => setActiveCommunityId(null)} className="btn btn-ghost">✖️</button>
            </div>
            <div className="messages overflow-y-scroll flex-grow border-t border-gray-900 p-4">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.username === 'You' ? 'text-right' : ''}`}>
                  <strong>{msg.username}: </strong>{msg.text}
                </div>
              ))}
            </div>
            <div className="flex p-4 border-t">
              <input
                type="text"
                className="input input-bordered flex-grow  text-white"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button className="btn btn-primary ml-2" onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
    
  );
}

export default CommunityPage;
