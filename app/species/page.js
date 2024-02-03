"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { speciesList } from "../constant/species";
const Species = () => {
  const [species, setSpecies] = useState(null)
  const [showModal, setShowModal] = useState(false);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const spec = urlParams.get("name");
  return spec;

}
export default Species;
