import React from 'react';

const HariharFort = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-4">Explore the Historical Harihar Fort</h1>
      <p className="text-lg text-center mb-6">
        Harihar Fort, located in Maharashtra, India, is known for its impressive architecture and 
        strategic position overlooking the surrounding landscapes. The trek to the fort is a thrilling experience, 
        offering breathtaking views and a glimpse into the rich history of the region.
      </p>
      <div className="flex justify-center mb-6">
        <img
          src="/posts/Harihar2.jpg" // Change this path as needed
          alt="Harihar Fort"
          className="rounded-lg shadow-lg"
          style={{ width: '80%', height: 'auto' }}
        />
      </div>
      <h1 className="text-4xl font-bold text-center mb-4">Harihar Fort</h1>
      <div className="mb-6">
        <iframe
          title="Harihar Fort Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15005.818141770627!2d73.46185934279033!3d19.905241829511294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdd8aa3cbdc02b5%3A0x16fa7d9ad92945af!2sHarihar%20Fort!5e0!3m2!1sen!2sin!4v1728064605320!5m2!1sen!2sin"
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

export default HariharFort;
