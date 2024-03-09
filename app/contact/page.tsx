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
        backgroundImage: 'url("rothamsted/gradient.webp")',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <div style={{marginBottom:25}}>
        <img
        src="rothamsted/GetOnTeamFarmer1.webp"
        style={{ height: 190, width: 200 }}
      />
        <p>Make a pledge for your favourite species</p>
        </div>
        
        <div style={{margin:5,display:"flex",flexDirection:"row",backgroundColor:'#ebf5ca',padding:5,borderRadius:10}}>
          <img
          src="/webp/Btn_BEE.webp"
          alt="Headphone"
          height={80}
          width={80}
          />
          <div style={{marginTop:8,width:230,textAlign:'center'}}>
          <p>I will feed bees and other pllinators.</p>
          </div>
        </div>
        <div style={{margin:5}}>
        <img
        src="/pledge/BEE_Pledge.webp"
        alt="Headphone"
        />
        </div>


    </div>
  );
};
