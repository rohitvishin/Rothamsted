"use client";
import React from "react";
export default function Thankyou() {
  return (
    <div
      style={{
        backgroundImage: 'url("rothamsted/gradient.png")',
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 25,
      }}
    >
      <p style={{ fontSize: "30px", fontWeight: "bold" }}>
        Thankyou!
      </p>
      <p>By Making this pledge you have taken a positive step forward to a bright future. now submit the form below to complete your confirmation</p>
      <form style={{marginTop:38}}>
        <input type="text" placeholder="Name" name="name"/>
        <input type="text" placeholder="Last Name" name="name"/>
        <input type="text" placeholder="Email" name="name"/>
      </form>
      <div className="button-container">
        <button onClick={() => (window.location.href = "/success")}>
          SUBMIT
        </button>
      </div>
    </div>
  );
}
