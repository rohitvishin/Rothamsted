"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [showText, setshowText] = useState(false);
  const audioUrl = "rothamsted/welcome.mp3"; // replace with the actual audio file URL

  useEffect(() => {
    const audio = new Audio(audioUrl);
    audio.play();
    setTimeout(() => {
      setshowText(true);
    }, 38000);
    return () => {
      // Cleanup audio when component unmounts
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audioUrl]);
  return (
    <div
      style={{
        backgroundImage: 'url("rothamsted/gradient.png")',
        backgroundSize: "cover", // Add this line
        height: "100vh",
        backgroundRepeat:'no-repeat',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src="rothamsted/Text_Connect.png"
        style={{ height: 310, width: 340}}
        alt="Dial Image"
      />
      <img
        src="rothamsted/Dial_3D_Icon.gif"
        style={{ height: 310, width: 340 }}
        alt="Dial Image"
      />
      {showText && (
        <Link href="/camera">
          <p>TAP TO CONNECT</p>
        </Link>
      )}
    </div>
  );
}
