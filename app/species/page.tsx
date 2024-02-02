"use client";
import React, { useEffect, useState } from "react";
import { speciesList } from "../constant/species";
import MyModal from "../constant/MyModal";


export default function Species() {
  const [species, setSpecies] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * speciesList.data.length);
    const randomSpecies = speciesList.data[randomIndex];
    setSpecies(randomSpecies);
  }, []);

  const handleVideoEnd = () => {
    setShowModal(true); // Show the modal when the video ends
  };

  const handleClick = () => {
    if (species !== null) {
      const videoElement = document.createElement("video");
      videoElement.src = species.intro;
      videoElement.height = window.innerHeight;
      videoElement.width = window.innerWidth;
      videoElement.controls = true;
      videoElement.autoplay = true;

      videoElement.addEventListener("ended", handleVideoEnd);

      // Event listener for exiting fullscreen
      document.addEventListener("fullscreenchange", () => {
        if (!document.fullscreenElement) {
          document.body.removeChild(videoElement);
          // Exit fullscreen when the video ends
          handleVideoEnd();
        }
      });

      document.body.appendChild(videoElement);

      videoElement.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable fullscreen", err);
      });
    }
  };

  return (
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {species ? (
        <>
          <div
            style={{
              borderRadius:'15px',
              backgroundImage: `url("./rothamsted/gradient.png")`,
            }}
          >
            <img
              src={species.image}
              alt={species.name}
              onClick={handleClick}
              style={{
                cursor: "pointer",
                height: "200px",
                padding:'20px',
                borderRadius: "10px",
              }}
            />
            <p>TAP TO KNOW MORE</p>
          </div>
          <MyModal
            showModal={showModal}
            data={species}
            video1={species.bright}
            video2={species.dark}
            handleClose={() => setShowModal(false)}
          />
        </>
      ) : (
        <p>Loading..</p>
      )}
    </div>
  );
}
