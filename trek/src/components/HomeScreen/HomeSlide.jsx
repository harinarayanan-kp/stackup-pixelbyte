import React, { useState, useEffect } from 'react';


const images = [
  'https://images.pexels.com/photos/2731977/pexels-photo-2731977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/1031955/pexels-photo-1031955.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/6153367/pexels-photo-6153367.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/1306248/pexels-photo-1306248.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

const HomeSlide = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="slidecontainer">
      <div className="slider" style={{ transform: `translateX(-${currentIndex * 400}px)` }}>
        {images.map((image, index) => (
          <div
            key={index}
            className="slider-item"
          >
              <img src={image} alt={` ${index + 1}`} className="image-fit" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeSlide;
