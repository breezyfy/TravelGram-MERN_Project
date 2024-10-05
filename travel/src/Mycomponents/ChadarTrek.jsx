import React from 'react';

const ChadarTrek = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-4">Adventure Awaits: Chadar Trek</h1>
      <p className="text-lg text-center mb-6">
        The Chadar Trek is a thrilling expedition over the frozen Zanskar River in Ladakh, India. 
        This unique trek offers breathtaking views of snow-capped mountains and ice formations, 
        making it a must-visit for adventure enthusiasts and nature lovers alike.
      </p>
      <div className="flex justify-center mb-6">
        <img
          src="/posts/Chadar2.jpg" // Change this path as needed
          alt="Chadar Trek"
          className="rounded-lg shadow-lg"
          style={{ width: '80%', height: 'auto' }}
        />
      </div>
      <h1 className="text-4xl font-bold text-center mb-4">Chadar Trek</h1>
      <div className="mb-6">
        <iframe
          title="Chadar Trek Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26416.459309265396!2d77.54372946804571!3d34.144873223556374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38fdeb3011e21813%3A0x532c1458f6469c60!2sChadar%20Trek%20-%20The%20Frozen%20Zanskar%20River%20Adventure!5e0!3m2!1sen!2sin!4v1728065890245!5m2!1sen!2sin"
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

export default ChadarTrek;
