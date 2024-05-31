"use client";
import React, { useEffect, useState } from "react";
import { speciesList } from "../constant/species";
export default function Form() {
  const playAlter = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    let future = urlParams.get("future");
    const species = urlParams.get("species");
    console.log(future + " " + species);
    const spec = speciesList.data.find((obj) => obj.name === species);
    if (spec) {
        const videoElement = document.createElement("video");
        if (future === "bright") {
            videoElement.src = spec.dark;
            future = "dark";
        } else {
            videoElement.src = spec.bright;
            future = "bright";
        }
      videoElement.height = window.innerHeight;
      videoElement.width = window.innerWidth;
      videoElement.controls = true;
      videoElement.autoplay = true;
        const handleFullscreenChange = () => {
          if(document.fullScreenElement || document.webkitIsFullScreen == true || document.mozFullScreen || document.msFullscreenElement ){
          }else {
                // Fullscreen mode is exited
                document.body.removeChild(videoElement);
                window.location.href = `/form?future=${future}&species=${species}`;
            }
        };
        videoElement.addEventListener("ended", () => {
          document.body.removeChild(videoElement);
          window.location.href = `/form?future=${future}&species=${data.name}`;
        });
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

  return (
    <div
      style={{
        backgroundImage: `url("rothamsted/gradient.webp")`,
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover',
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <p
          onClick={playAlter}
          style={{
            backgroundColor:'#fff',
            borderRadius: "10px",
            padding: "12px",
          }}
        >
          HEAR FROM THE ALTERNATIVE FUTURE
        </p>
        <p
        onClick={()=>window.location.href='/camera'}
          style={{
            backgroundColor:'#fff',
            borderRadius: "10px",
            padding: "10px",
            marginTop: "20px",
          }}
        >
          CONNECT WITH ANOTHER SPECIES
        </p>
        <p
        onClick={()=>window.location.href='/contact'}
          style={{
            backgroundColor:'#fff',
            marginTop: "20px",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          GET ON TEAM FARMER NOW!
        </p>
      </div>
    </div>
  );
}
