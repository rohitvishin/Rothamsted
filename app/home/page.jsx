"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
export default function Home() {
  const [Loader, setLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);
  if (Loader === true) {
    return (
      <div className="loader-container">
        <img src="dial.png" alt="Loading" className="loader-image" />
      </div>
    );
  } else {
    return (
      <div
        style={{
          backgroundImage: 'url("rothamsted/BG-H.png")',
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', width: '100%' }}>
  <Link href="/camera">
    <img src="Dial_3D.png" style={{ height: 180,marginBottom:30 }} alt="Dial Image" />
  </Link>
</div>

      </div>
    );
  }
}
