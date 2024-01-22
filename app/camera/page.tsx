"use client";
import { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const overlayRef = useRef<HTMLImageElement | null>(null); // Reference to the overlay image element
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [showModal, setShowModal] = useState(false);

  const startCamera = async () => {
    try {
      const newStream: MediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
        setStream(newStream);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);

      // Check if the error is due to user denying camera access
      if ((error as any).name === "NotAllowedError") {
        setShowModal(true);
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

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleRetry = async () => {
    setShowModal(false);
    alert(
      'Please check your browser settings to enable camera access. You can usually find this in your browser settings under "Site settings" or "Permissions".'
    );
  };

  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <video ref={videoRef} autoPlay playsInline style={{ width: "100%" }} />

      {/* Overlay image */}
      <img
        ref={overlayRef}
        src="fish.png" // Replace with the URL of your transparent image
        alt="Overlay"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "20%",
          height: "20%",
          pointerEvents: "none",
        }}
      />

      <div>
        <Button variant="primary" onClick={startCamera}>
          Start Camera
        </Button>
        <Button variant="primary" onClick={stopCamera}>
          Stop Camera
        </Button>
      </div>

      {/* Modal for camera access denial */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Camera Access Denied</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You denied camera access. Do you want to try again?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleRetry}>
            Retry
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
