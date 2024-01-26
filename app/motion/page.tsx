'use client';
import React, { useEffect } from 'react';

const Motion = () => {
  useEffect(() => {
    const handleOrientation = (event) => {
      // Use event.alpha, event.beta, and event.gamma to access device orientation data
      // Perform actions based on the motion data

      // Example: rotate an element based on the device's alpha value
      const elementToRotate = document.getElementById('rotateMe');
      if (elementToRotate) {
        elementToRotate.style.transform = `rotate(${event.alpha}deg)`;
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []); // Empty dependency array ensures that the effect runs only once during component mount

  return (
    <div>
      {/* Your React component content here */}
      <div id="rotateMe">Rotate me based on gyroscopic motion!</div>
    </div>
  );
};

export default Motion;
