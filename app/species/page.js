"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { useSearchParams } from 'next/navigation'
import { speciesList } from "../constant/species";
const Species = () => {
  const [species, setSpecies] = useState(null)
  const [showModal, setShowModal] = useState(false);
  const searchParams = useSearchParams();
  const oldQueries = searchParams.get('name');
  const playIntro = (name) => {
    return <p>{name}</p>
  }
  useEffect(() => {
    
    if(oldQueries !==null){
      console.log(oldQueries)
      playIntro(oldQueries);
    }
  }, [oldQueries])
    
  return <p>{oldQueries}</p>
}

export default Species;
