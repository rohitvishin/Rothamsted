"use client";
import React, { useState } from "react";
import axios from "axios";
export default function Thankyou() {
  const [namedata, setname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState(false);
  const [process, setProcess] = useState(false);
  const handleSubmit=async()=>{
    console.log("form")
    if(namedata=="" || lastname=="" || email==""){
      setError(true);
      return;
    }else{
      setProcess(true);
      setError(false);
      const formdata= new FormData();
      formdata.append('NAME',namedata)
      formdata.append('LAST NAME',lastname)
      formdata.append('EMAIL',email)
      await axios.post('https://sheet.best/api/sheets/44625c6d-6f49-492e-b502-60bcce02fb50', formdata)
      .then(response => {
        console.log(response);
        setProcess(false);
      }).catch((err)=>{
        setProcess(false);
      });
      window.location.href = "/success"
    }
  }
  return (
    <div
      className="background"
      style={{
        marginTop:60,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        padding: 25,
      }}
    >
      <p style={{ fontSize: "35px", fontWeight: "bold" }}>Thank you!</p>
      <p>
        By making this pledge you have taken a positive step forward to a bright
        future. now submit the form below to complete your confirmation
      </p>
      <form style={{ marginTop: 38 }}>
        <input type="text" onChange={(e) => setname(e.target.value)}  placeholder="Name" name="name" />
        <input type="text" onChange={(e) => setLastname(e.target.value)} placeholder="Last Name" name="lastname" />
        <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Email" name="email" />
      </form>
      <div className="button-container">
        {
          error && (
            <p style={{color:'red'}}>All fields are mendatory</p>
          )
        }
        <button
          className="button"
          style={{
            backgroundImage: `url("rothamsted/gradient.webp")`,
            borderRadius: "10px",
            padding: "10px",
            width: '100%',
            color:'#fff'
          }}
          onClick={process ? undefined : handleSubmit}
        >
          {process ? 'processing..' : 'SUBMIT'}
        </button>
      </div>
      <p style={{marginTop:35}}>
        <h3 style={{fontWeight:600}}>Disclaimer :</h3>
        By Making this pledge you have taken a positive step forward to a bright
        future. now submit the form below to complete your confirmation.
        By Making this pledge you have taken a positive step forward to a bright
        future.
      </p>
    </div>
  );
}
