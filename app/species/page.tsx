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
      videoElement.src = species.video;
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
    <div>
      <h1>Random Species</h1>
      {species ? (
        <>
          <p>Name: {species.name}</p>
          <img
            src={species.image}
            alt={species.name}
            onClick={handleClick}
            style={{ cursor: "pointer" }}
          />
          <MyModal showModal={showModal} video1={species.video} video2={species.video} handleClose={() => setShowModal(false)} />
        </>
      ) : (
        <p>Loading..</p>
      )}
    </div>
  );
}
