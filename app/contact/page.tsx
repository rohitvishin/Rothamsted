"use client";
import React, { useEffect, useState } from "react";
import { speciesList } from "../constant/species";
export default function Contact(){
    const [species, setspecies] = useState<any | null>(null);
    useEffect(() => {
      setspecies(speciesList.data);
    }, [])
    
  return (
    <div className="background" style={{
        backgroundImage: 'url("rothamsted/gradient.png")',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <div>
        <img
        src="rothamsted/GetOnTeamFarmer1.webp"
        style={{ height: 190, width: 200 }}
      />
        <p>Make a pledge for your favourite species</p>
        </div>
      <div className="picker" style={{marginTop:50}}>
        <div className="picker-window"></div>
        <ul className="picker-day">
          <li>Pledge 01</li>
          <li>Pledge 02</li>
          <li>Pledge 03</li>
          <li>Pledge 04</li>
          <li>Pledge 05</li>
          <li>Pledge 06</li>
          <li>Pledge 07</li>
        </ul>
        <ul className="picker-day">
          {
            species &&
            species.map((obj:any)=>{
                return (
                    <li key={obj.name}>{obj.name}</li>
                )
            })
          }
        </ul>
      </div>
      <div className="button-container">
        <button onClick={()=>window.location.href="/thankyou"} className="button">SIGN THE TREATY</button>
      </div>
    </div>
  );
};
