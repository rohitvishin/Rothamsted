"use client";
import React from "react";
export default function Success() {
  return (
    <div
      style={{
        backgroundColor:'#fff',
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent:'center',
        margin:42,
        textAlign:'center'
      }}
    >
      <p style={{ fontSize: "30px", fontWeight: "bold" }}>
        Success!
      </p>
      <img src="Check_Icon.png" style={{height:'100px',margin:30}}/>
      <p style={{fontSize:20}}>Thankyou for pledging</p>
      <p style={{fontSize:14}}>Your one small step can bring big changes in the future!</p>
    </div>
  );
}
