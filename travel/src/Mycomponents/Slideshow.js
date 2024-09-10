// src/Slideshow.js
import React, { useState } from 'react';
import './Slideshow.css'; // Import the CSS file for styling

const Slideshow = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="slideshow">
            <button className="prev" onClick={goToPrevious}>❮</button>
            <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} className="slide-image"/>
            <button className="next" onClick={goToNext}>❯</button>
        </div>
    );
};

export default Slideshow;
