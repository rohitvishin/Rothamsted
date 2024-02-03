"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { useSearchParams } from 'next/navigation'
import { speciesList } from "../constant/species";
const Species = () => {
  const [species, setSpecies] = useState(null)
  const [showModal, setShowModal] = useState(false);
  const searchParams = useSearchParams();
  const oldQueries = searchParams.get('name');
  const playIntro = (name) => {
    return <p>{name}</p>
  }
  useEffect(() => {
    
    if(oldQueries !==null){
      console.log(oldQueries)
      playIntro(oldQueries);
    }
  }, [oldQueries])
    
  return <p>{oldQueries}</p>
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
            className="bg-img"
            show={showModal}
            onHide={handleModalClose}
            centered
          >
            <Modal.Body>
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
                  <p>We are from the bright future</p>
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
                  <p>We are from the dark future</p>
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
