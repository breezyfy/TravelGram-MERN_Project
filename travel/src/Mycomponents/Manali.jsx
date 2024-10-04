import React from 'react';

const Manali = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-4">Serenity in the Hills: Manali</h1>
      <p className="text-lg text-center mb-6">
        Manali, a charming hill station in Himachal Pradesh, is known for its scenic beauty, adventure sports, 
        and vibrant culture. Surrounded by snow-capped peaks and lush valleys, it offers a perfect escape 
        for nature lovers and adventure seekers.
      </p>
      <div className="flex justify-center mb-6">
        <img
          src="/posts/Manali.jpg" // Change this path as needed
          alt="Manali"
          className="rounded-lg shadow-lg"
          style={{ width: '80%', height: 'auto' }}
        />
      </div>
      <h1 className="text-4xl font-bold text-center mb-4">Manali</h1>
      <div className="mb-6">
        <iframe
          title="Manali Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26997.521732068573!2d77.16652016291825!3d32.23950667848006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39048708163fd03f%3A0x8129a80ebe5076cd!2sManali%2C%20Himachal%20Pradesh!5e0!3m2!1sen!2sin!4v1728065354310!5m2!1sen!2sin"
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

export default Manali;
