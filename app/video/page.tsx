// components/VideoPlayer.js
import { useEffect, useRef } from 'react';

const VideoPlayer = ({ videoSrc }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleUserInteraction = () => {
      videoElement.play().then(() => {
        // Autoplay started successfully
        videoElement.muted = false; // Unmute the video
      }).catch((error) => {
        // Autoplay failed, handle error or display a play button
        console.error('Autoplay failed:', error);
      });
    };

    // Listen for user interaction (e.g., a click)
    document.addEventListener('click', handleUserInteraction);

    return () => {
      // Cleanup: remove the event listener when the component unmounts
      document.removeEventListener('click', handleUserInteraction);
    };
  }, []);

  return (
    <video ref={videoRef} width="640" height="360" controls>
      <source src={videoSrc} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
