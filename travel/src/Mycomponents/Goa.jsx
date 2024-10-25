import React from 'react';

const Goa = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-4">Explore the Enchanting Beauty of Goa</h1>
      <p className="text-lg text-center mb-6">
        Goa, a tropical paradise along the western coast of India, is renowned for its stunning beaches,
        vibrant nightlife, and rich cultural heritage. With its Portuguese influence, Goa offers a unique
        blend of history, spirituality, and adventure. From relaxing on the sandy shores to exploring
        lush landscapes and heritage sites, Goa is a destination that caters to every traveler's desire.
      </p>

      <div className="flex justify-center mb-6">
        <img
          src="/posts/Goa2.jpg" // Change this path as needed
          alt="Goa"
          className="rounded-lg shadow-lg"
          style={{ width: '80%', height: 'auto' }} // You can adjust the size here
        />
      </div>
      <h1 className="text-4xl font-bold text-center mb-4">Goa</h1>
      <div className="mb-6">
        <iframe
          title="Goa Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d984956.6951314246!2d73.3471910483667!3d15.350084489106958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfba106336b741%3A0xeaf887ff62f34092!2sGoa!5e0!3m2!1sen!2sin!4v1728066408773!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Goa;
