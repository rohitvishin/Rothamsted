"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Landing() {
  const router = useRouter();
  const [headphone, setHeadphone] = useState(false);

  const camera = async () => {
    try {
      const mediaDevices = navigator.mediaDevices;
      if (mediaDevices && mediaDevices.getUserMedia) {
        const newStream = await mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
      } else {
        console.error("getUserMedia is not supported on this browser");
        // Handle unsupported feature or provide alternative
      }
    } catch (error) {
      console.error("Error accessing camera:", error);

      // Check if the error is due to user denying camera access
      if ((error as any).name === "NotAllowedError") {
        alert("Camera permission is mandatory");
      }
    }
    setTimeout(() => {
      setHeadphone(true);
    }, 3000);
  };

  useEffect(() => {
    setTimeout(() => {
      camera();
    }, 1000);
  }, [headphone]);

  if (typeof window !== "undefined") {
    if (window.innerWidth <= 768) {
      return (
        <div
          style={{
            backgroundImage: 'url("rothamsted/BG.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {headphone && (
            <div
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                height: "100vh",
                width: "100vw",
              }}
            >
              <p
                style={{
                  color: "white",
                  flexDirection: "column",
                  display: "flex",
                  padding: "30px",
                  textAlign: "end",
                }}
                onClick={() => {
                  return router.push("/home");
                }}
              >
                Skip
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "120px",
                }}
              >
                <img
                  src="/rothamsted/Headphone_Icon.png"
                  height={100}
                  width={100}
                  style={{}}
                  alt="Headphone"
                />
                <p style={{ color: "white" }}>
                  THIS APP IS BETTER EXPERIENCED WITH HEADPHONES
                </p>
              </div>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <>
          <h2>Please use a mobile device</h2>
        </>
      );
    }
  }
}
