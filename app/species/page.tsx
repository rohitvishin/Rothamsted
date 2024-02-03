'use client'
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { speciesList } from "../constant/species";

interface ExtendedDocument extends Document {
  webkitFullscreenElement?: Element;
  webkitIsFullScreen?: boolean;
  mozFullScreen?: Element;
  msFullscreenElement?:Element;
}

const Species: React.FC = () => {
  const [species, setSpecies] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const extendedDocument = document as ExtendedDocument;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const oldQueries = urlParams.get("name");

    if (oldQueries !== null && typeof window !== 'undefined') {
      // playIntro(oldQueries);
    }
    handleVideoEnd();
  }, []);

  const playIntro = (name: string) => {
    
    const speciesName = speciesList.data.find((obj) => obj.name === name);

    if (speciesName) {
      setSpecies(speciesName);

      if (speciesName !== null) {
        const videoElement = document.createElement("video");
        videoElement.src = speciesName.intro;
        videoElement.height = window.innerHeight;
        videoElement.width = window.innerWidth;
        videoElement.controls = true;
        videoElement.autoplay = true;
        videoElement.setAttribute("playsinline", "");
        const handleFullscreenChange = () => {
          if (
            document.fullscreenElement ||
            extendedDocument.webkitIsFullScreen === true ||
            extendedDocument.mozFullScreen ||
            extendedDocument.msFullscreenElement
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
        document.addEventListener(
          "mozfullscreenchange",
          handleFullscreenChange
        );
        document.addEventListener("MSFullscreenChange", handleFullscreenChange);

        document.body.appendChild(videoElement);

        videoElement.requestFullscreen().catch((err) => {
          console.error("Error attempting to enable fullscreen", err);
        });
      }
    }
  };

 

  const handleClick = (side: string, future: string, data: any) => {
    if (data !== null && side !== null) {
      const videoElement = document.createElement("video");
      videoElement.src = side;
      videoElement.height = window.innerHeight;
      videoElement.width = window.innerWidth;
      videoElement.controls = true;
      videoElement.autoplay = true;

      const handleFullscreenChange = () => {
        if (
          document.fullscreenElement ||
          extendedDocument.webkitIsFullScreen === true ||
          extendedDocument.mozFullScreen ||
          extendedDocument.msFullscreenElement
        ) {
        } else {
          document.body.removeChild(videoElement);
          window.location.href = `/form?future=${future}&species=${data.name}`;
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
      document.addEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
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
  if(typeof window !== 'undefined')
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
                  onClick={() =>
                    handleClick(species.bright, "bright", species)
                  }
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
  else
  return <p>not supported</p>
};

export default Species;
