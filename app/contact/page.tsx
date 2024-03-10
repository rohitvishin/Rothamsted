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
        
        <div style={{maxHeight: '70%', overflowY: 'auto'}}>
        {
<<<<<<< HEAD
          speciesList.data.map((item,index)=>{
            return <div key={index} style={{margin:10,display:"flex",flexDirection:"row",backgroundColor:'#ebf5ca',padding:5,borderRadius:10}}>
=======
          speciesList.data.map((item)=>(
            <div style={{margin:10,display:"flex",flexDirection:"row",backgroundColor:'#ebf5ca',padding:5,borderRadius:10}}>
>>>>>>> 16b7a99195fcfb9e684e36d395c79d843009fa41
              <img
              src={item.image}
              alt={item.name}
              height={80}
              width={80}
              />
              <div style={{marginTop:8,width:230,textAlign:'center'}}>
              <p>{item.pledge_line}</p>
              </div>
          </div>
          ))
        }
        </div>

    </div>
  );
};
