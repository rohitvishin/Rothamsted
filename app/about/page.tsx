'use client';
import { useState, useEffect, useRef } from 'react';

export default function About() {
  const videoRef = useRef();
  const [stream, setStream] = useState(null);

  const startCamera = async () => {
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
        setStream(newStream);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setStream(null);
    }
  };

  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline />
      <div>
        <button onClick={startCamera}>Start Camera</button>
        <button onClick={stopCamera}>Stop Camera</button>
      </div>
    </div>
  );
}
