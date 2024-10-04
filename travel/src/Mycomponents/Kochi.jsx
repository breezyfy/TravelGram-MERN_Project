import React from 'react';

const Kochi = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-4">Cultural Richness: Kochi</h1>
      <p className="text-lg text-center mb-6">
        Kochi, a vibrant city in Kerala, is known for its rich cultural heritage, beautiful backwaters, 
        and colonial architecture. From exploring ancient forts to savoring delicious seafood, Kochi offers 
        a unique blend of tradition and modernity.
      </p>
      <div className="flex justify-center mb-6">
        <img
          src="/posts/Kochi2.jpg" // Change this path as needed
          alt="Kochi"
          className="rounded-lg shadow-lg"
          style={{ width: '80%', height: 'auto' }}
        />
      </div>
      <h1 className="text-4xl font-bold text-center mb-4">Kochi Kerala</h1>
      <div className="mb-6">
        <iframe
          title="Kochi Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d251482.31471048231!2d76.13611890598834!3d9.982854195247093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d514abec6bf%3A0xbd582caa5844192!2sKochi%2C%20Kerala!5e0!3m2!1sen!2sin!4v1728066243728!5m2!1sen!2sin"
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

export default Kochi;
