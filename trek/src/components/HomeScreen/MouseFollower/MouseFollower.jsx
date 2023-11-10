import React, { useState, useEffect } from 'react';
import './mousefollower.css'

const MouseFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
    className='mousetracker'
      style={{
        position: 'fixed',
        left: position.x + 'px',
        top: position.y + 'px',
      }}
    >
    </div>
  );
};

export default MouseFollower;
