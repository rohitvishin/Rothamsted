"use client";
import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react";
export default function Landing() {
  const router = useRouter()
  const [Headphone, setHeadphone] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setHeadphone(true);
    }, 2000);
    if(Headphone===true){
      setTimeout(() => {
        router.push('/home')
      }, 2000);
    }
  }, [Headphone])
  if (typeof window !== "undefined") {
    if (window.innerWidth <= 768) {
      return (
        <div style={{ backgroundImage: 'url("rothamsted/BG.png")', backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
         {
          Headphone && (
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column',textAlign:'center', alignItems: 'center', justifyContent: 'center' }}>
                <img src="/rothamsted/Headphone_Icon.png" height={100} width={100} style={{}} alt="Headphone" />
                <p style={{ color: 'white' }}>
                THIS APP IS BETTER EXPERIENCED WITH HEADPHONES
                </p>
              </div>
             
          )
         } 
        </div>
      )
    }
  } else {
    return (
      <>
        <h2>Pls use mobile</h2>
      </>
    );
  }
}
