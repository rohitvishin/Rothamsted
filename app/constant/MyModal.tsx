"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { FC, useState } from "react";
import { Modal, Button } from "react-bootstrap";

interface MyModalProps {
  showModal: boolean;
  data:any,
  video1: any;
  video2: any;
  handleClose: () => void;
}
const handleClick = (side: any,future:string,data:any) => {
  console.log(side);
  if (side !== null) {
    const videoElement = document.createElement("video");
    videoElement.src = side;
    videoElement.height = window.innerHeight;
    videoElement.width = window.innerWidth;
    videoElement.controls = true;
    videoElement.autoplay = true;

    // Event listener for exiting fullscreen
    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement) {
        document.body.removeChild(videoElement);
        // Exit fullscreen when the video ends
        window.location.href = "/form?future="+future+"&species="+data.name;
      }
    });

    document.body.appendChild(videoElement);

    videoElement.requestFullscreen().catch((err) => {
      console.error("Error attempting to enable fullscreen", err);
    });
  }
};

const MyModal: FC<MyModalProps> = ({
  showModal,
  data,
  video1,
  video2,
  handleClose,
}) => {
  return (
    <Modal className="bg-img" show={showModal} onHide={handleClose} centered>
      <Modal.Body>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div
            className="text-center mb-3"
            onClick={() => handleClick(video1,'bright',data)}
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
            onClick={() => handleClick(video2,'dark',data)}
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
  );
};

export default MyModal;
