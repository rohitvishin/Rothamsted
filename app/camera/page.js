"use client";
import { useState, useEffect, useRef } from "react";
import "../camera.css";
import { speciesList } from "../constant/species";
import { useRouter } from "next/navigation";

export default function Camera() {
  const router = useRouter();
  const videoRef = useRef(null);
  const overlayVideo = useRef(null);
  const overlayImg = useRef(null);
  const [stream, setStream] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isBarcode, setIsBarcode] = useState(false);
  const [isTapON, setIsTapON] = useState(false);
  const [randomSpecies, setRandomSpecies] = useState(false);
  const [species, setSpecies] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * speciesList.data.length);
    const randomSpecie = speciesList.data[randomIndex];
    setSpecies(randomSpecie);
  }, []);

  const startCamera = async () => {
    setIsConnecting(true);

    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
        setStream(newStream);

        setTimeout(() => {
          setIsConnecting(false);
          setIsTapON(true);
        }, 3000);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);

      if (error.name === "NotAllowedError") {
        setIsConnecting(false);
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
    setIsTapON(false);
    console.log("Camera tapped, open scanner!");
    setIsBarcode(true);

    setTimeout(() => {
      setIsBarcode(false);
      setRandomSpecies(true);
    }, 4000);
  };

  const playVideo = () => {
    const videoElement = document.createElement("video");
    videoElement.src = species.intro;
    videoElement.height = window.innerHeight;
    videoElement.width = window.innerWidth;
    videoElement.controls = true;
    videoElement.autoplay = true;

    const handleFullscreenChange = () => {
      if (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      ) {
      } else {
        document.body.removeChild(videoElement);
        router.push("/species?name=" + species.name);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    videoElement.addEventListener(
      "webkitfullscreenchange",
      handleFullscreenChange
    );
    videoElement.addEventListener("webkitendfullscreen", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    document.body.appendChild(videoElement);

    videoElement.requestFullscreen().catch((err) => {
      console.error("Error attempting to enable fullscreen", err);
    });
  };

  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    let hideTimeout;

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
      {randomSpecies ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ width: "100%", height: "100%" }}
            onClick={playVideo}
          />
          <div className="connecting">
            <img
              src={species.image}
              alt={species.name}
              className="overlayImage"
              style={{
                cursor: "pointer",
                height: "140px",
                padding: "20px",
                borderRadius: "10px",
                backgroundColor: "#fff",
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
              <p className="connectingText">
                Connecting to Sentience Dial...
              </p>
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
                src="video/scanner.mov"
                className="videoOverlay"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}