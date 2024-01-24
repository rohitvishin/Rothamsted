"use client";
import { useState, useEffect, useRef } from "react";
export default function Camera() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const overlayRef = useRef<HTMLImageElement | null>(null); // Reference to the overlay image element
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isTapON, setIsTapON] = useState(false);

  useEffect(() => {
    if(isTapON===true){
      setTimeout(() => {
        setIsTapON(false)
      }, 2000);
    }
  }, [isTapON]);
  const startCamera = async () => {    
    setIsConnecting(true); // Set to true when starting the camera connection
    try {
      const newStream: MediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
        setStream(newStream);
        // Wait for 2 seconds and then hide the overlay image and the connecting text
        setTimeout(() => {
          setIsConnecting(false);
          setIsTapON(true);
        }, 3000);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);

      // Check if the error is due to user denying camera access
      if ((error as any).name === "NotAllowedError") {
        setIsConnecting(false); // Set to false if camera access is denied
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setStream(null);
    }
  };

  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    let hideTimeout: NodeJS.Timeout;

    if (!isConnecting) {
      hideTimeout = setTimeout(() => {
        if (overlayRef.current) {
          overlayRef.current.style.display = "none";
        }
      }, 100);
    }

    return () => {
      clearTimeout(hideTimeout);
    };
  }, [isConnecting]);

  return (
    <div style={{ position: "relative" }}>
      <video ref={videoRef} autoPlay playsInline style={{ width: "100%" }} />

      {isConnecting && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.5)", // White with 50% transparency
            pointerEvents: "none",
          }}
        >
          <img
            ref={overlayRef}
            src="dial-over.png" // Replace with the URL of your transparent image
            alt="Overlay"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "40%",
              height: "40%",
              pointerEvents: "none",
            }}
          />
        </div>
      )}

      {isConnecting && (
        <p
          style={{
            position: "absolute",
            top: "60%",
            paddingTop: 80,
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "black",
          }}
        >
          Connecting to Sentience Dial...
        </p>
      )}
      {
        isTapON && (
          <p
            style={{
              position: "absolute",
              top: "60%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "black",
              backgroundColor:'yellow'
            }}
          >
            Tap anywhere to scan the environment..
          </p>
        )
      }
    </div>
  );
}
