'use client';
import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';

export default function About() {
  const [result, setResult] = useState(null);

  const handleError = (err) => {
    console.error(err);
  };

  const handleScan = (data) => {
    if (data) {
      setResult(data);
    }
  };

  const stopCamera = () => {
    setResult(null);
  };

  const scannerStyle = {
    width: '100%',
    height: 'calc(100vw - 20px)', // Adjust the height to maintain a square shape
    maxWidth: '400px', // Set a maximum width for the scanner
    margin: 'auto',
  };

  return (
    <div>
      {result ? (
        <div>
          <p>QR Code Scanned: {result}</p>
          <button onClick={stopCamera}>Stop Camera</button>
        </div>
      ) : (
        <div>
          <QrScanner
            onScan={handleScan}
            onError={handleError}
            style={scannerStyle}
          />
        </div>
      )}
    </div>
  );
}
