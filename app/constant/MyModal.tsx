'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { FC, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

interface MyModalProps {
  showModal: boolean;
  video1:any;
  video2:any;
  handleClose: () => void;
}
const handleClick = (side:{side:any}) =>{
  console.log(side)
}

const MyModal: FC<MyModalProps> = ({ showModal,video1,video2, handleClose }) => {
  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Body>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <div className="text-center mb-3" onClick={()=>handleClick(video1)} style={{borderRadius: 10,backgroundColor:'#fff', padding:10,width:'90%'}}>
            <h2>Dark future</h2>
            <p>We are from the dark future</p>
          </div>
          <hr />
          <div className="text-center" onClick={()=>handleClick(video2)} style={{borderRadius: 10,backgroundColor:'#fff', padding:10,width:'90%'}}>
            <h2>Bright future</h2>
            <p>We are from the bright future</p>
          </div>
        </div>
      </Modal.Body>
      <style>
        {`
          .modal-content {
            background-color: rgba(255, 255, 255, 0); /* Complete transparency */
            border: none; /* Optional: Remove border */
          }
        `}
      </style>
    </Modal>
  );
};

export default MyModal;
