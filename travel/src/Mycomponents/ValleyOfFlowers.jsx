import React from 'react';

const ValleyOfFlowers = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-4">A Floral Paradise: Valley of Flowers</h1>
      <p className="text-lg text-center mb-6">
        Nestled in the Himalayas, the Valley of Flowers is a UNESCO World Heritage Site 
        famous for its stunning array of alpine flowers and diverse wildlife. This enchanting valley 
        is best explored during the monsoon season when it blooms into a vibrant tapestry of colors.
      </p>
      <div className="flex justify-center mb-6">
        <img
          src="/posts/Flowers2.jpg" // Change this path as needed
          alt="Valley of Flowers"
          className="rounded-lg shadow-lg"
          style={{ width: '80%', height: 'auto' }}
        />
      </div>
      <h1 className="text-4xl font-bold text-center mb-4">Valley of Flowers</h1>
      <div className="mb-6">
        <iframe
          title="Valley of Flowers Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3429.6766052022244!2d79.60476417503732!3d30.727490685886913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a791153bd771ef%3A0x1f42050f9b6c125f!2sValley%20of%20Flowers%20National%20Park!5e0!3m2!1sen!2sin!4v1728065473765!5m2!1sen!2sin"
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

export default ValleyOfFlowers;
