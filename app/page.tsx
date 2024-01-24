"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
export default function Home() {
  const [Loader, setLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, [])
  if(Loader===true){
    return (
      <div className="loader-container">
        <img src="dial.png" alt="Loading" className="loader-image" />
      </div>
    )
  }
  if (typeof window !== "undefined") {
    if (window.innerWidth <= 768) {
      return (
        <div style={{ backgroundColor: "#729dab", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ margin:50,height:420,textAlign:'center', backgroundColor: "#dee0e3" }}>
            <h1 style={{paddingTop:150,fontSize:30,fontWeight:'bold'}}>Behold! The Rothamsted Sentience Dial!</h1>
          </div>
          <div style={{ margin:10 }}>
            <Link href="/camera"><img src='dial.png' style={{height:90}}></img></Link>
          </div>
        </div>
      );
    }
  } else {
    return (
      <>
        <h2>Pls use mobile</h2>
      </>
    );
  }
}
