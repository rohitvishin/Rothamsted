"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { speciesList } from "../constant/species";
const Species = () => {
  const [species, setSpecies] = useState(null)
  const [showModal, setShowModal] = useState(true);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };
  
  const staticYear = 2050;
  const formattedDateTime = currentDateTime.toLocaleString('en-US', dateOptions);
  const hour = currentDateTime.toLocaleString('en-US', options);

  const finalFormattedDate = formattedDateTime.replace(
    currentDateTime.getFullYear(),
    staticYear
  );
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const spec = urlParams.get("name");

    const speciesName = speciesList.data.find((obj) => obj.name === spec);

    if (speciesName) {
      setSpecies(speciesName);
    }
    return () => {
    };
  }, []);
  const handleClick = (side, future, data) => {
    console.log(side);
    if (data !== null && side !== null) {
      const videoElement = document.createElement("video");
      videoElement.src = side;
      videoElement.height = window.innerHeight;
      videoElement.width = window.innerWidth;
      videoElement.controls = true;
      videoElement.autoplay = true;

      const handleFullscreenChange = () => {
        if(document.fullScreenElement || document.webkitIsFullScreen == true || document.mozFullScreen || document.msFullscreenElement ){
        } else {
          document.body.removeChild(videoElement);
          window.location.href = `/form?future=${future}&species=${data.name}`;
          //do whatever you want on fullscreen close, like pause or mute
      }
      };
      document.addEventListener("fullscreenchange", handleFullscreenChange);
      videoElement.addEventListener("webkitfullscreenchange", handleFullscreenChange);
      videoElement.addEventListener("webkitendfullscreen", handleFullscreenChange);
      document.addEventListener("mozfullscreenchange", handleFullscreenChange);
      document.addEventListener("MSFullscreenChange", handleFullscreenChange);

      document.body.appendChild(videoElement);

      videoElement.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable fullscreen", err);
      });
    }
  };

  const handleVideoEnd = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
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
          <Modal
            className="bg-img background"
            show={showModal}
            onHide={handleModalClose}
            centered
          >
            <Modal.Body>
              <div style={{display:'flex',justifyContent:'center',textAlign:'center',marginBottom:150,flexDirection:'column'}}>
              <h2>{finalFormattedDate}</h2>
              <h1 style={{fontSize:'xxxx-large',fontWeight:'7000'}}>{hour}</h1>
              </div>
              <div className="d-flex flex-column align-items-center justify-content-center">
                <div
                  className="text-center mb-3"
                  onClick={() => handleClick(species.bright, "bright", species)}
                  style={{
                    borderRadius: 10,
                    backgroundColor: "#fff",
                    padding: 10,
                    width: "90%",
                  }}
                >
                  <h2>Bright future</h2>
                  <p>We're contacting you form a bright future..</p>
                </div>
                <hr />
                <div
                  className="text-center"
                  onClick={() => handleClick(species.dark, "dark", species)}
                  style={{
                    borderRadius: 10,
                    backgroundColor: "#fff",
                    padding: 10,
                    width: "90%",
                  }}
                >
                  <h2>Dark future</h2>
                  <p>We're contacting you form a dark future..</p>
                </div>
              </div>
            </Modal.Body>
            <style>
              {`
                .bg-img{
                  background-image: url("rothamsted/gradient.png");
                }
                .modal-content {
                  background-color: rgba(255, 255, 255, 0);
                  border: none;
                }
              `}
            </style>
          </Modal>
        </>
      ) : (
        <p>Loading..</p>
      )}
    </div>
  );
};

export default Species;