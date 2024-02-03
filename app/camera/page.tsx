"use client";
import { useState, useEffect, useRef } from "react";
import "../camera.css";
import { speciesList } from "../constant/species";
import { useRouter } from "next/navigation";
export default function Camera() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const overlayVideo = useRef<HTMLVideoElement | null>(null);
  const overlayImg = useRef<HTMLImageElement | null>(null); // Reference to the overlay image element
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isBarcode, setIsBarcode] = useState(false);
  const [isTapON, setIsTapON] = useState(false);
  const [randomSpecies, setRandomSpecies] = useState(false);
  const [species, setSpecies] = useState<any>(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * speciesList.data.length);
    const randomSpecies = speciesList.data[randomIndex];
    setSpecies(randomSpecies);
  }, []);
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
  const handleCameraTap = () => {
    // Handle tap on camera feed
    setIsTapON(false);
    console.log("Camera tapped, open scanner!");
    setIsBarcode(true);
    setTimeout(() => {
      setIsBarcode(false);
      setRandomSpecies(true);
    }, 4000);
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
        if (overlayImg.current) {
          overlayImg.current.style.display = "none";
        }
      }, 100);
    }

    return () => {
      clearTimeout(hideTimeout);
    };
  }, [isConnecting]);

  return (
    <div className="main">
      {randomSpecies ===true ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ width: "100%", height: "100%" }}
            onClick={() => {
              return router.push("/species?name=" + species.name);
            }}
          />
          <div className="connecting">
            <img
              src={species.image}
              alt={species.name}
              className="overlayImage"
              style={{
                cursor: "pointer",
                height: "200px",
                padding: "20px",
                borderRadius: "10px",
                backgroundColor:'#fff'
              }}
            />
            <p className="connectingText">TAP TO KNOW MORE</p>
          </div>
        </>
      ) : (
        <>
          <video
            onClick={handleCameraTap}
            onTouchStart={handleCameraTap}
            ref={videoRef}
            autoPlay
            playsInline
            style={{ width: "100%", height: "100%" }}
          />

          {isConnecting && (
            <>
              <div className="connecting">
                <img
                  ref={overlayImg}
                  src="dial-over.png" // Replace with the URL of your transparent image
                  alt="Overlay"
                  className="overlayImage"
                />
              </div>
              <p className="connectingText">Connecting to Sentience Dial...</p>
            </>
          )}

          {isTapON && (
            <p className="tapOnText">Tap anywhere to scan the environment..</p>
          )}

          {isBarcode && (
            <div className="barCode">
              <video
                ref={overlayVideo}
                autoPlay
                playsInline
                muted
                loop
                src="video/welcome.mp4"
                className="videoOverlay"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
