'use client';
import React, { useEffect } from 'react';

const GyroscopicMotionComponent: React.FC = () => {
  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      // Use event.alpha, event.beta, and event.gamma to access device orientation data
      // Perform actions based on the motion data

      // Example: adjust background position based on the device's beta and gamma values
      const backgroundImage = document.getElementById('backgroundImage');
      if (backgroundImage) {
        const newPositionX = ((event.beta || 0) / 180) * 100; // Adjust the factor as needed
        const newPositionY = ((event.gamma || 0) / 90) * 100; // Adjust the factor as needed
        backgroundImage.style.backgroundPositionX = `${newPositionX}%`;
        backgroundImage.style.backgroundPositionY = `${newPositionY}%`;
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []); // Empty dependency array ensures that the effect runs only once during component mount

  return (
    <div
      id="backgroundImage"
      style={{
        backgroundImage: 'url("rothamsted/BG-2.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      {/* Your React component content here */}
      <div>Your content goes here</div>
    </div>
  );
};

export default GyroscopicMotionComponent;
