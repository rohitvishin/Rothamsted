"use client";
import React, { useEffect, useState } from "react";
import { speciesList } from "../constant/species";
export default function Species() {
const [Species, setSpecies] = useState<any>(null);
useEffect(() => {
    console.log(speciesList.data);
    const randomIndex = Math.floor(Math.random() * speciesList.data.length);
    // Get the random species using the random index
    const randomSpecies = speciesList.data[randomIndex];
    setSpecies(randomSpecies);
    console.log(randomSpecies);
}, [])
    
if(Species!==null){
    return (
        <div>
          <h1>Random Species</h1>
          <p>Name: {Species.name}</p>
          <img src={Species.image} alt={Species.name} />
        </div>
      );
}else{
    return (
        <p>Loading..</p>
    )
}
  
}
