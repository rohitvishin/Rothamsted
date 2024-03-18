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
    }, 26000);
    return () => {
      // Cleanup audio when component unmounts
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);
  return (
    <div
      style={{
        backgroundImage: 'url("rothamsted/gradient.webp")',
        backgroundSize: "cover", // Add this line
        height: "100vh",
        backgroundRepeat:'no-repeat',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop:50,
      }}
    >
      <img
        src="rothamsted/Text_Connect.png"
        style={{ height: 220, width: 340}}
        alt="Dial Image"
      />
      <img
        src="rothamsted/Dial_3D.gif"
        style={{ height: 300, width: 340 }}
        alt="Dial Image"
      />
      {showText && (
        <Link href="/camera">
          <p style={{fontWeight:500,marginTop:20}}>TAP TO CONNECT</p>
        </Link>
      )}
    </div>
  );
}
