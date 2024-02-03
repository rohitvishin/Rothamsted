"use client"
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { speciesList } from "../constant/species";
const Species = () => {
  const [species, setSpecies] = useState(null)
  const [showModal, setShowModal] = useState(false);
  const playIntro = (name) => {
    const speciesName = speciesList.data.find((obj) => obj.name === name);
    if (speciesName) {
        setSpecies(speciesName);
        console.log(speciesName);
        if (speciesName !== null) {
          const videoElement = document.createElement("video");
          videoElement.src = speciesName.intro;
          videoElement.height = window.innerHeight;
          videoElement.width = window.innerWidth;
          videoElement.controls = true;
          videoElement.autoplay = true;

          const handleFullscreenChange = () => {
            if (
              document.fullScreenElement ||
              document.webkitIsFullScreen == true ||
              document.mozFullScreen ||
              document.msFullscreenElement
            ) {
            } else {
              document.body.removeChild(videoElement);
              handleVideoEnd();
              // Do whatever you want on fullscreen close, like pause or mute
            }
          };

          document.addEventListener("fullscreenchange", handleFullscreenChange);
          videoElement.addEventListener(
            "webkitfullscreenchange",
            handleFullscreenChange
          );
          videoElement.addEventListener(
            "webkitendfullscreen",
            handleFullscreenChange
          );
          document.addEventListener("mozfullscreenchange", handleFullscreenChange);
          document.addEventListener("MSFullscreenChange", handleFullscreenChange);

          document.body.appendChild(videoElement);

          videoElement.requestFullscreen().catch((err) => {
            console.error("Error attempting to enable fullscreen", err);
          });
        }
      };
  }
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const oldQueries = urlParams.get('name');
    setShowModal(oldQueries)
  }, [])  
  if(showModal)
  return(
    <p>{showModal}</p>
  )
  else{
    return(
      <p>loading.</p>
    )
  }
}
export default Species;
